# Generated by Django 2.1.7 on 2019-03-23 15:26

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('timetable', '0003_shift_professor'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='lesson',
            name='lesson_spec',
        ),
        migrations.AddField(
            model_name='lesson',
            name='shift',
            field=models.ForeignKey(default=None, on_delete=django.db.models.deletion.CASCADE, to='timetable.Shift'),
            preserve_default=False,
        ),
    ]