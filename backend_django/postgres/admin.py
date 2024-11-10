from django.contrib import admin
from .models import Categoria, Proveedor, Clientes, Producto, OrdenCli, DetalleOrden

admin.site.register(Categoria)
admin.site.register(Proveedor)
admin.site.register(Clientes)
admin.site.register(Producto)
admin.site.register(OrdenCli)
admin.site.register(DetalleOrden)
