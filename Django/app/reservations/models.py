from django.db import models

# Create your models here.
class Reservation(models.Model):
    bnb_id = models.CharField()
    user_id = models.IntegerField()
    start_date = models.DateTimeField()
    end_date = models.DateTimeField()
    class Meta:
        db_table = "reservations"

