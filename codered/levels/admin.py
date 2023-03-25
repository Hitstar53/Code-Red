from django.contrib import admin

# Register your models here.
from .models import Position, Agent

admin.site.register(Position)
admin.site.register(Agent)