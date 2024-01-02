from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.exceptions import AuthenticationFailed
from .serializer import UserSerializer
from .models import User
import jwt, datetime

class CreateView(APIView):
    def post(self, request):
        serializer = UserSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)


class LoginView(APIView):
    def post(self, request):
        email = request.data['email']
        password = request.data['password']
        user = User.objects.filter(email=email).first()
        if user is None:
            raise AuthenticationFailed('User not found')
        if not user.check_password(password):
            raise AuthenticationFailed('Incorrect password')

        payload={
            'email': user.email,
            'exp':datetime.datetime.utcnow()+datetime.timedelta(minutes=60),
            'iat':datetime.datetime.utcnow()
        }

        token = jwt.encode(payload,'secret',algorithm="HS256")#.decode('utf-8')
        return Response({'token':token})

class MeView(APIView):

    def get(self, request):
        if not request.isAuthenticated:
            raise AuthenticationFailed('Unauthenticated!')
        serializer = UserSerializer(request.myuser)
        return Response(serializer.data)
class UpdateView(APIView):
    def put(self,request):
        if not request.isAuthenticated:
            raise AuthenticationFailed('Unauthenticated!')
        serializer = UserSerializer(request.myuser,data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors)

class DeleteView(APIView):
    def delete(self,request):
        if not request.isAuthenticated:
            raise AuthenticationFailed('Unauthenticated!')
        request.myuser.delete()
        return Response({
            'delete': True
        })
