from django.db import models

class Product(models.Model):
    name = models.CharField(max_length=200, help_text="Nome do produto")
    price = models.DecimalField(max_digits=10, decimal_places=2, help_text="Preço do produto")
    in_stock = models.BooleanField(default=True, help_text="O produto está disponível em estoque?")

    def __str__(self):
        return self.name
