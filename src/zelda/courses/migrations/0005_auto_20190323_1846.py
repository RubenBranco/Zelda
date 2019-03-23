# Generated by Django 2.1.7 on 2019-03-23 18:46

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0007_auto_20190323_1800'),
        ('courses', '0004_auto_20190323_1800'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='coursesubject',
            name='students',
        ),
        migrations.AddField(
            model_name='subject',
            name='students',
            field=models.ManyToManyField(to='users.Student'),
        ),
        migrations.AlterField(
            model_name='coursespecification',
            name='course_programme',
            field=models.ManyToManyField(blank=True, to='courses.CourseSubject'),
        ),
    ]
