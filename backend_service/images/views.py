from django.shortcuts import render

# Create your views here.
from django.shortcuts import render
from rest_framework import status
from rest_framework.decorators import api_view, schema
from rest_framework.request import Request
from rest_framework.response import Response
from django.http import JsonResponse
import requests
import json
import random
from images.schema import custom_schema


@api_view(["GET", "POST"])
@schema(custom_schema)
def post_image(request: Request):
    i = random.randint(-1, 1)
    data = {
        'slouch': i > 0,
        'smile': i < 0,
        'emotion': "something",
        'focus': i == 0
    }
    return Response(data, status=status.HTTP_200_OK)


@api_view(["GET", "POST"])
@schema(custom_schema)
def post_initial_image(request: Request):
    data = {

    }
    return Response(data, status=status.HTTP_200_OK)


def get_face_detection_results(request):
    subscription_key = 'b4e06165df1a451f8ae7ee05a4d6a314'
    face_api_url = 'https://westcentralus.api.cognitive.microsoft.com/face/v1.0/detect'
    headers = {'Ocp-Apim-Subscription-Key': subscription_key}
    params = {
        'returnFaceId': 'false',
        'returnFaceLandmarks': 'false',
        'returnFaceAttributes': 'headPose,smile,emotion'
    }
    image_url = 'https://damakkebab.ee/wp-content/uploads/2017/11/smiling-woman-pointing-at-something.jpg'
    response = requests.post(face_api_url, params=params, headers=headers, json={"url": image_url})
    print(json.dumps(response.json()))


