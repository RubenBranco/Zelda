from common.permissions import BaseAppPermission
from common.utils import get_user_from_request


class ShiftPermission(BaseAppPermission):
    pass


class LessonSpecPermission(BaseAppPermission):
    pass


class ShiftExchangeRequestPermission(BaseAppPermission):
    def has_object_permission(self, request, view, obj):
        user = get_user_from_request(request)
        return super().has_object_permission(request, view, obj) or \
            obj.shift.professor == user
