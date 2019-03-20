from timetable.models import Attendance
from rest_framework.serializers import ModelSerializer
from .models import Student

class AttendanceSerializer (ModelSerializer):
    class Meta:
        model = Attendance
        fields = "__all__"



class StudentSerializer (ModelSerializer):
    class Meta:
        model = Student
        fields = ("number", "app_user")
