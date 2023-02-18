from django.urls import path
from . import views
urlpatterns = [
    path('', views.home, name='home'),
    path('level1/', views.level1, name='level1'),
    path('level2/', views.level2, name='level2'),
    path('level3/', views.level3, name='level3'),
    path('level4/', views.level4, name='level4'),
    path('level5/', views.level5, name='level5'),
    path('level6/', views.level6, name='level6'),
    path('level7/', views.level7, name='level7'),
    path('prelevel1/', views.prelevel1, name='prelevel1'),
    path('prelevel2/', views.prelevel2, name='prelevel2'),
    path('prelevel3/', views.prelevel3, name='prelevel3'),
    path('prelevel4/', views.prelevel4, name='prelevel4'),
    path('prelevel5/', views.prelevel5, name='prelevel5'),
    path('prelevel6/', views.prelevel6, name='prelevel6'),
    path('prelevel6/', views.prelevel6, name='prelevel6'),
    path('prelevel7/', views.prelevel7, name='prelevel7'),
]