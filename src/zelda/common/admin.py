from django.contrib import admin
from django.contrib.auth.models import Group
import pandas as pd
import numpy as np

from organizations.models import Faculty, Department
from users.models import Student, AppUser
from courses.models import Course, CourseSpecification, SubjectSpecification


admin.site.unregister(Group)


# Register your models here.

APP_USER_INFO = [
    "nif",
    "n_cc",
    "dob",
    "institucional_email",
    "contact",
    "emergency_contact",
    "professional_occupation",
    "display_image",
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
            entity_dict.pop(key)
   
    return (spec, entity_dict)
    

def import_csv(csv_file, model):
  
    with open(csv_file) as fr:
        df = pd.read_csv(fr)

    header = list(df.columns.values)
    
    for entity in range(len(df)):
        entity_dict = dict()
        for attr in header:  
            entity_dict[attr] = df[header][attr][entity]

        globals()[f"{model.__name__.lower()}_get_extra_args"](entity_dict)

        new_entity = model(**entity_dict)
        new_entity.save()
        

# abstract user --> appUser --> student

def student_get_extra_args(attrs):
    
    # app_user creation
    app_user_dict, attrs = populate_dict(attrs, APP_USER_INFO)
    app_user = AppUser(app_user_dict)
    attrs["app_user"] = app_user

    # populate Student with foreign keys
    course_code = attrs['course']
    attrs['course'] = Course.objects.get(code=course_code)
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

def subject_get_extra_args(attrs):
    
    # populate Subject with foreign keys
    subject_spec_code = attrs["subject_spec"]
    attrs["subject_spec"] = SubjectSpecification.objects.get(code=subject_spec_code)
