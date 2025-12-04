from django.db import models

class Category(models.Model):
    name = models.CharField(max_length=100)

    class Meta:
        verbose_name_plural = "Categories" 

    def __str__(self):
        return self.name

class Product(models.Model):
    name = models.CharField(max_length=100)
    price = models.DecimalField(max_digits=10, decimal_places=2) 
    in_stock = models.BooleanField(default=True)
    
    category = models.ForeignKey(
        Category, 
        related_name='products', 
        on_delete=models.PROTECT, # Evita deletar categoria se tiver produtos
        null=True
    )

    def __str__(self):
        return self.name