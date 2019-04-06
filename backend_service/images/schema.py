import coreapi
from rest_framework.schemas import AutoSchema

custom_schema = AutoSchema(manual_fields=[
    coreapi.Field("data", required=True, type="string", description="base64 image")
])