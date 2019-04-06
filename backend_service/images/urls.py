
from django.urls import path
from .views import get_image


urlpatterns = [
    path('test/', get_image, name='')
]