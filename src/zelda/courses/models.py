from django.db import models
from django.utils.translation import gettext_lazy as _

from users.models import Professor, Student
from organizations.models import Department


class SubjectSpecification(models.Model):
    ects = models.FloatField()
    code = models.CharField(max_length=10)
    programme = models.TextField()
    objectives = models.TextField()
    evaluation_method = models.TextField()
    bibliography = models.TextField()


class Subject(models.Model):
    SEMESTERS = (
        ("1", "1"),
        ("2", "2"),
    )

    subject_spec = models.ForeignKey(
        SubjectSpecification,
        on_delete=models.CASCADE,
    )
    lective_year = models.DateField()
    semester = models.CharField(
        max_length=1,
        choices=SEMESTERS,
    )
    # WEEKS
    duration = models.PositiveSmallIntegerField()


class CourseSubject(models.Model):
    subject = models.ForeignKey(
        Subject,
        on_delete=models.CASCADE,
    )
    designation = models.CharField(max_length=100)
    course_year = models.PositiveSmallIntegerField()
    students = models.ManyToManyField(Student)


class EntranceExam(models.Model):
    designation = models.CharField(max_length=50)
    min_classification = models.FloatField()
    field = models.CharField(max_length=50)
    weight = models.FloatField()


class CourseSpecification(models.Model):
    DEGREE_OPTIONS = (
        ("post-grad", _("Post-Graduation")),
        ("bachelor", _("Bachelors")),
        ("master", _("Masters")),
        ("phd", _("Doctorate")),
    )
    STATUS_OPTIONS = (
        ("active", _("active")),
        ("inactive", _("inactive")),
    )
    REGIME_OPTIONS = (
        ("day", _("day")),
        ("night", _("night")),
    )

    code = models.CharField(max_length=10)
    designation = models.CharField(max_length=100)
    degree = models.CharField(
        max_length=9,
        choices=DEGREE_OPTIONS,
    )
    ects = models.FloatField()
    total_semesters = models.PositiveSmallIntegerField()
    field = models.CharField(max_length=50)
    status = models.CharField(
        max_length=8,
        choices=STATUS_OPTIONS,
    )
    entrance_exams = models.ManyToManyField(
        EntranceExam,
    )
    regime = models.CharField(
        max_length=5,
        choices=REGIME_OPTIONS,
    )
    department = models.ForeignKey(
        Department,
        on_delete=models.CASCADE,
    )
    course_programme = models.ManyToManyField(CourseSubject)


class Course(models.Model):
    specification = models.ForeignKey(
        CourseSpecification,
        on_delete=models.CASCADE,
    )
    lective_year = models.DateField()
    vacancies = models.PositiveIntegerField()
    coordinator = models.ForeignKey(
        Professor,
        on_delete=models.CASCADE,
    )


class Grade(models.Model):
    course = models.ForeignKey(
        Course,
        on_delete=models.CASCADE,
    )
    student = models.ForeignKey(
        Student,
        on_delete=models.CASCADE,
    )
    grade = models.FloatField()
    percentage = models.FloatField()
    designation = models.CharField(max_length=100)


class FinalGrade(models.Model):
    EECC_TYPES = (
        ("a", _("A")),
        ("b", _("B")),
        ("c", _("C")),
        ("d", _("D")),
        ("e", _("E")),
    )

    course = models.ForeignKey(
        Course,
        on_delete=models.CASCADE,
    )
    student = models.ForeignKey(
        Student,
        on_delete=models.CASCADE,
    )
    eecc = models.CharField(
        max_length=1,
        choices=EECC_TYPES,
    )
    grade = models.FloatField()


ADMIN_MODELS = [
    SubjectSpecification,
    Subject,
    CourseSubject,
    EntranceExam,
    CourseSpecification,
    Course,
    Grade,
    FinalGrade,
]
