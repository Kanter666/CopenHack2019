from django.shortcuts import render

# Create your views here.
from django.shortcuts import render
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.request import Request
from rest_framework.response import Response
import requests
import json

@api_view(["GET"])
def get_image(request: Request):
    return Response("Hello there", status=status.HTTP_200_OK)

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


