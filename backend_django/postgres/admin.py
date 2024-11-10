from django.contrib import admin
from .models import Categoria, Proveedor, Clientes, Producto, OrdenCli, DetalleOrden

@admin.register(Categoria)
class CategoriaAdmin(admin.ModelAdmin):
    list_display = ('categoria_id', 'categoria_descripcion')

@admin.register(Proveedor)
class ProveedorAdmin(admin.ModelAdmin):
    list_display = ('prov_id', 'prov_nombre', 'prov_numero', 'prov_correo', 'prov_direccion')

@admin.register(Clientes)
class ClientesAdmin(admin.ModelAdmin):
    list_display = ('cli_cedula', 'cli_nombre', 'cli_apellido', 'cli_correo', 'cli_celular', 'cli_direccion')

@admin.register(Producto)
class ProductoAdmin(admin.ModelAdmin):
    list_display = ('prod_id', 'prod_descripcion', 'prod_precio_unitario', 'prod_stock', 'prod_imagen', 'fk_categoria_id', 'fk_prov_id')

@admin.register(OrdenCli)
class OrdenCliAdmin(admin.ModelAdmin):
    list_display = ('orden_id', 'orden_fecha', 'orden_total', 'fk_cli_cedula')

@admin.register(DetalleOrden)
class DetalleOrdenAdmin(admin.ModelAdmin):
    list_display = ('detalle_id', 'detalle_cantidad', 'detalle_precio', 'fk_orden_id', 'fk_prod_id')
