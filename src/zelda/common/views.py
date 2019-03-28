import json
import re

from django.conf import settings
from django.shortcuts import render, reverse, redirect
from django.http.response import HttpResponse
from django.views.generic import TemplateView, View
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.mixins import LoginRequiredMixin
from django.http.request import QueryDict
from django.utils.decorators import method_decorator
from django.views.decorators.cache import never_cache
from django.views.decorators.csrf import csrf_protect
from django.views.decorators.debug import sensitive_post_parameters
from django.contrib.admin.views.decorators import staff_member_required

from courses.models import Course, Subject
from users.models import Student
from .admin import import_csv
from .utils import get_user_from_request


class AbstractAppView(TemplateView):
    def __init_subclass__(cls, **kwargs):
        super().__init_subclass__(**kwargs)
        cls_name = cls.__name__
        if not cls.__name__.startswith("Abstract"):
            cls.template_name = f"zelda/{re.sub('View', '', cls_name).lower()}.html"

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        app_user = self.request.user

        context.update(
            dict(
                view_name=re.sub("View", "", self.__class__.__name__).lower(),
                webmail_url=settings.WEBMAIL_URL,
                app_user=app_user,
                specific_user=get_user_from_request(self.request) if app_user.is_authenticated else None
            )
        )

        return context


class AbstractLoggedInAppView(LoginRequiredMixin, AbstractAppView):
    login_url = '/login/'
    redirect_field_name = 'redirect_to'


class FrontpageView(AbstractLoggedInAppView):
    pass


class LoginView(AbstractAppView):

    @method_decorator(sensitive_post_parameters())
    @method_decorator(csrf_protect)
    @method_decorator(never_cache)
    def post(self, request, *_, **__):
        if self.request.user.is_authenticated:
            return HttpResponse(
                json.dumps(dict(next=reverse('frontpage'))),
                content_type="application/json"
            )

        if request.content_type == "application/json":
            data = json.loads(request.body)
        else:
            data = QueryDict(request.body)

        email = data['email']
        password = data['password']
        user = authenticate(request, institutional_email=email, password=password)

        if user is not None:
            login(request, user)
            response_data = dict(next=reverse('frontpage'))
        else:
            response_data = dict(error=True)

        return HttpResponse(
            json.dumps(response_data),
            content_type="application/json",
        )


class LogoutView(View):
    def get(self, request):
        logout(request)
        return redirect('login')

    def post(self, request):
        logout(request)
        return HttpResponse(
            json.dumps(dict(next=reverse('login'))),
            content_type="application/json",
        )


class ImportEntitiesView(TemplateView):
    template_name = "zelda/admin/import.html"

    @staff_member_required
    def get(self, request, model):
        return render(
            request,
            self.template_name,
        )

    @staff_member_required
    def post(self, request, model):
        import_csv(
            request.FILES.get('file'),
            globals()[model.capitalize()],
        )
        return redirect('admin:index')
