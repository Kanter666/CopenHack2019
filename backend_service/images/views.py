from django.shortcuts import render

# Create your views here.
from django.shortcuts import render
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.request import Request
from rest_framework.response import Response


@api_view(["GET"])
def get_image(request: Request):
    return Response("Hello there", status=status.HTTP_200_OK)

