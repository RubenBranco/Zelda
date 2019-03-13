import json

from django.shortcuts import render, reverse
from django.http.response import HttpResponse
from django.views.generic import TemplateView
from django.contrib.auth import authenticate, login
from django.contrib.auth.mixins import LoginRequiredMixin


class AbstractAppView(TemplateView):
    def __init_subclass__(cls, **kwargs):
        super().__init_subclass__(**kwargs)
        cls_name = cls.__name__
        if not cls.__name__.startswith("Abstract"):
            cls.template_name = f"zelda/{cls_name.strip('View').lower()}.html"

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context.update(
            dict(
                view_name=self.__class__.__name__.strip('View').lower(),
            )
        )
        return context


class FrontpageView(AbstractAppView, LoginRequiredMixin):
    pass


class LoginView(AbstractAppView):
    def post(self, request, *_, **__):
        email = request.POST['email']
        password = request.POST['password']
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
