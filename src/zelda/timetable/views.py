import json

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
from .serializers import ShiftSerializer, TimeTableLessonSpecificationSerializer, ShiftExchangeRequestSerializer, LecturedShiftSerializer


class ProfViewAttendancesView(AbstractProfessorAppView):
    pass


class ProfCheckShiftlessStudentsView(AbstractProfessorAppView):
    pass


class StudentViewAttendancesView(AbstractStudentAppView):
    pass


class StudentViewTimetableView(AbstractStudentAppView):
    pass


class StudentShiftManagementView(AbstractStudentAppView):
    pass


class StudentSubjectShiftManagementView(AbstractStudentAppView):
    pass


class ReviewShiftExchangeRequestsView(AbstractProfessorAppView):
    pass


class ReviewShiftStatusView(AbstractProfessorAppView):
    pass


class ShiftViewSet(viewsets.ModelViewSet):
    queryset = Shift.objects.all()
    permissions = (IsAuthenticated, ShiftPermission)
    serializer_class = ShiftSerializer

    @action(detail=True)
    def change_open_state(self, request, pk=None):
        shift = get_object_or_404(Shift, id=pk)
        user = get_user_from_request(request)

        if not isinstance(user, Professor) and shift.professor != user:
            raise exceptions.PermissionDenied()

        is_open = request.query_params.get("is_open", None)

        if is_open is not None:
            shift.is_open = is_open == "true"
            shift.student.clear()
            shift.save()

        return Response(status=200)

    @action(detail=False)
    def lectured_shifts(self, request):
        user = get_user_from_request(request)

        if not isinstance(user, Professor):
            raise exceptions.PermissionDenied()

        return Response(LecturedShiftSerializer(
            Shift.objects.filter(professor=user),
            many=True,
        ).data)


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
        lesson_spec = LessonSpecification.objects.filter(shift=shift).first()
        if lesson_spec is None:
            return False
        subject = shift.subject
        enrolled_lessons = LessonSpecification.objects.filter(
            shift__student=user,
            c_type=lesson_spec.c_type,
        ).exclude(id=lesson_spec.id)

        return user in subject.students.all() and \
            user not in shift.student.all() and \
            shift.is_open and \
            len(enrolled_lessons) < getattr(
                subject.subject_spec,
                f"{lesson_spec.c_type}_shifts",
            ) and len(shift.student.all()) + 1 <= shift.vacancies


class ShiftExchangeRequestViewSet(viewsets.ModelViewSet):
    queryset = ShiftExchangeRequest.objects.all()
    permissions = (IsAuthenticated, ShiftExchangeRequestPermission)
    serializer_class = ShiftExchangeRequestSerializer

    @action(detail=False)
    def my_requests(self, request):
        user = get_user_from_request(request)

        if not isinstance(user, Professor):
            raise exceptions.PermissionDenied()

        return Response(ShiftExchangeRequestSerializer(
            ShiftExchangeRequest.objects.filter(
                shift__professor=user,
                acceptance=None,
            ),
            many=True,
        ).data)

    @action(detail=True)
    def modify(self, request, pk=None):
        xg_request = get_object_or_404(ShiftExchangeRequest, id=pk)
        user = get_user_from_request(request)

        if not isinstance(user, Professor) or xg_request.shift.professor != user:
            raise exceptions.PermissionDenied()

        acceptance = request.query_params.get("acceptance", None)

        if acceptance is not None:
            acceptance = acceptance == "true"
            xg_request.acceptance = acceptance
            xg_request.save()

            if acceptance:
                enrolled_shifts = Shift.objects.filter(
                    subject=xg_request.shift.subject,
                    student=xg_request.student,
                )
                shift_ctype = LessonSpecification.objects.filter(shift=xg_request.shift)[0].c_type

                old_shift = None

                for shift in enrolled_shifts:
                    _c_type = LessonSpecification.objects.filter(shift=shift)[0].c_type
                    if _c_type == shift_ctype:
                        old_shift = shift
                        break

                if old_shift is not None:
                    old_shift.student.remove(xg_request.student)
                xg_request.shift.student.add(xg_request.student)

        return Response(status=200)


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
            raise exceptions.PermissionDenied()

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
