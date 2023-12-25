from django.db import models

# Create your models here.

class Bnb(models.Model):
    space = models.IntegerField()
    cost = models.DecimalField(decimal_places=2)
    address = models.CharField(max_length=255)
    user_id = models.IntegerField()

Bnb.objects = Bnb.objects.using('mongo')