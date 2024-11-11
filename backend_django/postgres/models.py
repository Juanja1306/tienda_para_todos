from django.db import models
from django.contrib.auth.hashers import make_password

# Modelo Categorias
class Categoria(models.Model):
    categoria_id = models.AutoField(primary_key=True)
    
    categoria_descripcion = models.CharField(max_length=100)

    class Meta:
        db_table = 'categorias'

    def __str__(self):
        return self.categoria_descripcion

# Modelo Proveedores
class Proveedor(models.Model):
    prov_id = models.AutoField(primary_key=True)
    
    prov_nombre = models.CharField(max_length=100)
    prov_numero = models.CharField(max_length=15)
    prov_correo = models.EmailField(max_length=100, unique=True)
    prov_contrasenia = models.CharField(max_length=100)
    prov_direccion = models.TextField()

    class Meta:
        db_table = 'proveedores'

    def __str__(self):
        return self.prov_nombre

    def save(self, *args, **kwargs):
        # Solo encripta la contraseña si no está en formato hash
        if not self.prov_contrasenia.startswith("pbkdf2_sha256$"):
            self.prov_contrasenia = make_password(self.prov_contrasenia)
        super().save(*args, **kwargs)
    
# Modelo Clientes
class Clientes(models.Model):
    cli_cedula = models.CharField(max_length=10, primary_key=True)
    
    cli_nombre = models.CharField(max_length=50)
    cli_apellido = models.CharField(max_length=50)
    cli_correo = models.EmailField(max_length=100, unique=True)
    cli_celular = models.CharField(max_length=15)
    cli_direccion = models.TextField()
    cli_contrasenia = models.CharField(max_length=100)

    class Meta:
        db_table = 'clientes'

    def __str__(self):
        return f"{self.cli_nombre} {self.cli_apellido}"

    def save(self, *args, **kwargs):
        # Solo encripta la contraseña si no está en formato hash
        if not self.cli_contrasenia.startswith("pbkdf2_sha256$"):
            self.cli_contrasenia = make_password(self.cli_contrasenia)
        super().save(*args, **kwargs)

# Modelo Productos
class Producto(models.Model):
    prod_id = models.AutoField(primary_key=True)
    
    prod_descripcion = models.CharField(max_length=200)
    prod_precio_unitario = models.DecimalField(max_digits=10, decimal_places=2)
    prod_stock = models.IntegerField()
    prod_imagen = models.ImageField(upload_to='productos/', null=True, blank=True)
    
    fk_categoria_id = models.ForeignKey(Categoria, on_delete=models.CASCADE, db_column='fk_categoria_id')
    fk_prov_id = models.ForeignKey(Proveedor, on_delete=models.CASCADE, db_column='fk_prov_id')

    class Meta:
        db_table = 'productos'

    def __str__(self):
        return self.prod_descripcion

# Modelo OrdenCli
class OrdenCli(models.Model):
    orden_id = models.AutoField(primary_key=True)
    
    orden_fecha = models.DateField()
    orden_total = models.DecimalField(max_digits=10, decimal_places=2)
    
    fk_cli_cedula = models.ForeignKey(Clientes, on_delete=models.CASCADE, db_column='fk_cli_cedula')

    class Meta:
        db_table = 'ordenes'

    def __str__(self):
        return f"Orden {self.orden_id} de {self.fk_cli_cedula}"

# Modelo DetalleOrdenCli
class DetalleOrden(models.Model):
    detalle_id = models.IntegerField()
    
    detalle_cantidad = models.IntegerField()
    detalle_precio = models.DecimalField(max_digits=10, decimal_places=2)
    
    fk_orden_id = models.ForeignKey(OrdenCli, on_delete=models.CASCADE, db_column='fk_orden_id')
    fk_prod_id = models.ForeignKey(Producto, on_delete=models.CASCADE, db_column='fk_prod_id')
    
    class Meta:
        db_table = 'detalle_ordenes'
        unique_together = (('detalle_id', 'fk_orden_id'),)  # Define la clave primaria compuesta
        constraints = [
            models.UniqueConstraint(fields=['detalle_id', 'fk_orden_id'], name='unique_detalle_orden')
        ]

    def __str__(self):
        return f"Detalle {self.detalle_id} de Orden {self.fk_orden_id}"
    
    
    