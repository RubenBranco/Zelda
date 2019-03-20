from django.shortcuts import render, get_object_or_404

from rest_framework import viewsets

from timetable.models import Attendance
from .models import Student
from .serializers import AttendanceSerializer, StudentSerializer

# Create your views here.

class AttendanceViewSet(viewsets.ModelViewSet):

    queryset = Attendance.objects.all()
    serializer_class = AttendanceSerializer
    #permission_class = (nao sei qual)

    def partial_update(self, request):
        attendance = get_object_or_404(Attendance)
        serializer = AttendanceSerializer(attendance, data=request.data)
        pass
 

class StudentViewSet(viewsets.ModelViewSet):

    #queryset = Student.objects.all()
    serializer_class = StudentSerializer

    def get_queryset(self):
        queryset = Attendance.objects.get().student
        return queryset
        

