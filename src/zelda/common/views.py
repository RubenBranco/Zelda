from django.shortcuts import render
from django.views.generic import TemplateView


class AbstractAppView(TemplateView):
    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context.update(
            dict(
                view_name=self.__class__.__name__.strip('View').lower(),
            )
        )
        return context
