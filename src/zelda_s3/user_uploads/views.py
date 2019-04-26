import os
import json

from django.views.generic import View
from django.http.request import QueryDict
from django.conf import settings


class UserImageView(View):
    def post(self, request):
        if request.content_type == "application/json":
            data = json.loads(request.body)
        else:
            data = QueryDict(request.body)

        base_path = os.path.join(settings.MEDIA_ROOT, data['path'])
        os.makedirs(base_path, exist_ok=True)
        self.save_file(
            request.FILES['image'],
            os.path.join(base_path, request.FILES['image'].name),
        )

    def save_file(self, f, path):
        with open(path, 'wb+') as destination:
            for chunk in f.chunks():
                destination.write(chunk)
