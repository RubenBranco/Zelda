# Generated by Django 2.1.7 on 2019-03-09 17:20

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('timetable', '0002_attendance'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='class',
            options={'verbose_name': 'class', 'verbose_name_plural': 'classes'},
        ),
    ]