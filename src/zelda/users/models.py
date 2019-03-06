from django.db import models
from django.contrib.auth.models import User
from django_countries.fields import CountryField
from django.utils.translation import gettext_lazy as _


class AppUser(User):
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

    nif = models.PositiveIntegerField()
    n_cc = models.PositiveIntegerField()
    dob = models.DateField()
    institucional_email = models.EmailField()
    contact = models.PositiveIntegerField()
    emergency_contact = models.PositiveIntegerField()
    professional_occupation = models.TextField(max_length=512)
    display_image = models.ImageField()
    country = CountryField()
    marital_status = models.CharField(
        max_length=8,
        choices=MARITAL_STATUS,
    )
    gender = models.CharField(
        max_length=1,
        choices=GENDER,
    )


class Student(AppUser):
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

    number = models.PositiveIntegerField()
    call = models.CharField(
        max_length=1,
        choices=CALL,
    )
    entry_grade = models.FloatField(max_length=200.0)
    statute = models.CharField(
        max_length=8,
        choices=STATUTE,
    )
    course = models.ForeignKey(
        'courses.Course',
        on_delete=models.CASCADE,
    )
    faculty = models.ForeignKey(
        'organizations.Faculty',
        on_delete=models.CASCADE,
    )



class Administrator(AppUser):
    number = models.PositiveIntegerField()


class Professor(AppUser):
    RANKS = (
        ("assist", _("Assistant Professor")),
        ("assistinv", _("Invited Assistant Professor")),
        ("full", _("Full Professor")),
        ("fullvis", _("Visiting Full Professor")),
        ("associ", _("Associate Professor")),
        ("associnv", _("Invited Associate Professor")),
        ("assocagr", _("Associate Professor with Agregação")),
    )

    number = models.PositiveIntegerField()
    rank = models.CharField(
        max_length=9,
        choices=RANKS,
    )
