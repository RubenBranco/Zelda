from rest_framework.serializers import ModelSerializer, SerializerMethodField
from .models import Shift, LessonSpecification
from courses.models import CourseSubject


class ShiftSerializer(ModelSerializer):
    class Meta:
        model = Shift
        exclude = ("student",)


class TimeTableLessonSpecificationSerializer(ModelSerializer):
    dates = SerializerMethodField()
    room = SerializerMethodField()
    semester = SerializerMethodField()
    subject_designation = SerializerMethodField()
    subject_id = SerializerMethodField()

    class Meta:
        model = LessonSpecification
        fields = "__all__"

    def get_dates(self, lesson_spec):
        course = self.context['course']
        return dict(
            first_semester_begin_date=course.f_semester_begin_date,
            first_semester_end_date=course.f_semester_end_date,
            second_semester_begin_date=course.s_semester_begin_date,
            second_semester_end_date=course.s_semester_end_date,
        )

    def get_room(self, lesson_spec):
        room = lesson_spec.room
        return f"{room.building}.{room.floor}.{room.door}"

    def get_semester(self, lesson_spec):
        return lesson_spec.shift.subject.semester

    def get_subject_designation(self, lesson_spec):
        subject = lesson_spec.shift.subject
        course = self.context['course']
        return CourseSubject.objects.get(subject=subject, course=course).designation

    def get_subject_id(self, lesson_spec):
        return lesson_spec.shift.subject.id
