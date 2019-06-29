from rest_framework.serializers import ModelSerializer, SerializerMethodField
from .models import Shift, LessonSpecification, ShiftExchangeRequest
from courses.models import CourseSubject
from courses.serializers import SubjectSerializer
from users.serializers import ProfessorRestrictedSerializer, StudentSerializer, RestrictedAppUserSerializer


class ShiftSerializer(ModelSerializer):
    class Meta:
        model = Shift
        exclude = ("student",)


class LecturedShiftSerializer(ShiftSerializer):
    enrolled_students = SerializerMethodField()
    subject_name = SerializerMethodField()

    def get_subject_name(self, shift):
        subject = shift.subject
        course_subjects = CourseSubject.objects.filter(subject=subject)

        return " / ".join(map(lambda cs: cs.designation, course_subjects))

    def get_enrolled_students(self, shift):
        return len(shift.student.all())


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
        if 'course' in self.context:
            course = self.context['course']
        else:
            course = CourseSubject.objects.filter(subject=lesson_spec.shift.subject).first().course
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
        if 'course' in self.context:
            course = self.context['course']
            return CourseSubject.objects.get(subject=subject, course=course).designation
        else:
            return " / ".join(map(lambda cs: cs.designation, CourseSubject.objects.filter(subject=subject)))

    def get_subject_id(self, lesson_spec):
        return lesson_spec.shift.subject.id


class SummaryShiftSerializer(ShiftSerializer):
    enrolled = SerializerMethodField()
    under_exchange_review = SerializerMethodField()
    lesson_spec = SerializerMethodField()
    professor = ProfessorRestrictedSerializer()
    enrolled_students = SerializerMethodField()

    def get_enrolled(self, _):
        return self.context['enrolled']

    def get_lesson_spec(self, _):
        return TimeTableLessonSpecificationSerializer(
            self.context['lesson_spec'],
            many=True,
            context=dict(course=self.context['course']),
        ).data

    def get_enrolled_students(self, shift):
        return len(shift.student.all())

    def get_under_exchange_review(self, shift):
        student = self.context['student']
        requests = ShiftExchangeRequest.objects.filter(
            student=student,
            shift=shift,
            acceptance=None,
        )

        return len(requests) > 0


class ShiftExchangeRequestSerializer(ModelSerializer):
    shift = ShiftSerializer()
    student = StudentSerializer()
    user = SerializerMethodField()
    subject_name = SerializerMethodField()
    capacity = SerializerMethodField()

    class Meta:
        model = ShiftExchangeRequest
        fields = "__all__"

    def get_user(self, request):
        return RestrictedAppUserSerializer(request.student.app_user).data

    def get_subject_name(self, request):
        subject = request.shift.subject
        course_subjects = CourseSubject.objects.filter(subject=subject)

        return " / ".join(map(lambda cs: cs.designation, course_subjects))

    def get_capacity(self, request):
        return f"{len(request.shift.student.all())} / {request.shift.vacancies}"
