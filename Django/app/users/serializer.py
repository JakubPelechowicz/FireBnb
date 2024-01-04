from rest_framework import serializers
from .models import User
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['full_name','email','password']
        extra_kwargs = {
            'password':{'write_only':True},
            'id':{'read_only':True}
        }

    full_name = serializers.CharField()
    email = serializers.CharField()
    password = serializers.CharField()
    def create(self, validated_data):
        password = validated_data.pop('password',None)
        instance = self.Meta.model(**validated_data)
        if password is not None:
            instance.set_password(password)
        instance.save()
        return instance
    def update(self, instance, data):
        instance.full_name = data.get('full_name',instance.full_name)
        if(data.get('password')!=None):
            instance.set_password(data['password'])
        instance.email = data.get('email',instance.email)
        instance.save()
        return instance