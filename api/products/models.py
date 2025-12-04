from django.db import models

class Category(models.Model):
    name = models.CharField(max_length=100, unique=True, help_text="Nome da categoria")

    def __str__(self):
        return self.name

class Product(models.Model):
    name = models.CharField(max_length=200, help_text="Nome do produto")
    price = models.DecimalField(max_digits=10, decimal_places=2, help_text="Preço do produto")
    in_stock = models.BooleanField(default=True, help_text="O produto está disponível em estoque?")
    category = models.ForeignKey(Category, related_name='products', on_delete=models.SET_NULL, null=True, blank=True, help_text="Categoria do produto")

    def __str__(self):
        return self.name
