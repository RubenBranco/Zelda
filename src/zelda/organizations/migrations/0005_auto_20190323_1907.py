# Generated by Django 2.1.7 on 2019-03-23 19:07

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('organizations', '0004_auto_20190323_1800'),
    ]

    operations = [
        migrations.AlterField(
            model_name='room',
            name='r_type',
            field=models.CharField(choices=[('office', 'Office'), ('class', 'Classroom'), ('library', 'Library'), ('secretarial', 'Secretarial Office'), ('laboratory', 'Laboratory'), ('auditorium', 'Auditorium'), ('study', 'Studyroom')], max_length=11),
        ),
    ]