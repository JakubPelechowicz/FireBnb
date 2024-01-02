from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.exceptions import AuthenticationFailed
from .serializer import BnbSerializer
from .models import Bnb


# Create your views here.
class CreateView(APIView):
    def post(self, request):
        data=request.data
        data['user_id'] = request.myuser.id
        serializer = BnbSerializer(data=data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)


class IndexView(APIView):
    def get(self, request,bnb_id):
        serializer = BnbSerializer(Bnb.objects.filter(id=bnb_id).first())
        return Response(serializer.data)


