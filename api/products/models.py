from django.db import models
from uuid import uuid4

class Product(models.Model):
    id = models.UUIDField(primary_key=True,default=uuid4,editable=False)
    name = models.CharField(max_length=100)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    in_stock = models.BooleanField(default=False)
    category = models.CharField(max_length=50)


