from django.test import TestCase

import requests
import json


def get_face_detection_results():
    subscription_key = 'b4e06165df1a451f8ae7ee05a4d6a314'
    face_api_url = 'https://westcentralus.api.cognitive.microsoft.com/face/v1.0/detect'
    headers = {'Ocp-Apim-Subscription-Key': subscription_key}
    params = {
        'returnFaceId': 'false',
        'returnFaceLandmarks': 'true',
        'returnFaceAttributes': 'headPose,smile,emotion'
    }
    image_url = 'https://damakkebab.ee/wp-content/uploads/2017/11/smiling-woman-pointing-at-something.jpg'
    response = requests.post(face_api_url, params=params, headers=headers, json={"url": image_url})
    print(json.dumps(response.json()))

get_face_detection_results()
