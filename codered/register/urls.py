from django.urls import path
from . import views
urlpatterns = [
    path('', views.login_user, name='login'),
    path('adduser/', views.add_user, name='adduser'),
    path('teamsdb/', views.teamsdb, name='teamsdb'),
    path('add/', views.add, name='add'),
]