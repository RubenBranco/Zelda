import json

from django.shortcuts import render, reverse, redirect
from django.http.response import HttpResponse
from django.views.generic import TemplateView, View
from django.contrib.auth import authenticate, login, logout
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

    def get(self, request, model):
        return render(
            request,
            self.template_name,
        )

    def post(self, request, model):
        pass
