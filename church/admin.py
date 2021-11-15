from django.contrib import admin
from .models import NkUser

class NkUserAdmin(admin.ModelAdmin):
    model = NkUser

admin.site.register(NkUser, NkUserAdmin)

