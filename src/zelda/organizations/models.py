from django.db import models
from django.utils.translation import gettext_lazy as _

from users.models import Professor


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
    )

