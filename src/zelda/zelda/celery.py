from __future__ import absolute_import, unicode_literals
import os

from django.conf import settings
from celery import Celery
from celery.schedules import crontab


os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'zelda.settings')

app = Celery('zelda')

app.config_from_object('django.conf:settings', namespace='CELERY')
app.autodiscover_tasks()
