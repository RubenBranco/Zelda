from users.models import Student, Administrator, Professor


def get_user_from_appuser(app_user):
    user_cls = globals()[app_user.user_type]
    return user_cls.objects.get(app_user=app_user)


def get_user_from_request(request):
    return get_user_from_appuser(request.user)
