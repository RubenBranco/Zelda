from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated

from common.views import AbstractProfessorAppView, AbstractStudentAppView
from .models import Shift
from .permissions import ShiftPermission
from .serializers import ShiftSerializer


class ProfViewAttendancesView(AbstractProfessorAppView):
    pass


class ProfCheckShiftlessStudentsView(AbstractProfessorAppView):
    pass


class StudentViewAttendancesView(AbstractStudentAppView):
    pass


class ShiftViewSet(viewsets.ModelViewSet):
    queryset = Shift.objects.all()
    permissions = (IsAuthenticated, ShiftPermission)
    serializer_class = ShiftSerializer

