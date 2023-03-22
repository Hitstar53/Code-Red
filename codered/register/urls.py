from django.urls import path
from . import views
urlpatterns = [
    path('', views.login_user, name='login'),
    path('adduser/', views.add_user, name='adduser'),
]