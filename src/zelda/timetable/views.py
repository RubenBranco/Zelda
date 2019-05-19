from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import exceptions

from common.views import AbstractProfessorAppView, AbstractStudentAppView
from common.utils import get_user_from_request
from users.models import Student, Professor
from .models import Shift, LessonSpecification
from .permissions import ShiftPermission, LessonSpecPermission
from .serializers import ShiftSerializer, TimeTableLessonSpecificationSerializer


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


class ShiftViewSet(viewsets.ModelViewSet):
    queryset = Shift.objects.all()
    permissions = (IsAuthenticated, ShiftPermission)
    serializer_class = ShiftSerializer


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
