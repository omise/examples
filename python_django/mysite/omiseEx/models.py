from django.db import models

class Payment(models.Model):
  charge_id = models.CharField(max_length=100)
  payment_id = models.CharField(max_length=50)
  payment_type = models.CharField(max_length=20)