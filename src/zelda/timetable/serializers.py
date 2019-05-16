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
