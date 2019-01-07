"""
URL routing schema for Lecture Capture Preferences.

"""

from django.urls import path

from . import views

app_name = "preferences"

urlpatterns = [
    path('example', views.example, name='example'),
]
