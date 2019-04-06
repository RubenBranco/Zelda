from rest_framework.permissions import BasePermission, IsAdminUser

from common.permissions import BaseAppPermission
from common.utils import get_user_from_request
from .models import Student, Professor


class AppUserSelfPermission(BaseAppPermission):
    pass


class StudentPermission(BaseAppPermission):
    def has_object_permission(self, request, view, obj):
        return obj == get_user_from_request(request) or request.user.is_superuser


class ProfessorPermission(BaseAppPermission):
    def has_object_permission(self, request, view, obj):
        return obj == get_user_from_request(request) or request.user.is_superuser


class AttendancePermission(BasePermission):
    def has_permission(self, request, view):
        if view.action in ["list", "create"]:
            return IsAdminUser().has_permission(request, view) or \
                isinstance(get_user_from_request(request), Professor)
        return True

    def has_object_permission(self, request, view, obj):
        return ProfessorPermission().has_object_permission(request, view, obj) or \
            obj.student == get_user_from_request(request)
