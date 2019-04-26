import os
import json

from django.views import View
from django.http.response import HttpResponse
from django.http.request import QueryDict
from django.conf import settings
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator


@method_decorator(csrf_exempt, name='dispatch')
class UserImageView(View):
    def post(self, request):
        base_path = os.path.join(settings.MEDIA_ROOT, request.POST['path'])
        os.makedirs(base_path, exist_ok=True)
        self.save_file(
            request.FILES['image'],
            os.path.join(base_path, request.FILES['image'].name),
        )
        return HttpResponse(status=200)

    def save_file(self, f, path):
        with open(path, 'wb+') as destination:
            for chunk in f.chunks():
                destination.write(chunk)
