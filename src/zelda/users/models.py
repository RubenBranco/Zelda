from django.db import models
from django.contrib.auth.models import AbstractUser
from django_countries.fields import CountryField
from django.utils.translation import gettext_lazy as _


class AppUser(AbstractUser):
    MARITAL_STATUS = (
        ("single", _("Single")),
        ("married", _("Married")),
        ("divorced", _("Divorced")),
        ("widowed", _("Widowed")),
    )

    GENDER = (
        ("m", _("Male")),
        ("f", _("Female")),
    )

    USER_TYPE_OPTIONS = ((
        ("Student", _("Student")),
        ("Professor", _("Professor")),
        ("Administrator", _("Administrator")),
    ))

    nif = models.PositiveIntegerField(unique=True, null=True)
    n_cc = models.PositiveIntegerField(unique=True, null=True)
    dob = models.DateField(null=True)
    institutional_email = models.EmailField(unique=True, null=True)
    contact = models.PositiveIntegerField(null=True)
    emergency_contact = models.PositiveIntegerField(null=True)
    professional_occupation = models.TextField(max_length=512, null=True)
    display_image = models.ImageField(null=True)
    country = CountryField(null=True)
    marital_status = models.CharField(
        max_length=8,
        choices=MARITAL_STATUS,
        null=True,
    )
    gender = models.CharField(
        max_length=1,
        choices=GENDER,
        null=True,
    )
    user_type = models.CharField(max_length=13, choices=USER_TYPE_OPTIONS, null=True)

    USERNAME_FIELD = 'institutional_email'

class Student(models.Model):
    CALL = (
        ("1", _("1st Call")),
        ("2", _("2nd Call")),
    )

    STATUTE = (
        ("worker", _("Worker")),
        ("athlete", _("Athlete")),
        ("fireman", _("Fireman")),
        ("military", _("Military")),
        ("union", _("Student's Union")),
        ("special", _("Special Learning Needs")),
        ("parent", _("Parent")),
    )

    app_user = models.ForeignKey(
        AppUser,
        on_delete=models.CASCADE,
    )
    number = models.PositiveIntegerField()
    call = models.CharField(
        max_length=1,
        choices=CALL,
    )
    entry_grade = models.FloatField(max_length=200.0)
    statute = models.CharField(
        max_length=8,
        choices=STATUTE,
        null=True,
    )
    course = models.ManyToManyField('courses.Course')
    faculty = models.ForeignKey(
        'organizations.Faculty',
        null=True,
        on_delete=models.CASCADE,
    )

    class Meta:
        verbose_name = _('student')
        verbose_name_plural = _('students')


class Administrator(models.Model):
    app_user = models.ForeignKey(
        AppUser,
        on_delete=models.CASCADE,
    )
    number = models.PositiveIntegerField()

    class Meta:
        verbose_name = _('administrator')
        verbose_name_plural = _('administrators')


class Professor(models.Model):
    RANKS = (
        ("assist", _("Assistant Professor")),
        ("assistinv", _("Invited Assistant Professor")),
        ("full", _("Full Professor")),
        ("fullvis", _("Visiting Full Professor")),
        ("associ", _("Associate Professor")),
        ("associnv", _("Invited Associate Professor")),
        ("assocagr", _("Associate Professor with Agregação")),
    )

    app_user = models.ForeignKey(
        AppUser,
        on_delete=models.CASCADE,
    )
    number = models.PositiveIntegerField()
    rank = models.CharField(
        max_length=9,
        choices=RANKS,
    )

    class Meta:
        verbose_name = _('professor')
        verbose_name_plural = _('professors')


ADMIN_MODELS = [
    Student,
    Administrator,
    Professor,
    AppUser,
]
