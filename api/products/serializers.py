from rest_framework import serializers
from .models import Product, Category

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'name']

class ProductSerializer(serializers.ModelSerializer):
    category_name = serializers.CharField(source='category.name', read_only=True)
    category = serializers.PrimaryKeyRelatedField(queryset=Category.objects.all(), write_only=True, required=False, allow_null=True)

    class Meta:
        model = Product
        fields = [
            'id',
            'name',
            'price',
            'in_stock',
            'category', 
            'category_name', 
        ]
        read_only_fields = ['id', 'category_name']
