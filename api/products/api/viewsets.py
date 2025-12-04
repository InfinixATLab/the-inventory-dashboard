from rest_framework import viewsets
from products.api import serializers
from products import models

class ProdutoViewset(viewsets.ModelViewSet):
    serializer_class = serializers.ProductSerializer
    queryset = models.Product.objects.all()