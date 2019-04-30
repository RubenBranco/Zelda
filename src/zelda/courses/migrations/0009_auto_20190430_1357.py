# Generated by Django 2.1.7 on 2019-04-30 13:57

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('courses', '0008_auto_20190414_1455'),
    ]

    operations = [
        migrations.AddField(
            model_name='coursesubject',
            name='course',
            field=models.ForeignKey(default=None, on_delete=django.db.models.deletion.CASCADE, to='courses.Course'),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='coursespecification',
            name='course_programme',
            field=models.ManyToManyField(to='courses.SubjectSpecification'),
        ),
    ]
