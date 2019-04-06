from common.permissions import BaseAppPermission
from .models import Student, Professor


class AppUserSelfPermission(BaseAppPermission):
    pass


class StudentPermission(BaseAppPermission):
    def has_object_permission(self, request, view, obj):
        return obj == Student.objects.get(app_user=request.user) or request.user.is_superuser


class ProfessorPermission(BaseAppPermission):
    def has_object_permission(self, request, view, obj):
        return obj == Professor.objects.get(app_user=request.user) or request.user.is_superuser
