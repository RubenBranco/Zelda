import random, sys, datetime


from django.db import models

from users.models import AppUser, Student, Professor, Administrator
from courses.models import Course
from organizations.models import Faculty, DepartmentCouncil, Department, Room

def populateDB(model, loops):
    for i in range(loops):
        if model == "Student":
            create_student()
        elif model == "Professor":
            create_professor()
        elif model == "Administrator":
            create_administrator()
        elif model == "Faculty":
            create_faculty()
        elif model == "DepartmentCouncil":
            create_departmentcouncil()
        
def create_appuser():
    user = AppUser(
        nif=random.randrange(100000000, 10000000000),
        n_cc=random.randrange(100000000, 10000000000),
        dob=datetime.datetime.now().date,
        institutional_email=str(random.randrange(100000000, 10000000000)) + "@zelda.pt",
        contact=random.randrange(100000000, 10000000000),
        emergency_contact=random.randrange(100000000, 10000000000),
        professional_occupation=str(random.randrange(100000000, 10000000000)),
        country="Portugal",
        marital_status=random.choice(["single", "married", "divorced", "widowed"]),
        gender=random.choice(["m", "f"]),
        user_type="Student",
    )
    user.save()

    return user

def create_student():
    user = create_appuser()

    courses = Course.objects.all()
    course_list = [course for course in courses]

    faculties = Faculty.objects.all()
    faculty_list = [faculty for faculty in faculties]

    student = Student(
        app_user=user,
        number=random.randrange(1, 10000000000),
        call=random.choice([1, 2]),
        entry_grade=random.randrange(0, 201),
        statute=random.choice(["worker", "athlete", "fireman", "military", "union", "special", "parent"]),
        faculty=random.choice(faculty_list),
    )

    student.save()
    student.course.add(random.choice(course_list))

def create_professor():
    user = create_appuser()

    professor = Professor(
        app_user=user,
        number=random.randrange(1, 10000000000),
        rank=random.choice(["assist", "assistinv", "full", "fullvis", "associ", "associnv", "assocagr"]),
    )

    professor.save()

def create_administrator():
    user = create_appuser()

    admin = Administrator(
        app_user=user,
        number=random.randrange(1, 10000000000),
    )

    admin.save()

def create_faculty():
    faculty = Faculty(
        code=random.randrange(1, 10000000000),
        designation=random.randrange(1, 10000000000),
    )

    faculty.save()

def create_departmentcouncil():

    professors = Professor.objects.all()
    professor_list = [professor for professor in professors]

    deptC = DepartmentCouncil(
        president=random.choice(professor_list),
        vice_president_one=random.choice(professor_list),
        vice_president_two=random.choice(professor_list),
    )

    deptC.save()

populateDB(sys.argv[1], sys.argv[2])