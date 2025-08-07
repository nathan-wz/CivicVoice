from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import User, Issue, Location


@admin.register(User)
class CustomUserAdmin(UserAdmin):
    model = User
    fieldsets = UserAdmin.fieldsets + (
        (
            None,
            {
                "fields": ("country", "city", "county", "role"),
            },
        ),
    )


@admin.register(Issue)
class IssueAdmin(admin.ModelAdmin):
    filter_horizontal = ("affected_locations",)


@admin.register(Location)
class LocationAdmin(admin.ModelAdmin):
    search_fields = ["city__name", "county__name", "country__name"]
