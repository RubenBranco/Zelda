from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticated

from .serializers import CourseSerializer, CourseSpecificationSerializer, CourseSubjectSerializer, SubjectSerializer, SubjectSpecificationSerializer
from .models import Course, CourseSpecification, CourseSubject, Subject, SubjectSpecification
from common.views import AbstractLoggedInAppView


class ViewCourseInfoView(AbstractLoggedInAppView):
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


class SubjectSpecificationViewSet(ModelViewSet):
    serializer_class = SubjectSpecificationSerializer
    queryset = SubjectSpecification.objects.all()
    permission_classes = (IsAuthenticated,)
