from rest_framework import viewsets
from .models import Category, Product
from .serializers import CategorySerializer, ProductSerializer
from drf_spectacular.utils import extend_schema, OpenApiExample

@extend_schema(tags=['Categorias'])
class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer


@extend_schema(
    tags=['Produtos'],
    examples=[
        OpenApiExample(
            'Exemplo Válido',
            summary='Novo Produto',
            description='Exemplo realista de cadastro de produto.',
            value={
                "name": "Notebook Gamer",
                "price": 4500.00,
                "in_stock": True,
                "category": 1
            },
            request_only=True
        )
    ]
)
@extend_schema(tags=['Produtos'])
class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all().order_by('id') 
    serializer_class = ProductSerializer