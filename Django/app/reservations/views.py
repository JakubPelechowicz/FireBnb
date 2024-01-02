from django.shortcuts import render
from django.db.models import Q
from django.shortcuts import get_object_or_404

# Create your views here.
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.exceptions import AuthenticationFailed
from .serializer import ReservationSerializer
from .models import Reservation
from datetime import datetime
from users.models import User


def is_conflicting(start, end, bnb_id, id=None):
    query = Reservation.objects.all()

    query = query.filter(
        Q(start_date__gte=start, start_date__lt=end) |
        Q(end_date__gt=start, end_date__lte=end) |
        Q(start_date__lte=start, end_date__gte=end)
    )

    if id is not None:
        query = query.exclude(id=id)

    query = query.filter(bnb_id=bnb_id)

    conflicts = query.count()

    return conflicts > 0


class CreateView(APIView):
    def post(self, request):
        start_date = request.data.get('start_date')
        end_date = request.data.get('end_date')
        bnb_id = request.data.get('bnb_id')
        data = request.data
        data['user_id'] = request.myuser.id
        serializer = ReservationSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        if start_date > end_date:
            return Response({'error': 'start_date is later than end_date'}, status=400)

        conflicts = is_conflicting(start_date, end_date, bnb_id)
        if conflicts:
            return Response({'error': 'Date is already reserved'}, status=400)

        n = serializer.save()
        data=serializer.data
        data['id']=n.pk
        return Response(data, status=201)


class UpdateView(APIView):
    def put(self, request):

        reservation_id = request.data.get('id')
        start_date = request.data.get('start_date')
        end_date = request.data.get('end_date')
        serializer = ReservationSerializer(request.myuser,data=request.data)
        reservation=Reservation.objects.filter(id=reservation_id).first()
        if reservation is None:
            return Response({'error': 'Reservation not found'}, status=404)

        if reservation.user_id != request.myuser.id:
            print(reservation.user_id)
            print(request.myuser.id)
            return Response({'error': 'Not authorized'}, status=403)

        if start_date > end_date:
            return Response({'error': 'start_date is later than end_date'}, status=400)

        conflicts = is_conflicting(reservation.start_date, reservation.end_date, reservation.bnb_id, reservation_id)
        if conflicts:
            return Response({'error': 'Date is already reserved'}, status=400)
        request.data['bnb_id']=reservation.bnb_id
        request.data['user_id']=reservation.user_id
        serializer = ReservationSerializer(reservation,data=request.data)
        if serializer.is_valid():
            n = serializer.save()
            data = serializer.data
            data['id'] = n.pk
            return Response(data, status=201)
        return Response(serializer.errors)
class DeleteView(APIView):
    def delete(self,request,id):
        if request.myuser is None:
            return Response({'error': 'Not Authorized'}, status=403)

        reservation = get_object_or_404(Reservation, id=id)
        if reservation.user_id != request.myuser.id:
            return Response({'error': 'Not Authorized'}, status=403)

        reservation.delete()
        return Response({'message': 'Reservation deleted successfully'}, status=200)
class ListView(APIView):
    def get(self,request):
        bnb_id = request.GET.get('bnb_id')
        start_date = request.GET.get('start_date')
        end_date = request.GET.get('end_date')
        query = Reservation.objects.filter(bnb_id=bnb_id)

        if start_date and end_date:
            query = query.filter(end_date__gte=start_date, start_date__lte=end_date)
        elif end_date:
            query = query.filter(start_date__lte=end_date)
        elif start_date:
            query = query.filter(start_date__lte=start_date)
        reservations = ReservationSerializer(query,many=True)
        return Response({'data': reservations.data}, status=200)

class IndexView(APIView):
    def get(self,request,id):
        reservation = Reservation.objects.filter(id=id).first()
        if reservation is None:
            return Response({'error': 'Not Found'}, status=404)
        serializer = ReservationSerializer(reservation)
        return Response(serializer.data, status=200)