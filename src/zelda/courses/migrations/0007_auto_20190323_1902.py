# Generated by Django 2.1.7 on 2019-03-23 19:02

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('courses', '0006_auto_20190323_1850'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='finalgrade',
            name='course',
        ),
        migrations.RemoveField(
            model_name='grade',
            name='course',
        ),
        migrations.AddField(
            model_name='finalgrade',
            name='subject',
            field=models.ForeignKey(default=None, on_delete=django.db.models.deletion.CASCADE, to='courses.Subject'),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='grade',
            name='subject',
            field=models.ForeignKey(default=None, on_delete=django.db.models.deletion.CASCADE, to='courses.Subject'),
            preserve_default=False,
        ),
    ]