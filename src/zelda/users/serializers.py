from rest_framework.serializers import ModelSerializer, Serializer

from timetable.models import Attendance
from .models import Student, AppUser

class AttendanceSerializer(ModelSerializer):
    class Meta:
        model = Attendance
        fields = "__all__" #student, lesson


class AppUserSerializer(ModelSerializer):
    class Meta:
        model = AppUser
        exclude = ('password', 'is_superuser', 'is_staff', 'is_active')


class StudentSerializer(ModelSerializer):
    class Meta:
        model = Student
        fields = ("number", "app_user")



