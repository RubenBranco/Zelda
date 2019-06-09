from django.shortcuts import get_object_or_404
from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import exceptions

from common.views import AbstractProfessorAppView, AbstractStudentAppView
from common.utils import get_user_from_request
from users.models import Student, Professor
from .models import Shift, LessonSpecification, ShiftExchangeRequest
from .permissions import ShiftPermission, LessonSpecPermission, ShiftExchangeRequestPermission
from .serializers import ShiftSerializer, TimeTableLessonSpecificationSerializer, ShiftExchangeRequestSerializer


class ProfViewAttendancesView(AbstractProfessorAppView):
    pass


class ProfViewSubjectScheduleView(AbstractProfessorAppView):
    pass


class ProfCheckShiftlessStudentsView(AbstractProfessorAppView):
    pass


class StudentViewAttendancesView(AbstractStudentAppView):
    pass


class StudentViewSubjectScheduleView(AbstractStudentAppView):
    pass


class StudentViewTimetableView(AbstractStudentAppView):
    pass


class StudentShiftManagementView(AbstractStudentAppView):
    pass


class StudentSubjectShiftManagementView(AbstractStudentAppView):
    pass


class ReviewShiftExchangeRequestsView(AbstractProfessorAppView):
    pass


class ShiftViewSet(viewsets.ModelViewSet):
    queryset = Shift.objects.all()
    permissions = (IsAuthenticated, ShiftPermission)
    serializer_class = ShiftSerializer

    @action(detail=True)
    def sign_up(self, request, pk=None):
        shift = get_object_or_404(Shift, id=pk)
        user = get_user_from_request(request)

        if not isinstance(user, Student) or not self.is_eligible(shift, user):
            raise exceptions.PermissionDenied()

        shift.student.add(user)
        shift.save()

        return Response(status=200)

    @action(detail=True)
    def request_exchange(self, request, pk=None):
        shift = get_object_or_404(Shift, id=pk)
        user = get_user_from_request(request)

        if not isinstance(user, Student) or self.is_eligible(shift, user):
            raise exceptions.PermissionDenied()

        request = ShiftExchangeRequest(student=user, shift=shift)
        request.save()

        return Response(status=200)

    def is_eligible(self, shift, user):
        lesson_spec = LessonSpecification.objects.get(shift=shift)
        subject = shift.subject
        enrolled_lessons = LessonSpecification.objects.filter(
            shift__student=user,
            c_type=lesson_spec.c_type,
        ).exclude(id=lesson_spec.id)

        return user in subject.students.all() and \
            user not in shift.student.all() and \
            len(enrolled_lessons) < getattr(
                subject.subject_spec,
                f"{lesson_spec.c_type}_shifts",
            ) and len(shift.student.all()) + 1 <= shift.vacancies


class ShiftExchangeRequestViewSet(viewsets.ModelViewSet):
    queryset = ShiftExchangeRequest.objects.all()
    permissions = (IsAuthenticated, ShiftExchangeRequestPermission)
    serializer_class = ShiftExchangeRequestSerializer


class TimetableLessonSpecViewSet(viewsets.ModelViewSet):
    queryset = LessonSpecification.objects.all()
    permissions = (IsAuthenticated, LessonSpecPermission)
    serializer_class = TimeTableLessonSpecificationSerializer

    @action(detail=False)
    def my_timetable(self, request):
        user = get_user_from_request(request)
        if isinstance(user, Student):
            return self.timetable_student(request, user)
        elif isinstance(user, Professor):
            return self.timetable_professor(request, user)
        else:
            return exceptions.PermissionDenied()

    def timetable_student(self, request, student):
        return Response(
            self.serializer_class(
                LessonSpecification.objects.filter(shift__student=student),
                many=True,
                context=dict(course=student.course.all().last()),
            ).data
        )

    def timetable_professor(self, request, professor):
        pass
