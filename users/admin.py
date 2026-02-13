from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import User


class CustomUserAdmin(UserAdmin):
    model = User

    list_display = ('email', 'username', 'role', 'is_staff')

    fieldsets = (
        (None, {'fields': ('email', 'username', 'password')}),
        ('Role Information', {'fields': ('role',)}),   
        ('Permissions', {
            'fields': ('is_active', 'is_staff', 'is_superuser', 'groups', 'user_permissions'),
        }),
        ('Important dates', {'fields': ('last_login', 'date_joined')}),
    )

    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('email', 'username', 'role', 'password1', 'password2'),
        }),
    )

    ordering = ('email',)


admin.site.register(User, CustomUserAdmin)
