
from django.urls import path
from .views import post_image,post_initial_image, post_image2


urlpatterns = [
    path('snapshot/', post_image, name=''),
    path('snapshot1/', post_image2, name=''),
    path('initialSnapshot/', post_initial_image, name='')
]