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
    image_url2 = 'https://i.imgur.com/OUhup5O.jpg'
    response = requests.post(face_api_url, params=params, headers=headers, json={"url": image_url2})

    result = json.dumps(response.json())
    jsonval = json.loads(result)[0]
    print(jsonval)
    # emotions = jsonval['faceAttributes']['emotion']
    # neutral = jsonval['faceAttributes']['emotion']['neutral']
    happiness = jsonval['faceAttributes']['emotion']['happiness']
    fear = jsonval['faceAttributes']['emotion']['fear']
    smile = jsonval['faceAttributes']['smile']

    if(happiness > 0.5 and smile > 0.9):
        returndata = {
            "emotion": "positive",
            "smile": True
        }
    else:
        returndata = {
            "emotion": "negative",
            "smile": False
        }

    print(returndata)
    return returndata

get_face_detection_results()