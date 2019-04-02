from django.shortcuts import render, get_object_or_404
from django.utils import timezone
from datetime import timedelta, datetime

from rest_framework import viewsets, permissions
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.exceptions import PermissionDenied

from timetable.models import Attendance, Lesson, Shift, LessonSpecification
from .models import Student, AppUser
from .serializers import AttendanceSerializer, StudentSerializer, AppUserSerializer
from .permissions import AppUserSelfPermission, StudentPermission
from courses.serializers import CourseSubjectSerializer
from courses.models import Subject, CourseSubject
from common.views import AbstractLoggedInAppView


class UserProfileView(AbstractLoggedInAppView):
    pass


class AttendanceViewSet(viewsets.ModelViewSet):

    queryset = Attendance.objects.all()
    serializer_class = AttendanceSerializer
    #permission_class = (nao sei qual)

    # def partial_update(self, request):
    #     attendance = get_object_or_404(Attendance)
    #     serializer = AttendanceSerializer(attendance, data=request.data)
    #     pass

    # def list(self, request):
    #     pass

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


class AppUserViewSet(viewsets.ModelViewSet):
    serializer_class = AppUserSerializer
    queryset = AppUser.objects.all()
    permission_classes = (AppUserSelfPermission,)

    @action(detail=False)
    def describe_self(self, request):
        return Response(self.serializer_class(request.user).data)
