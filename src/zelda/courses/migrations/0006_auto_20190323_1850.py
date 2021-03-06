# Generated by Django 2.1.7 on 2019-03-23 18:50

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('courses', '0005_auto_20190323_1846'),
    ]

    operations = [
        migrations.AlterField(
            model_name='coursespecification',
            name='course_programme',
            field=models.ManyToManyField(to='courses.CourseSubject'),
        ),
        migrations.AlterField(
            model_name='subject',
            name='students',
            field=models.ManyToManyField(blank=True, to='users.Student'),
        ),
    ]
