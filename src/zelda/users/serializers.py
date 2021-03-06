from rest_framework.serializers import ModelSerializer, SerializerMethodField

from timetable.models import Attendance
from courses.models import CourseSubject
from common.utils import get_user_from_request
from .models import Student, Professor, AppUser


class AttendanceSerializer(ModelSerializer):
    date = SerializerMethodField('get_attendance_date')
    lesson_type = SerializerMethodField()
    subject_designation = SerializerMethodField()

    class Meta:
        model = Attendance
        fields = "__all__" #student, lesson

    def get_attendance_date(self, attendance):
        return attendance.lesson.date

    def get_lesson_type(self, attendance):
        return attendance.lesson.lesson_spec.c_type

    def get_subject_designation(self, attendance):
        return CourseSubject.objects.get(
            subject=attendance.lesson.lesson_spec.shift.subject,
        ).designation


class AppUserSerializer(ModelSerializer):
    class Meta:
        model = AppUser
        exclude = ('password', 'is_superuser', 'is_staff', 'is_active', 'display_image')


class RestrictedAppUserSerializer(ModelSerializer):
    display_image = SerializerMethodField()

    def get_display_image(self, app_user):
        return f"/s3/{app_user.display_image}"

    class Meta:
        model = AppUser
        fields = (
            "first_name",
            "last_name",
            "institutional_email",
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


class ProfessorRestrictedSerializer(ModelSerializer):
    app_user = RestrictedAppUserSerializer(read_only=True)

    class Meta:
        model = Professor
        fields = "__all__"
