"""zelda URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from django.views.i18n import JavaScriptCatalog
from django.views.decorators.http import last_modified
from django.utils import timezone
from rest_framework import routers
from rest_framework.documentation import include_docs_urls
from jet.dashboard import dashboard

from common import views as common_views
from users import views as users_views
from courses import views as course_views
from timetable import views as timetable_views


api = routers.DefaultRouter()

api.register("student", users_views.StudentViewSet, base_name="student")
api.register("appuser", users_views.AppUserViewSet, base_name="appuser")
api.register("professor", users_views.ProfessorViewSet, base_name="professor")
api.register("attendances", users_views.AttendanceViewSet, base_name="attendances")
api.register("course", course_views.CourseViewSet, base_name="course")
api.register("course_spec", course_views.CourseSpecificationViewSet, base_name="course_spec")
api.register("course_subject", course_views.CourseSubjectViewSet, base_name="course_subject")
api.register("subject", course_views.SubjectViewSet, base_name="subject")
api.register("subject_spec", course_views.SubjectSpecificationViewSet, base_name="subject_spec")
api.register("timetable_lesson_spec", timetable_views.TimetableLessonSpecViewSet, base_name="timetable_lesson_spec")
api.register("shift", timetable_views.ShiftViewSet, base_name="shift")
api.register("shift_xg_requests", timetable_views.ShiftExchangeRequestViewSet, base_name="shift_xg_requests")


urlpatterns = [
    path('jet/dashboard/', include('jet.dashboard.urls', 'jet-dashboard')),
    path('jet/', include('jet.urls', 'jet')),
    path('admin/import/<model>', common_views.ImportEntitiesView.as_view(), name='import_models'),
    path('admin/', admin.site.urls),
    path('i18n/', include('django.conf.urls.i18n')),
    path(
        'jsi18n/',
        JavaScriptCatalog.as_view(packages=['zelda'], domain='djangojs'),
        name='javascript-catalog',
    ),
    path(
        'professor/view_attendances',
        timetable_views.ProfViewAttendancesView.as_view(),
        name='prof_view_attendances',
    ),
    path(
        'professor/subject/schedule',
        timetable_views.ProfViewSubjectScheduleView.as_view(),
        name='prof_view_subject_schedule',
    ),
    path(
        'students/view_attendances',
        timetable_views.StudentViewAttendancesView.as_view(),
        name='student_view_attendances',
    ),
    path(
        'professor/view_shiftless_students',
        timetable_views.ProfCheckShiftlessStudentsView.as_view(),
        name='prof_view_shiftless_students',
    ),
    path(
        'courses/<identifier>',
        course_views.ViewCourseInfoView.as_view(),
        name='view_course',
    ),
    path(
        'users/<identifier>',
        users_views.UserProfileView.as_view(),
        name='view_user',
    ),
    path(
        'subjects/<identifier>',
        course_views.ViewSubjectInfoView.as_view(),
        name='view_subject',
    ),
    path(
        'professor/grades',
        course_views.ProfessorViewGradesView.as_view(),
        name='professor_view_grades',
    ),
    path(
        'student/grades',
        course_views.StudentViewGradesView.as_view(),
        name='student_view_grades',
    ),
    path(
        'student/timetable',
        timetable_views.StudentViewTimetableView.as_view(),
        name='student_view_timetable',
    ),
    path(
        'student/shift_management',
        timetable_views.StudentShiftManagementView.as_view(),
        name='student_shift_management',
    ),
    path(
        'student/subject_shift_management/<subject_id>',
        timetable_views.StudentSubjectShiftManagementView.as_view(),
        name='student_subject_shift_management',
    ),
    path(
        'student/subject/schedule',
        timetable_views.StudentViewSubjectScheduleView.as_view(),
        name='student_view_subject_schedule',
    ),
    path(
        'professor/shift_management/requests',
        timetable_views.ReviewShiftExchangeRequestsView.as_view(),
        name='professor_view_shift_xg_requests',
    ),
    path('login/', common_views.LoginView.as_view(), name='login'),
    path('logout/', common_views.LogoutView.as_view(), name='logout'),
    path('api/', include(api.urls)),
    path('api-auth/', include('rest_framework.urls')),
    path('api-docs/', include_docs_urls(title="Zelda REST API")),
    path('', common_views.FrontpageView.as_view(), name='frontpage'),
]
