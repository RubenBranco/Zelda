from rest_framework.permissions import BasePermission, IsAdminUser


class AppUserSelfPermission(BasePermission):
    def has_permission(self, request, view):
        if view.action == "list":
            return IsAdminUser().has_permission(request, view)
        return True

    def has_object_permission(self, request, view, obj):
        return obj == request.user or request.user.is_superuser
