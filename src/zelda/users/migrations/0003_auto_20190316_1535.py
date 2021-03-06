# Generated by Django 2.1.7 on 2019-03-16 15:35

from django.db import migrations, models
import django_countries.fields


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0002_auto_20190316_1518'),
    ]

    operations = [
        migrations.AlterField(
            model_name='appuser',
            name='contact',
            field=models.PositiveIntegerField(null=True),
        ),
        migrations.AlterField(
            model_name='appuser',
            name='country',
            field=django_countries.fields.CountryField(max_length=2, null=True),
        ),
        migrations.AlterField(
            model_name='appuser',
            name='dob',
            field=models.DateField(null=True),
        ),
        migrations.AlterField(
            model_name='appuser',
            name='emergency_contact',
            field=models.PositiveIntegerField(null=True),
        ),
        migrations.AlterField(
            model_name='appuser',
            name='gender',
            field=models.CharField(choices=[('m', 'Male'), ('f', 'Female')], max_length=1, null=True),
        ),
        migrations.AlterField(
            model_name='appuser',
            name='institutional_email',
            field=models.EmailField(max_length=254, null=True, unique=True),
        ),
        migrations.AlterField(
            model_name='appuser',
            name='marital_status',
            field=models.CharField(choices=[('single', 'Single'), ('married', 'Married'), ('divorced', 'Divorced'), ('widowed', 'Widowed')], max_length=8, null=True),
        ),
        migrations.AlterField(
            model_name='appuser',
            name='n_cc',
            field=models.PositiveIntegerField(null=True, unique=True),
        ),
        migrations.AlterField(
            model_name='appuser',
            name='nif',
            field=models.PositiveIntegerField(null=True, unique=True),
        ),
        migrations.AlterField(
            model_name='appuser',
            name='user_type',
            field=models.CharField(choices=[('Student', 'Student'), ('Professor', 'Professor'), ('Administrator', 'Administrator')], max_length=13, null=True),
        ),
    ]
