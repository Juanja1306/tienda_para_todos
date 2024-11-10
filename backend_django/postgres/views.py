from django.shortcuts import render
from django.http import JsonResponse
from .models import Categoria, Proveedor, Clientes, Producto, OrdenCli, DetalleOrden
from django.contrib.auth.hashers import check_password, make_password
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
from django.views.decorators.http import require_http_methods
from django.core.exceptions import ValidationError
from django.http import HttpResponse
from postgres.comandosadicionales import *

#Creamos una pagina inicio test
def home(request):
    return HttpResponse("Bienvenido a la página de inicio")

#------------------Listamos todo---------------------------------------
def list_categorias(request):
    categorias = Categoria.objects.all()
    data = [{"id": cat.categoria_id, "descripcion": cat.categoria_descripcion} for cat in categorias]
    return JsonResponse(data, safe=False)

def list_proveedores(request):
    proveedores = Proveedor.objects.all()
    data = [{"id": prov.prov_id, "nombre": prov.prov_nombre, "Correo": prov.prov_correo, "contrasenia": prov.prov_contrasenia} for prov in proveedores]
    return JsonResponse(data, safe=False)

def list_clientes(request):
    clientes = Clientes.objects.all()
    data = [{"cedula": cli.cli_cedula, "nombre": cli.cli_nombre, "apellido": cli.cli_apellido} for cli in clientes]
    return JsonResponse(data, safe=False)

def list_productos(request):
    productos = Producto.objects.all()
    data = [{"id": prod.prod_id, "descripcion": prod.prod_descripcion, "precio": prod.prod_precio_unitario} for prod in productos]
    return JsonResponse(data, safe=False)

def list_ordenes(request):
    ordenes = OrdenCli.objects.all()
    data = [{"id": orden.orden_id, "fecha": orden.orden_fecha, "total": orden.orden_total} for orden in ordenes]
    return JsonResponse(data, safe=False)

def list_detalle_ordenes(request):
    detalles = DetalleOrden.objects.all()
    data = [{"id": det.detalle_id, "cantidad": det.detalle_cantidad, "precio": det.detalle_precio} for det in detalles]
    return JsonResponse(data, safe=False)

#-----------------Listamos los productos por categoria------------------
@csrf_exempt
@require_http_methods(["POST"])
def list_productos_by_categoria(request):
    categoria_id = request.POST.get('categoria_id')
    try:
        categoria = Categoria.objects.get(categoria_id=categoria_id)
        productos = Producto.objects.filter(fk_categoria_id=categoria)
        data = [{"id": prod.prod_id, "descripcion": prod.prod_descripcion, "precio": prod.prod_precio_unitario, "cantidad": prod.prod_stock, "imagen": prod.prod_imagen, "proveedor": prod.fk_prov_id} for prod in productos]
        return JsonResponse(data, safe=False)
    except Categoria.DoesNotExist:
        return JsonResponse({"status": "error", "message": "Categoria not found"})

#-----------------Listamos los productos por proovedor------------------
@csrf_exempt
@require_http_methods(["POST"])
def list_productos_by_proveedor(request):
    proveedor_id = request.POST.get('proveedor_id')
    try:
        proveedor = Proveedor.objects.get(prov_id=proveedor_id)
        productos = Producto.objects.filter(fk_prov_id=proveedor)
        data = [{"id": prod.prod_id, "descripcion": prod.prod_descripcion, "precio": prod.prod_precio_unitario, "cantidad": prod.prod_stock, "imagen": prod.prod_imagen, "categoria": prod.fk_categoria_id} for prod in productos]
        return JsonResponse(data, safe=False)
    except Proveedor.DoesNotExist:
        return JsonResponse({"status": "error", "message": "Proveedor not found"})

#-------Funciones para loguear y aniadir clientes/proveedores-------------
#Funcion para loguear clientes
@csrf_exempt
def login_clientes(request):
    if request.method == 'POST':
        email = request.POST.get('email')
        password = request.POST.get('password')
        
        try:
            user = Clientes.objects.get(cli_correo=email)
            
            if check_password(password, user.cli_contrasenia):
                return JsonResponse({"status": "success", "user_type": "Cliente", "cli_cedula": user.cli_cedula})
        except Clientes.DoesNotExist:
            pass
        
        return JsonResponse({"status": "error", "message": "Invalid email or password"})
    return JsonResponse({"status": "error", "message": "Invalid request method"})

#Funcion para loguear proovedores
@csrf_exempt
def login_proveedores(request):
    if request.method == 'POST':
        email = request.POST.get('email')
        password = request.POST.get('password')
        
        try:
            user = Proveedor.objects.get(prov_correo=email)
            
            if check_password(password, user.prov_contrasenia):
                return JsonResponse({"status": "success", "user_type": "Proveedor", "prov_id": user.prov_id})
            else:
                print("Contraseña incorrecta")
        except Proveedor.DoesNotExist:
            print("Proveedor no encontrado")
        
        return JsonResponse({"status": "error", "message": "Invalid email or password"})
    return JsonResponse({"status": "error", "message": "Invalid request method"})

#Funcion para aniadir clientes
@csrf_exempt
@require_http_methods(["POST"])
def add_cliente(request):
    try:
        email = request.POST.get('cli_correo')
        if Clientes.objects.filter(cli_correo=email).exists():
            return JsonResponse({"status": "error", "message": "Email already exists"})
        
        cliente = Clientes(
            cli_cedula=request.POST.get('cli_cedula'),
            cli_nombre=request.POST.get('cli_nombre'),
            cli_apellido=request.POST.get('cli_apellido'),
            cli_correo=email,
            cli_celular=request.POST.get('cli_celular'),
            cli_direccion=request.POST.get('cli_direccion'),
            cli_contrasenia=make_password(request.POST.get('cli_contrasenia'))
        )
        cliente.save()
        return JsonResponse({"status": "success", "message": "Cliente added successfully"})
    except ValidationError as e:
        return JsonResponse({"status": "error", "message": str(e)})

#Funcion para aniadir proveedores
@csrf_exempt
@require_http_methods(["POST"])
def add_proveedor(request):
    try:
        email = request.POST.get('prov_correo')
        if Proveedor.objects.filter(prov_correo=email).exists():
            return JsonResponse({"status": "error", "message": "Email already exists"})

        proveedor = Proveedor(
            prov_nombre=request.POST.get('prov_nombre'),
            prov_numero=request.POST.get('prov_numero'),
            prov_correo=email,
            prov_contrasenia=make_password(request.POST.get('prov_contrasenia')),
            prov_direccion=request.POST.get('prov_direccion')
        )
        proveedor.save()
        return JsonResponse({"status": "success", "message": "Proveedor added successfully"})
    except ValidationError as e:
        return JsonResponse({"status": "error", "message": str(e)})
    except Exception as e:
        return JsonResponse({"status": "error", "message": "Error al agregar proveedor: " + str(e)})

#--------------Categorias--------------------------------------------------
@csrf_exempt
@require_http_methods(["POST"])
def add_categoria(request):
    try:
        categoria = Categoria(
            categoria_descripcion=request.POST.get('categoria_descripcion')
        )
        categoria.save()
        return JsonResponse({"status": "success", "message": "Categoria added successfully"})
    except ValidationError as e:
        return JsonResponse({"status": "error", "message": str(e)})
    except Exception as e:
        return JsonResponse({"status": "error", "message": "Error al agregar categoria: " + str(e)})

#--------------Productos--------------------------------------------------
#Funcion para aniadir productos
@csrf_exempt
@require_http_methods(["POST"])
def add_producto(request):
    try:
        producto = Producto(
            prod_descripcion=request.POST.get('prod_descripcion'),
            prod_precio_unitario=request.POST.get('prod_precio_unitario'),
            prod_stock=request.POST.get('prod_stock'),
            prod_imagen=request.FILES.get('prod_imagen'),
            fk_categoria_id=Categoria.objects.get(categoria_id=get_categoria_id_by_name(request.POST.get('categoria_descripcion'))),
            #fk_prov_id=Proveedor.objects.get(prov_id = get_current_proveedor_id())
            fk_prov_id=Proveedor.objects.get(prov_id = request.POST.get('fk_prov_id'))
        )
        producto.save()
        return JsonResponse({"status": "success", "message": "Producto added successfully"})
    except ValidationError as e:
        return JsonResponse({"status": "error", "message": str(e)})
    except Exception as e:
        return JsonResponse({"status": "error", "message": "Error al agregar producto: " + str(e)})


