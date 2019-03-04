from django.db import models
from django.utils.translation import gettext_lazy as _


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
    total_semesters = models.SmallIntegerField()
    field = models.CharField(max_length=50)
    status = models.CharField(
        max_length=8,
        choices=STATUS_OPTIONS,
    )
    entrance_exams = models.ManyToManyField(
        EntranceExam,
        null=True,
    )
    regime = models.CharField(
        max_length=5,
        choices=REGIME_OPTIONS,
    )


class Course(models.Model):
    specification = models.ForeignKey(
        CourseSpecification,
        on_delete=models.CASCADE
    )
    lective_year = models.DateField()
    vacancies = models.IntegerField()
