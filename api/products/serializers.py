from rest_framework import serializers
from .models import Product, Category

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'name']

class ProductSerializer(serializers.ModelSerializer):
    category_name = serializers.CharField(source='category.name', read_only=True)
    category = serializers.PrimaryKeyRelatedField(queryset=Category.objects.all(), allow_null=True, required=False)

    class Meta:
        model = Product
        fields = ['id', 'name', 'price', 'in_stock', 'category', 'category_name']

    def validate_price(self, value):
        if value < 0:
            raise serializers.ValidationError("Preço não pode ser negativo.")
        return value
