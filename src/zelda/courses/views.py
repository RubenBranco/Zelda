from datetime import date
from functools import reduce

from django.shortcuts import get_object_or_404
from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework import exceptions

from .serializers import CourseSerializer, CourseSpecificationSerializer, CourseSubjectSerializer, SubjectSerializer, SubjectSpecificationSerializer, GradeSerializer, RestrictedSubjectSerializer
from .models import Course, CourseSpecification, CourseSubject, Subject, SubjectSpecification, Grade
from .permissions import SubjectPermission, CourseSubjectPermission, CoursePermission
from common.views import AbstractLoggedInAppView, AbstractProfessorAppView, AbstractStudentAppView
from common.permissions import BaseAppPermission
from common.utils import get_user_from_request
from users.serializers import ProfessorRestrictedSerializer, RestrictedAppUserSerializer, StudentSerializer
from users.models import Student, Professor
from timetable.models import Shift, LessonSpecification
from timetable.serializers import ShiftSerializer, SummaryShiftSerializer


class ViewCourseInfoView(AbstractLoggedInAppView):
    pass


class ViewSubjectInfoView(AbstractLoggedInAppView):
    pass


class ProfessorViewGradesView(AbstractProfessorAppView):
    pass


class StudentViewGradesView(AbstractStudentAppView):
    pass


class SubjectSignUpView(AbstractStudentAppView):
    pass


class CourseViewSet(ModelViewSet):
    serializer_class = CourseSerializer
    queryset = Course.objects.all()
    permission_classes = (IsAuthenticated, CoursePermission)

    @action(detail=False)
    def my_curriculum(self, request):
        user = get_user_from_request(request)

        if not isinstance(user, Student):
            raise exceptions.PermissionDenied()

        course = user.course.last()
        max_ects_per_semester = course.specification.department.faculty.max_ects_per_semester
        course_subjects = CourseSubject.objects.filter(course=course)
        subjects = []
        first_semester_ects = 0
        second_semester_ects = 0

        for course_subject in course_subjects:
            subject = dict()

            is_enrolled = user in course_subject.subject.students.all()
            if is_enrolled and course_subject.subject.semester == "1":
                first_semester_ects += course_subject.subject.subject_spec.ects
            elif is_enrolled and course_subject.subject.semester == "2":
                second_semester_ects += course_subject.subject.subject_spec.ects

            subject['course_subject'] = CourseSubjectSerializer(course_subject).data
            subject['subject'] = RestrictedSubjectSerializer(course_subject.subject).data
            subject['subject_spec'] = SubjectSpecificationSerializer(course_subject.subject.subject_spec).data
            subject['is_enrolled'] = is_enrolled
            subjects.append(subject)

        return Response(dict(
            max_ects_per_semester=max_ects_per_semester,
            subjects=subjects,
            first_semester_ects=first_semester_ects,
            second_semester_ects=second_semester_ects,
            current_semester="1" if course.f_semester_begin_date <= date.today() <= course.f_semester_end_date else "2",
        ))


class CourseSpecificationViewSet(ModelViewSet):
    serializer_class = CourseSpecificationSerializer
    queryset = CourseSpecification.objects.all()
    permission_classes = (IsAuthenticated,)


class CourseSubjectViewSet(ModelViewSet):
    serializer_class = CourseSubjectSerializer
    queryset = CourseSubject.objects.all()
    permission_classes = (IsAuthenticated, CourseSubjectPermission)

    @action(detail=False)
    def my_subjects(self, request):
        user = get_user_from_request(request)

        if not isinstance(user, Student):
            raise exceptions.PermissionDenied()

        course = user.course.all().last()
        course_subjects = CourseSubject.objects.filter(
            subject__in=Subject.objects.filter(students=user),
            course=course,
        )
        return Response(
            self.serializer_class(
                course_subjects,
                many=True,
            ).data
        )


class SubjectViewSet(ModelViewSet):
    serializer_class = SubjectSerializer
    queryset = Subject.objects.all()
    permission_classes = (SubjectPermission,)
    filter_queries = dict(
        first_name="student__app_user__first_name",
        last_name="student__app_user__last_name",
        student_number="student__number",
    )

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
            student_shifts = shifts.filter(student=student, subject=subject)
            student_classes = dict()
            for shift in student_shifts:
                lesson_spec = LessonSpecification.objects.filter(shift=shift)
                if lesson_spec and lesson_spec[0].c_type not in student_classes:
                    student_classes[lesson_spec[0].c_type] = 1
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

    @action(detail=True)
    def my_grades(self, request, pk=None):
        subject = get_object_or_404(Subject, id=pk)
        user = get_user_from_request(request)

        if not isinstance(user, Student):
            raise exceptions.PermissionDenied()

        return Response(
            GradeSerializer(
                Grade.objects.filter(subject=subject, student=user),
                many=True,
            ).data
        )

    @action(detail=True)
    def grades(self, request, pk=None):
        subject = get_object_or_404(Subject, id=pk)
        user = get_user_from_request(request)

        if not isinstance(user, Professor):
            raise exceptions.PermissionDenied()

        students = subject.students.all()
        filters = dict()

        for query_param in self.filter_queries:
            query_value = request.query_params.get(query_param, None)
            if query_value is not None:
                filters[self.filter_queries[query_param]] = query_value

        if filters:
            students = students.filter(**filters)

        return Response(
            GradeSerializer(
                Grade.objects.filter(subject=subject, student__in=students),
                many=True,
            ).data
        )

    @action(detail=True)
    def shift_report(self, request, pk=None):
        subject = get_object_or_404(Subject, id=pk)
        user = get_user_from_request(request)

        if not isinstance(user, Student):
            raise exceptions.PermissionDenied()

        course = user.course.all().last()
        shifts = Shift.objects.filter(subject=subject)

        return Response(
            dict(
                shifts=[SummaryShiftSerializer(
                    shift,
                    context=dict(
                        course=course,
                        enrolled=user in shift.student.all(),
                        lesson_spec=LessonSpecification.objects.filter(shift=shift),
                        student=user,
                    )
                ).data for shift in shifts],
                subject_spec=SubjectSpecificationSerializer(
                    subject.subject_spec
                ).data,
            )
        )

    @action(detail=True)
    def sign_up(self, request, pk=None):
        subject = get_object_or_404(Subject, id=pk)
        user = get_user_from_request(request)

        if not isinstance(user, Student):
            raise exceptions.PermissionDenied()

        course = user.course.last()
        max_ects_per_semester = course.specification.department.faculty.max_ects_per_semester
        current_semester = "1" if course.f_semester_begin_date <= date.today() <= course.f_semester_end_date else "2"

        sign_up = request.query_params.get("sign_up", None)

        if sign_up is None:
            raise exceptions.PermissionDenied()

        if current_semester == "2" and subject.semester == "1":
            raise exceptions.PermissionDenied()

        sign_up = sign_up == "true"
        if sign_up and user in subject.students.all():
            raise exceptions.PermissionDenied()

        if sign_up:
            current_semester_ects = self.check_current_ects(user, course, current_semester)
            if current_semester_ects + subject.subject_spec.ects <= max_ects_per_semester:
                subject.students.add(user)
                subject.save()
            else:
                raise exceptions.PermissionDenied()
        else:
            for shift in Shift.objects.filter(student=user):
                shift.student.remove(user)
                shift.save()
            subject.students.remove(user)
            subject.save()

        return Response(status=200)


    def check_current_ects(self, student, course, current_semester):
        course_subjects = CourseSubject.objects.filter(subject__students=student, subject__semester=current_semester)

        return reduce(lambda acc, y: acc + y.subject.subject_spec.ects, course_subjects, 0)


class SubjectSpecificationViewSet(ModelViewSet):
    serializer_class = SubjectSpecificationSerializer
    queryset = SubjectSpecification.objects.all()
    permission_classes = (IsAuthenticated,)
