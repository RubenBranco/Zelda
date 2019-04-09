from rest_framework.serializers import ModelSerializer, SerializerMethodField

from timetable.models import Attendance
from .models import Student, Professor, AppUser


class AttendanceSerializer(ModelSerializer):
    date = SerializerMethodField('get_attendance_date')
    lesson_type = SerializerMethodField()

    class Meta:
        model = Attendance
        fields = "__all__" #student, lesson

    def get_attendance_date(self, attendance):
        return attendance.lesson.date

    def get_lesson_type(self, attendance):
        return attendance.lesson.lesson_spec.c_type


class AppUserSerializer(ModelSerializer):
    class Meta:
        model = AppUser
        exclude = ('password', 'is_superuser', 'is_staff', 'is_active')


class RestrictedAppUserSerializer(ModelSerializer):
    class Meta:
        model = AppUser
        fields = (
            "first_name",
            "last_name",
            "institutional_email",
            "display_image",
            "display_image",
            "country",
            "gender",
        )


class StudentSerializer(ModelSerializer):
    class Meta:
        model = Student
        fields = "__all__"


class ProfessorSerializer(ModelSerializer):
    class Meta:
        model = Professor
        fields = "__all__"
