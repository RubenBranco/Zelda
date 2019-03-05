# Generated by Django 2.1.7 on 2019-03-05 18:38

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0002_student_course'),
        ('timetable', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Attendance',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('lesson', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='timetable.Lesson')),
                ('student', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='users.Student')),
            ],
        ),
    ]
