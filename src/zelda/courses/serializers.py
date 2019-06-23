from rest_framework.serializers import ModelSerializer

from .models import Course, CourseSpecification, CourseSubject, Subject, SubjectSpecification, Grade


class CourseSerializer(ModelSerializer):
    class Meta:
        model = Course
        fields = "__all__"


class CourseSpecificationSerializer(ModelSerializer):
    class Meta:
        model = CourseSpecification
        fields = "__all__"


class CourseSubjectSerializer(ModelSerializer):
    class Meta:
        model = CourseSubject
        fields = "__all__"


class SubjectSerializer(ModelSerializer):
    class Meta:
        model = Subject
        fields = "__all__"


class RestrictedSubjectSerializer(SubjectSerializer):
    class Meta:
        model = Subject
        exclude = ("students",)


class SubjectSpecificationSerializer(ModelSerializer):
    class Meta:
        model = SubjectSpecification
        fields = "__all__"


class GradeSerializer(ModelSerializer):
    class Meta:
        model = Grade
        fields = "__all__"
