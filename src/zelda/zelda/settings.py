"""
Django settings for zelda project.

Generated by 'django-admin startproject' using Django 2.1.5.

For more information on this file, see
https://docs.djangoproject.com/en/2.1/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/2.1/ref/settings/
"""

import os
from datetime import timedelta
from celery.schedules import crontab

# Build paths inside the project like this: os.path.join(BASE_DIR, ...)
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))


# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/2.1/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = 'jpd)f2m1(l94sxcn$u!3vbd7z9+km&y6+*3avd-htrovq!_9$%'

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = os.getenv("DEBUG", "no").lower() not in {"0", "no", "false", "n", "f", ""}

ALLOWED_HOSTS = [ 'zelda-edu.me', 'localhost', '127.0.0.1' ]

SECURE_PROXY_SSL_HEADER = ('HTTP_X_FORWARDED_PROTO', 'https')

CSRF_COOKIE_SECURE = not DEBUG

CSRF_TRUSTED_ORIGINS = [
    'localhost',
    'zelda-edu.me',
    'dev.zelda-edu.me',
    '127.0.0.1',
]

# Application definition

INSTALLED_APPS = [
    'jet.dashboard',
    'jet',
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'users',
    'courses',
    'organizations',
    'timetable',
    'common',
    'zelda',
    'rest_framework',
    'db_management',
]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.locale.LocaleMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'zelda.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [
            os.path.join(BASE_DIR, 'zelda', 'templates'),
        ],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'zelda.wsgi.application'


# Database
# https://docs.djangoproject.com/en/2.1/ref/settings/#databases

if DEBUG:
    DATABASES = {
        'default': {
            'ENGINE': 'django.db.backends.sqlite3',
            'NAME': os.path.join(BASE_DIR, 'db.sqlite3'),
        }
    }
else:
    DATABASES = {
        'default': {
            'ENGINE': 'django.db.backends.postgresql_psycopg2',
            'NAME': os.getenv('POSTGRES_DB'),
            'USER': os.getenv('POSTGRES_USER'),
            'PASSWORD': os.getenv('POSTGRES_PASSWORD'),
            'HOST': 'postgres',
            'PORT': os.getenv('POSTGRES_PORT'),
        }
    }


# Password validation
# https://docs.djangoproject.com/en/2.1/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]


# Internationalization
# https://docs.djangoproject.com/en/2.1/topics/i18n/


TIME_ZONE = 'UTC'

USE_I18N = True

USE_L10N = True

USE_TZ = True


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/2.1/howto/static-files/

STATIC_URL = '/static/'

STATIC_ROOT = os.getenv("STATIC_DIR")

STATICFILES_DIRS = [
    os.path.join(BASE_DIR, 'deps', 'static'),
]

# Accounts

AUTH_USER_MODEL = "users.AppUser"
LOGIN_URL = '/login/'

# i18n

LOCALE_PATHS = [os.path.join(BASE_DIR, "zelda", "locale")]

LANGUAGE_CODE = 'pt'

LANGUAGES = (
    ('en', 'English'),
    ('pt', 'Português'),
)

JET_INDEX_DASHBOARD = "zelda.dashboard.ZeldaIndexDashboard"

# REST FRAMEWORK

REST_FRAMEWORK = {
    'DEFAULT_PERMISSION_CLASSES': [
        'rest_framework.permissions.DjangoModelPermissionsOrAnonReadOnly'
    ]
}

# CACHE

if DEBUG:
    CACHES = {
        'default': {
            'BACKEND': 'django.core.cache.backends.locmem.LocMemCache',
            'LOCATION': 'unique-snowflake',
    }
}
else:
    CACHES = {
        'default': {
            'BACKEND': 'django.core.cache.backends.memcached.MemcachedCache',
            'LOCATION': [
                f"{os.getenv('MEMCACHED_HOST')}",
            ]
        }
    }

# INSTITUTION SETTINGS

WEBMAIL_URL = "https://webmail.ciencias.ulisboa.pt"

if not DEBUG:
    LOGGING = {
        'version': 1,
        'disable_existing_loggers': False,
        'handlers': {
            'djangofilelog': {
                'level': 'WARNING',
                'class': 'logging.FileHandler',
                'filename': os.path.join(
                    os.getenv('LOGS_DIR'),
                    'django.log'
                ),
            },
        },
        'loggers': {
            'django': {
                'handlers': ['djangofilelog'],
                'level': 'WARNING',
                'propagate': True,
            },
        },
    }

# S3

S3_HOST = f"http://{os.getenv('S3_HOST')}"

# DB Management

DBBACKUP_DIR = os.getenv("BACKUP_DIR")
GPG_KEY_PATH = os.getenv("GPG_KEY_PATH")
GPG_RECIPIENT = os.getenv("GPG_RECIPIENT")
DBBACKUP_DATE_FORMAT = '%Y-%m-%d-%H%M%S'
TMP_FILE_MAX_SIZE = 10 * 1024 * 1024
GPG_ALWAYS_TRUST = True

BACKUP_TIMES = [
    '8',
    '20'
]

# How much older from the most recent backup should backups be kept
ARCHIVE_DELTA = timedelta(days=7)

# CELERY

CELERY_BROKER_URL = 'amqp://zelda:zelda2019@rabbitmq:5672'
CELERY_RESULT_BACKEND = CELERY_BROKER_URL
CELERY_ACCEPT_CONTENT = ['application/json']
CELERY_TASK_SERIALIZER = 'json'
CELERY_RESULT_SERIALIZER = 'json'
CELERY_TIMEZONE = 'UTC'
CELERY_BEAT_SCHEDULE = {
    'backup-db': {
        'task': 'db_management.tasks.backup_db_task',
        'schedule': crontab(
            minute=0,
            hour=','.join(BACKUP_TIMES),
            day_of_week='*',
            day_of_month='*',
            month_of_year='*',
        ),
    },
}

PASSING_GRADE = 9.5
