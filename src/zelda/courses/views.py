from django.shortcuts import get_object_or_404
from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import action
from rest_framework.response import Response

from .serializers import CourseSerializer, CourseSpecificationSerializer, CourseSubjectSerializer, SubjectSerializer, SubjectSpecificationSerializer
from .models import Course, CourseSpecification, CourseSubject, Subject, SubjectSpecification
from common.views import AbstractLoggedInAppView
from users.serializers import ProfessorSerializer
from timetable.models import Shift
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
            ProfessorSerializer(
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


class SubjectSpecificationViewSet(ModelViewSet):
    serializer_class = SubjectSpecificationSerializer
    queryset = SubjectSpecification.objects.all()
    permission_classes = (IsAuthenticated,)
