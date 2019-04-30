import requests
from django.conf import settings
from PIL import Image

from users.models import Student, Administrator, Professor


def get_user_from_appuser(app_user):
    user_cls = globals()[app_user.user_type]
    return user_cls.objects.get(app_user=app_user)


def get_user_from_request(request):
    return get_user_from_appuser(request.user)


def upload_image(request):
    user = get_user_from_request(request)

    image = Image.open(request.FILES['image'])
    ext = image.format.lower()
    image.close()

    requests.post(
        f"{settings.S3_HOST}/user/images",
        data=dict(
            path='user_images',
        ),
        files=[
            (
                'image',
                (
                    f"{user.id}.{ext}",
                    request.FILES['image'],
                    f'image/{ext}',
                )
            )
        ],
    )
