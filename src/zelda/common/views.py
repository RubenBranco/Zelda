from django.shortcuts import render
from django.views.generic import TemplateView


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


class FrontpageView(AbstractAppView):
    pass
