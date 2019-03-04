# Generated by Django 2.1.7 on 2019-03-04 22:29

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Course',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('lective_year', models.DateField()),
                ('vacancies', models.IntegerField()),
            ],
        ),
        migrations.CreateModel(
            name='CourseSpecification',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('code', models.CharField(max_length=10)),
                ('designation', models.CharField(max_length=100)),
                ('degree', models.CharField(choices=[('post-grad', 'Post-Graduation'), ('bachelor', 'Bachelors'), ('master', 'Masters'), ('phd', 'Doctorate')], max_length=9)),
                ('ects', models.FloatField()),
                ('total_semesters', models.SmallIntegerField()),
                ('field', models.CharField(max_length=50)),
                ('status', models.CharField(choices=[('active', 'active'), ('inactive', 'inactive')], max_length=8)),
                ('regime', models.CharField(choices=[('day', 'day'), ('night', 'night')], max_length=5)),
            ],
        ),
        migrations.CreateModel(
            name='CourseSubject',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('course_year', models.PositiveSmallIntegerField()),
            ],
        ),
        migrations.CreateModel(
            name='EntranceExam',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('designation', models.CharField(max_length=50)),
                ('min_classification', models.FloatField()),
                ('field', models.CharField(max_length=50)),
                ('weight', models.FloatField()),
            ],
        ),
        migrations.CreateModel(
            name='Subject',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('lective_year', models.DateField()),
                ('semester', models.CharField(choices=[('1', '1'), ('2', '2')], max_length=1)),
                ('duration', models.PositiveSmallIntegerField()),
            ],
        ),
        migrations.CreateModel(
            name='SubjectSpecification',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('ects', models.FloatField()),
                ('designation', models.CharField(max_length=100)),
                ('code', models.CharField(max_length=10)),
                ('programme', models.TextField()),
                ('objectives', models.TextField()),
                ('evaluation_method', models.TextField()),
                ('bibliography', models.TextField()),
            ],
        ),
        migrations.AddField(
            model_name='subject',
            name='subject_spec',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='courses.SubjectSpecification'),
        ),
        migrations.AddField(
            model_name='coursesubject',
            name='subject',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='courses.Subject'),
        ),
        migrations.AddField(
            model_name='coursespecification',
            name='course_programme',
            field=models.ManyToManyField(to='courses.CourseSubject'),
        ),
    ]
