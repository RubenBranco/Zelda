# Generated by Django 2.1.7 on 2019-03-23 14:26

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0004_auto_20190316_2223'),
    ]

    operations = [
        migrations.AlterField(
            model_name='student',
            name='faculty',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='organizations.Faculty'),
        ),
        migrations.AlterField(
            model_name='student',
            name='statute',
            field=models.CharField(choices=[('worker', 'Worker'), ('athlete', 'Athlete'), ('fireman', 'Fireman'), ('military', 'Military'), ('union', "Student's Union"), ('special', 'Special Learning Needs'), ('parent', 'Parent')], max_length=8, null=True),
        ),
    ]