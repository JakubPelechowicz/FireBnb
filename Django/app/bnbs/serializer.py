from rest_framework import serializers
from .models import Bnb
class BnbSerializer(serializers.ModelSerializer):
    class Meta:
        model = Bnb
        fields = ['space','cost','address','user_id']

    space = serializers.IntegerField()
    cost = serializers.DecimalField(max_digits=20,decimal_places=2)
    address =serializers.CharField(max_length=255)
    user_id = serializers.IntegerField()
    def create(self, validated_data):
        instance = self.Meta.model(**validated_data)
        instance.save()
        return instance
    def update(self, instance, data):
        instance.space = data.get('space',instance.space)
        instance.cost = data.get('cost',instance.cost)
        instance.address = data.get('address',instance.address)
        instance.save()
        return instance
