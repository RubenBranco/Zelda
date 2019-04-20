import random, sys, datetime


from django.db import models

from users.models import AppUser, Student, Professor, Administrator
from courses.models import SubjectSpecification, Subject, CourseSubject, Course
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
        elif model == "Department":
            create_department()
        elif model == "Room":
            create_room()
        elif model == "SubjectSpecification":
            create_subjectspecification()
        elif model == "Subject":
            create_subject()
        elif model == "CourseSubject":
            create_coursesubject()
        
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
        code=str(random.randrange(1, 10000000000)),
        designation=str(random.randrange(1, 10000000000)),
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

def create_department():

    councils = DepartmentCouncil.objects.all()
    council_list = [council for council in councils]

    faculties = Faculty.objects.all()
    faculty_list = [faculty for faculty in faculties]

    dept = Department(
        designation=str(random.randrange(1, 10000000000)),
        field=str(random.randrange(1, 10000000000)),
        code=str(random.randrange(1, 10000000000)),
        council=random.choice(council_list),
        faculty=random.choice(faculty_list),
    )

    dept.save()

def create_room():

    departments = Department.objects.all()
    department_list = [department for department in departments]

    faculties = Faculty.objects.all()
    faculty_list = [faculty for faculty in faculties]

    room = Room(
        r_type=random.choice(["office", "class", "library", "secretarial", "laboratory", "auditorium", "study"]),
        capacity=random.randrange(1, 401),
        building=random.randrange(1, 9),
        floor=random.randrange(1, 6),
        door=random.randrange(1, 50),
        faculty=random.choice(faculty_list),
        department=random.choice(department_list),
    )

    room.save()

def create_subjectspecification():
    subjectSpec = SubjectSpecification(
        ects=random.randrange(1, 61),
        code=str(random.randrange(1, 10000000000)),
        programme=str(random.randrange(1, 10000000000)),
        objectives=str(random.randrange(1, 10000000000)),
        evaluation_method=str(random.randrange(1, 10000000000)),
        bibliography=str(random.randrange(1, 10000000000)),
        theory_shifts=random.randrange(1, 3),
        practice_shifts=random.randrange(1, 11),
        lab_shifts=random.randrange(1, 11),
        field_shifts=random.randrange(1, 6),
    )

    subjectSpec.save()

def create_subject():

    subjectSpecs = SubjectSpecification.objects.all()
    subjectSpec_list = [subjectSpec for subjectSpec in subjectSpecs]

    students = Student.objects.all()
    student_list = [student for student in students]

    subject = Subject(
        subject_spec=random.choice(subjectSpec_list),
        lective_year=datetime.datetime.now().date,
        semester=random.choice(["1", "2"]),
        duration=random.randrange(12, 16),
    )

    subject.save()
    subject.students.add(random.choice(student_list))

def create_coursesubject():

    subjects = Subject.objects.all()
    subject_list = [subject for subject in subjects]

    courseSub = CourseSubject(
        subject=random.choice(subject_list),
        designation=str(random.randrange(1, 10000000000)),
        course_year=random.randrange(1, 6),
    )

    courseSub.save()


populateDB(sys.argv[1], sys.argv[2])