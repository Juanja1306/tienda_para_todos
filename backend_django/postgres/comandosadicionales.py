from django.http import JsonResponse
from .models import Categoria, Proveedor, Clientes, Producto, OrdenCli, DetalleOrden



def get_categoria_id_by_name(name):
    try:
        categoria = Categoria.objects.get(categoria_descripcion=name)
        return categoria.categoria_id
    except Categoria.DoesNotExist:
        return JsonResponse({"status": "error", "message": "Categoria not found"})

def get_current_proveedor_id(request):
    if request.user.is_authenticated:
        try:
            proveedor = Proveedor.objects.get(prov_correo=request.user.email)
            return proveedor.prov_id
        except Proveedor.DoesNotExist:
            return JsonResponse({"status": "error", "message": "Proveedor not found"})
    else:
        return JsonResponse({"status": "error", "message": "User not authenticated"})

def get_current_cliente_id(request):
    if request.user.is_authenticated:
        try:
            cliente = Clientes.objects.get(cli_correo=request.user.email)
            return cliente.cli_cedula
        except Clientes.DoesNotExist:
            return JsonResponse({"status": "error", "message": "Cliente not found"})
    else:
        return JsonResponse({"status": "error", "message": "User not authenticated"})

