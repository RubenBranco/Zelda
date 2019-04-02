from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from django.utils.translation import gettext_lazy as _

from .models import ADMIN_MODELS, AppUser


for model in ADMIN_MODELS:
    admin.site.register(model)


class AppUserAdmin(UserAdmin):
    fieldsets = (
        (None, {'fields': (
            'username',
            'password',
            'institutional_email',
            )}),
        (_('Personal info'), {'fields': (
            'first_name',
            'last_name',
            'email',
            'nif',
            'n_cc',
            'dob',
            'contact',
            'emergency_contact',
            'professional_occupation',
            'display_image',
            'country',
            'marital_status',
            'gender',
            'user_type',
            )}),
        (_('Permissions'), {
            'fields': ('is_active', 'is_staff', 'is_superuser', 'groups', 'user_permissions'),
        }),
        (_('Important dates'), {'fields': ('last_login', 'date_joined')}),
    )
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': (
                'username',
                'institutional_email',
                'password1',
                'password2',
            ),
        }),
    )


admin.site.register(AppUser, AppUserAdmin)
