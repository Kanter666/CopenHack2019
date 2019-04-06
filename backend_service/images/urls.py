
from django.urls import path
from .views import post_image,post_initial_image


urlpatterns = [
    path('snapshot/', post_image, name=''),
    path('initialSnapshot/', post_initial_image, name='')
]