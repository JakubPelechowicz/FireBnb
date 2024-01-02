from django.utils.decorators import decorator_from_middleware
import jwt
from .models import User
class JWTAuthMiddleware:
    def __init__(self,get_response):
        self.get_response=get_response
    def __call__(self, request):
        request.isAuthenticated = True
        token = request.META.get('HTTP_AUTHORIZATION')
        token = str.replace(str(token), 'Bearer ', '')
        if not token:
            request.isAuthenticated = False

        try:
            payload = jwt.decode(token, 'secret', algorithms=['HS256'])
        except Exception as exception:
            request.isAuthenticated = False
        if request.isAuthenticated:
            request.myuser = User.objects.using('default').filter(email=payload['email']).first()
        response = self.get_response(request)

        return response

JWTAuth = decorator_from_middleware(JWTAuthMiddleware)
