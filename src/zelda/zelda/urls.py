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
from users import views as user_views


api = routers.DefaultRouter()

api.register("student/", user_views.StudentViewSet, base_name="student")
api.register("appuser", user_views.AppUserViewSet, base_name="appuser")
api.register("attendances",user_views.AttendanceViewSet, base_name="attendances")


urlpatterns = [
    path('jet/dashboard/', include('jet.dashboard.urls', 'jet-dashboard')),
    path('jet/', include('jet.urls', 'jet')),
    path('admin/import/<model>', common_views.ImportEntitiesView.as_view(), name='import_models'),
    path('admin/', admin.site.urls),
    path('i18n/', include('django.conf.urls.i18n')),
    path('jsi18n/',
        JavaScriptCatalog.as_view(packages=['zelda'], domain='djangojs'),
        name='javascript-catalog',
    ),
    path('login/', common_views.LoginView.as_view(), name='login'),
    path('logout/', common_views.LogoutView.as_view(), name='logout'),
    path('api/', include(api.urls)),
    path('api-auth/', include('rest_framework.urls')),
    path('api-docs/', include_docs_urls(title="Zelda REST API")),
    path('', common_views.FrontpageView.as_view(), name='frontpage'),
]
