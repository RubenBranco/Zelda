from django.db import models
from django.utils.translation import gettext_lazy as _

from users.models import Professor


class Faculty(models.Model):
    code = models.CharField(max_length=10)
    designation = models.CharField(max_length=200)
    max_ects_per_semester = models.PositiveSmallIntegerField(default=42)

    class Meta:
        verbose_name = _('faculty')
        verbose_name_plural = _('faculties')


class DepartmentCouncil(models.Model):
    president = models.ForeignKey(
        Professor,
        related_name="president",
        on_delete=models.CASCADE,
    )
    vice_president_one = models.ForeignKey(
        Professor,
        related_name="vice_president_one",
        on_delete=models.CASCADE,
    )
    vice_president_two = models.ForeignKey(
        Professor,
        related_name="vice_president_two",
        on_delete=models.CASCADE,
    )


class Department(models.Model):
    designation = models.CharField(max_length=100)
    field = models.CharField(max_length=50)
    code = models.CharField(max_length=10)
    council = models.ForeignKey(
        DepartmentCouncil,
        on_delete=models.CASCADE,
        null=True,
        blank=True
    )
    faculty = models.ForeignKey(
        Faculty,
        on_delete=models.CASCADE,
    )


class Room(models.Model):
    ROOM_TYPE = (
        ("office", _("Office")),
        ("class", _("Classroom")),
        ("library", _("Library")),
        ("secretarial", _("Secretarial Office")),
        ("laboratory", _("Laboratory")),
        ("auditorium", _("Auditorium")),
        ("study", _("Studyroom")),
    )

    r_type = models.CharField(
        max_length=11,
        choices=ROOM_TYPE,
    )
    capacity = models.PositiveSmallIntegerField()
    building = models.PositiveSmallIntegerField()
    floor = models.PositiveSmallIntegerField()
    door = models.PositiveSmallIntegerField()
    faculty = models.ForeignKey(
        Faculty,
        on_delete=models.CASCADE,
    )
    department = models.ForeignKey(
        Department,
        on_delete=models.CASCADE,
        null=True,
        blank=True
    )


ADMIN_MODELS = [
    Faculty,
    DepartmentCouncil,
    Department,
    Room,
]
