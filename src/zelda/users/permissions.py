from rest_framework.permissions import BasePermission, IsAdminUser

from .models import Student, Professor

class AppUserSelfPermission(BasePermission):
    def has_permission(self, request, view):
        if view.action == "list":
            return IsAdminUser().has_permission(request, view)
        return True

    def has_object_permission(self, request, view, obj):
        return obj == request.user or request.user.is_superuser


class StudentPermission(AppUserSelfPermission):
    def has_object_permission(self, request, view, obj):
        return obj == Student.objects.get(app_user=request.user) or request.user.is_superuser


class ProfessorPermission(AppUserSelfPermission):
    def has_object_permission(self, request, view, obj):
        return obj == Professor.objects.get(app_user=request.user) or request.user.is_superuser
