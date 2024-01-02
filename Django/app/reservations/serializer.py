from rest_framework import serializers
from .models import Reservation


class ReservationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Reservation
        fields = ['bnb_id','user_id','start_date','end_date']
    bnb_id = serializers.CharField()
    user_id = serializers.IntegerField()
    start_date = serializers.DateTimeField()
    end_date = serializers.DateTimeField()
    def create(self, validated_data):
        instance = self.Meta.model(**validated_data)
        instance.save()
        return instance
    def update(self, instance, data):
        instance.bnb_id = data.get('bnb_id',instance.bnb_id)
        instance.user_id = data.get('user_id',instance.user_id)
        instance.start_date = data.get('start_date',instance.start_date)
        instance.end_date = data.get('end_date',instance.end_date)
        instance.save()
        return instance