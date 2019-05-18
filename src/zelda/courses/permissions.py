from rest_framework.permissions import IsAdminUser

from common.permissions import BaseAppPermission
from common.utils import get_user_from_request
from users.models import Professor


class CourseSubjectPermission(BaseAppPermission):
    pass


class SubjectPermission(BaseAppPermission):
    def has_permission(self, request, view):
        if view.action in ["list", "shiftless_students"]:
            return IsAdminUser().has_permission(request, view) or \
                isinstance(get_user_from_request(request), Professor)
        return super().has_permission(request, view)
