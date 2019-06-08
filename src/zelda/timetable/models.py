from django.db import models
from django.utils.translation import gettext_lazy as _

from organizations.models import Room
from users.models import Student, Professor
from courses.models import Subject


class Shift(models.Model):
    code = models.CharField(max_length=10)
    vacancies = models.PositiveSmallIntegerField()
    subject = models.ForeignKey(
        Subject,
        on_delete=models.CASCADE,
    )
    professor = models.ForeignKey(
        Professor,
        on_delete=models.CASCADE,
    )
    student = models.ManyToManyField(Student, blank=True, db_table='ShiftStudent')


class LessonSpecification(models.Model):
    WEEKDAYS = (
        ("monday", _("Monday")),
        ("tuesday", _("Tuesday")),
        ("wednesday", _("Wednesday")),
        ("thursday", _("Thursday")),
        ("friday", _("Friday")),
        ("saturday", _("Saturday")),
        ("sunday", _("Sunday")),
    )
    LESSON_TYPE = (
        ("theory", _("Theory")),
        ("practice", _("Practice")),
        ("lab", _("Laboratory")),
        ("field", _("Field")),
    )

    weekday = models.CharField(
        max_length=9,
        choices=WEEKDAYS,
    )
    time = models.TimeField()
    duration = models.PositiveSmallIntegerField()  # Minutes
    c_type = models.CharField(
        max_length=8,
        choices=LESSON_TYPE,
    )
    room = models.ForeignKey(
        Room,
        on_delete=models.CASCADE,
    )
    shift = models.ForeignKey(
        Shift,
        on_delete=models.CASCADE,
    )


class Lesson(models.Model):
    date = models.DateField()
    lesson_spec = models.ForeignKey(
        LessonSpecification,
        on_delete=models.CASCADE,
    )


class Class(models.Model):
    code = models.CharField(max_length=10)
    designation = models.CharField(max_length=100)
    shifts = models.ManyToManyField(Shift)

    class Meta:
        verbose_name = _('class')
        verbose_name_plural = _('classes')


class Attendance(models.Model):
    student = models.ForeignKey(
        Student,
        on_delete=models.CASCADE,
    )
    lesson = models.ForeignKey(
        Lesson,
        on_delete=models.CASCADE,
    )


ADMIN_MODELS = [
    LessonSpecification,
    Shift,
    Lesson,
    Class,
    Attendance,
]
