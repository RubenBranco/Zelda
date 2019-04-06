from django.shortcuts import render, get_object_or_404
from django.utils import timezone
from datetime import timedelta, datetime

from rest_framework import viewsets, permissions
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.exceptions import PermissionDenied
from rest_framework.permissions import IsAuthenticated

from timetable.models import Attendance, Lesson, Shift, LessonSpecification
from .models import Student, AppUser, Professor
from .serializers import AttendanceSerializer, StudentSerializer, AppUserSerializer, RestrictedAppUserSerializer, ProfessorSerializer
from .permissions import AppUserSelfPermission, StudentPermission, ProfessorPermission, AttendancePermission
from courses.serializers import CourseSubjectSerializer, SubjectSerializer
from courses.models import Subject, CourseSubject
from common.views import AbstractLoggedInAppView


class UserProfileView(AbstractLoggedInAppView):
    pass


class AttendanceViewSet(viewsets.ModelViewSet):
    serializer_class = AttendanceSerializer
    permission_classes = (AttendancePermission,)
    filter_queries = dict(
        first_name="student__app_user__first_name",
        last_name="student__app_user__last_name",
        start_date="lesson__date__gte",
        subject="lesson__lesson_spec__shift__subject",
        shift="lesson__lesson_spec__shift__code",
        student_number="student__number",
    )

    def get_queryset(self):
        queryset = Attendance.objects.all()
        filters = dict()

        for query_param in self.filter_queries:
            query_value = self.request.query_params.get(query_param, None)
            if query_value is not None:
                filters[self.filter_queries[query_param]] = query_value

        if filters:
            queryset = queryset.filter(**filters)

        return queryset

    def create(self, request):
        #lesson.time; lesson.duration
        data = request.data
        timestamp = datetime.strptime(data['timestamp'], '%Y-%m-%d %H:%M:%S:%f')

        student_number = data['student_number']

        student = Student.objects.get(number=student_number)

        shift_list = Shift.objects.filter(student=student)

        for shift in shift_list:
            lessonSpec_list = LessonSpecification.objects.filter(shift=shift)
            for lessonSpec in lessonSpec_list:
                start_time = lessonSpec.time
                duration = lessonSpec.duration

                lesson = Lesson.objects.get(lesson_spec=lessonSpec)
                date = lesson.date

                lesson_start = datetime.combine(date, start_time)

                lesson_end = lesson_start + timedelta(minutes=duration)


                if lesson_start <= timestamp <= lesson_end:
                    got_attendance = self.check_attendance(student, lesson)
                    if got_attendance is None:
                        attendance = Attendance(student=student, lesson=lesson)
                        attendance.save()
                    return

    @action(detail=False)
    def summary(self, request):
        queryset = self.get_queryset()
        student_attendances = dict()

        for attendance in queryset:
            student = attendance.student
            if student not in student_attendances:
                student_attendances[student] = 0
            student_attendances[student] += 1

        return Response([
            dict(
                student_id=student.id,
                student_number=student.number,
                name=" ".join([student.app_user.first_name, student.app_user.last_name]),
                email=student.app_user.institutional_email,
                attendances=n_attendances,
            )
            for student, n_attendances in student_attendances.items()
        ])

    def check_attendance(self, student, lesson):
        try:
            got_attendance = Attendance.objects.get(student=student, lesson=lesson)
        except Attendance.DoesNotExist:
            got_attendance = None
        return got_attendance


class StudentViewSet(viewsets.ModelViewSet):
    serializer_class = StudentSerializer
    queryset = Student.objects.all()
    permission_classes = (StudentPermission,)

    @action(detail=False)
    def describe_self(self, request):
        student = get_object_or_404(Student, app_user=request.user)
        return Response(self.serializer_class(student).data)

    @action(detail=True)
    def subjects(self, request, pk=None):
        student = get_object_or_404(Student, id=pk)
        return Response(
            CourseSubjectSerializer(
                CourseSubject.objects.filter(
                    subject__in=Subject.objects.filter(students=student)
                ),
                many=True
            ).data
        )


class ProfessorViewSet(viewsets.ModelViewSet):
    serializer_class = ProfessorSerializer
    queryset = Professor.objects.all()
    permission_classes = (ProfessorPermission,)

    @action(detail=False)
    def describe_self(self, request):
        professor = get_object_or_404(Professor, app_user=request.user)
        return Response(self.serializer_class(professor).data)

    @action(detail=True)
    def subjects(self, request, pk=None):
        professor = get_object_or_404(Professor, id=pk)
        return Response(
            SubjectSerializer(
                list(
                    set(
                        map(
                            lambda shift: shift.subject,
                            Shift.objects.filter(professor=professor)
                        )
                    )
                ),
                many=True
            ).data
        )

    @action(detail=True)
    def course_subjects(self, request, pk=None):
        professor = get_object_or_404(Professor, id=pk)
        subjects = list(
            set(
                map(
                    lambda shift: shift.subject,
                    Shift.objects.filter(professor=professor)
                )
            )
        )
        return Response([
            CourseSubjectSerializer(
                CourseSubject.objects.filter(subject=subject),
                many=True
            ).data
            for subject in subjects
            ]
        )


class AppUserViewSet(viewsets.ModelViewSet):
    serializer_class = AppUserSerializer
    queryset = AppUser.objects.all()
    permission_classes = (IsAuthenticated,)

    @action(detail=False)
    def describe_self(self, request):
        return Response(self.serializer_class(request.user).data)

    def retrieve(self, request, pk=None):
        app_user = get_object_or_404(AppUser, id=pk)

        if request.user.is_superuser or app_user == request.user:
            return Response(self.serializer_class(app_user).data)
        else:
            return Response(RestrictedAppUserSerializer(app_user).data)
