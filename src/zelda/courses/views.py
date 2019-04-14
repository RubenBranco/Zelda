from django.shortcuts import get_object_or_404
from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import action
from rest_framework.response import Response

from .serializers import CourseSerializer, CourseSpecificationSerializer, CourseSubjectSerializer, SubjectSerializer, SubjectSpecificationSerializer
from .models import Course, CourseSpecification, CourseSubject, Subject, SubjectSpecification
from common.views import AbstractLoggedInAppView
from users.serializers import ProfessorRestrictedSerializer, RestrictedAppUserSerializer, StudentSerializer
from timetable.models import Shift, LessonSpecification
from timetable.serializers import ShiftSerializer


class ViewCourseInfoView(AbstractLoggedInAppView):
    pass


class ViewSubjectInfoView(AbstractLoggedInAppView):
    pass


class CourseViewSet(ModelViewSet):
    serializer_class = CourseSerializer
    queryset = Course.objects.all()
    permission_classes = (IsAuthenticated,)


class CourseSpecificationViewSet(ModelViewSet):
    serializer_class = CourseSpecificationSerializer
    queryset = CourseSpecification.objects.all()
    permission_classes = (IsAuthenticated,)


class CourseSubjectViewSet(ModelViewSet):
    serializer_class = CourseSubjectSerializer
    queryset = CourseSubject.objects.all()
    permission_classes = (IsAuthenticated,)


class SubjectViewSet(ModelViewSet):
    serializer_class = SubjectSerializer
    queryset = Subject.objects.all()
    permission_classes = (IsAuthenticated,)

    @action(detail=True)
    def professors(self, request, pk=None):
        subject = get_object_or_404(Subject, id=pk)
        shifts = Shift.objects.filter(subject=subject)
        return Response(
            ProfessorRestrictedSerializer(
                list(set(list(map(lambda shift: shift.professor, shifts)))),
                many=True
            ).data
        )

    @action(detail=True)
    def shifts(self, request, pk=None):
        subject = get_object_or_404(Subject, id=pk)
        return Response(
            ShiftSerializer(
                Shift.objects.filter(subject=subject),
                many=True
            ).data
        )

    @action(detail=True)
    def shiftless_students(self, request, pk=None):
        subject = get_object_or_404(Subject, id=pk)
        subject_spec = subject.subject_spec
        shiftless_students = list()
        shifts = Shift.objects.filter(subject=subject)
        c_types = LessonSpecification.LESSON_TYPE

        for student in subject.students.all():
            student_shifts = shifts.filter(student=student)
            student_classes = dict()
            for shift in student_shifts:
                lesson_spec = LessonSpecification.objects.get(shift=shift)
                if lesson_spec.c_type not in student_classes:
                    student_classes[lesson_spec.c_type] = 0
                student_classes[lesson_spec.c_type] += 1
            for c_type, trans_c_type in c_types:
                subject_min_value = getattr(subject_spec, f"{c_type}_shifts")
                if subject_min_value != student_classes.get(c_type, 0):
                    delta = subject_min_value - student_classes.get(c_type, 0)
                    student_classes[str(trans_c_type)] = delta
                if c_type in student_classes:
                        del student_classes[c_type]
            if student_classes:
                student_info = StudentSerializer(student).data
                student_info.update(RestrictedAppUserSerializer(student.app_user).data)
                student_info.update(dict(shiftless=student_classes))
                shiftless_students.append(student_info)
        return Response(shiftless_students)


class SubjectSpecificationViewSet(ModelViewSet):
    serializer_class = SubjectSpecificationSerializer
    queryset = SubjectSpecification.objects.all()
    permission_classes = (IsAuthenticated,)
