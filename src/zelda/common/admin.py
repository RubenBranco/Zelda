from datetime import datetime

from django.contrib import admin
from django.contrib.auth.models import Group
import pandas as pd
import numpy as np

from organizations.models import Faculty, Department
from users.models import Student, AppUser, Professor
from courses.models import Course, CourseSpecification, SubjectSpecification


admin.site.unregister(Group)


# Register your models here.

APP_USER_INFO = [
    "nif",
    "n_cc",
    "dob",
    "institutional_email",
    "contact",
    "emergency_contact",
    "professional_occupation",
    "country",
    "marital_status",
    "gender",
    "username",
    "first_name",
    "last_name",
    "email",
]

"""
COURSE_SPEC_INFO = [
    "code",
    "designation",
    "degree",
    "ects",
    "total_semesters",
    "field",
    "status",
    "entrance_exams",
    "regime",
    "department",
    "course_programme",
]

SUBJECT_SPEC_INFO = [
    "ects",
    "code",
    "programme",
    "objectives",
    "evaluation_method",
    "bibliography",
]
"""

def populate_dict(entity_dict, info):
    spec = dict()

    for key in entity_dict.keys():
        if key in info:
            spec[key] = entity_dict[key]

    [entity_dict.pop(key) for key in spec.keys()]

    return spec


def import_csv(csv_file, model):
    df = pd.read_csv(csv_file)

    header = list(df.columns.values)

    for entity in range(len(df)):
        entity_dict = dict()
        for attr in header:
            entity_dict[attr] = df[header][attr][entity]
        model_name = model.__name__.lower()
        globals()[f"{model_name}_get_extra_args"](entity_dict)
        globals()[f"create_{model_name}"](entity_dict, model)


def create_student(attrs, model):
    course = attrs['course']
    attrs.pop('course')

    new_student = model(**attrs)
    new_student.save()
    new_student.course.add(course)
    new_student.save()


def create_course(attrs, model):
    new_course = model(**attrs)
    new_course.save()


def create_subject(attrs, model):
    new_subject = model(**attrs)
    new_subject.save()


# abstract user --> appUser --> student

def student_get_extra_args(attrs):

    # app_user creation
    app_user_dict = populate_dict(attrs, APP_USER_INFO)
    app_user = AppUser.objects.create_user(**app_user_dict)
    attrs["app_user"] = app_user

    # populate Student with foreign keys
    course_spec = CourseSpecification.objects.get(code=attrs['course'])
    course = Course.objects.get(
        specification=course_spec,
        lective_year=datetime.strptime(attrs['lective_year'], '%Y-%m-%d'),
    )
    attrs['course'] = course
    attrs.pop('lective_year')
    faculty_code = attrs['faculty']
    attrs['faculty'] = Faculty.objects.get(code=faculty_code)

def course_get_extra_args(attrs):
    # departament --> course spec
    # professor --> course

    # course_spec creation + population with foreign keys
    """department_code = attrs['department']
    attrs['department'] = Department.objects.get(code=department_code)
    course_spec_dict, attrs = populate_dict(attrs, COURSE_SPEC_INFO)
    course_spec = CourseSpecification(course_spec_dict)"""

    course_spec_code = attrs["specification"]
    attrs["specification"] = CourseSpecification.objects.get(code=course_spec_code)

    # populate Course with foreign keys
    professor_number = attrs['coordinator']
    attrs['coordinator'] = Professor.objects.get(number=professor_number)

    attrs['lective_year'] = datetime.strptime(attrs['lective_year'], '%Y-%m-%d')

def subject_get_extra_args(attrs):

    # populate Subject with foreign keys
    subject_spec_code = attrs["subject_spec"]
    attrs["subject_spec"] = SubjectSpecification.objects.get(code=subject_spec_code)
    attrs['lective_year'] = datetime.strptime(attrs['lective_year'], '%Y-%m-%d')
