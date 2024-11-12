import datetime
import json
from django.db import transaction
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
@require_http_methods(["GET"])
def list_categorias(request):
    categorias = Categoria.objects.all()
    data = [{"categoria_id": cat.categoria_id, "cat_descripcion": cat.cat_descripcion} for cat in categorias]
    return JsonResponse(data, safe=False)

@require_http_methods(["GET"])
def list_proveedores(request):
    proveedores = Proveedor.objects.all()
    data = [{"prov_id": prov.prov_id, "prov_nombre": prov.prov_nombre, "prov_correo": prov.prov_correo, "prov_contrasenia": prov.prov_contrasenia, "prov_direccion": prov.prov_direccion} for prov in proveedores]
    return JsonResponse(data, safe=False)

@require_http_methods(["GET"])
def list_clientes(request):
    clientes = Clientes.objects.all()
    data = [{"cli_cedula": cli.cli_cedula, "cli_nombre": cli.cli_nombre, "cli_apellido": cli.cli_apellido, "cli_correo": cli.cli_correo} for cli in clientes]
    return JsonResponse(data, safe=False)

@require_http_methods(["GET"])
def list_productos(request):
    productos = Producto.objects.all()
    data = [
        {
            "prod_id": prod.prod_id,
            "prod_descripcion": prod.prod_descripcion,
            "prod_precio_unitario": prod.prod_precio_unitario,
            "fk_categoria_id": prod.fk_categoria_id.cat_descripcion,
            "fk_prov_id": prod.fk_prov_id.prov_nombre,
            "prod_stock": prod.prod_stock,
            "imagen": prod.prod_imagen if prod.prod_imagen else None
        }
        for prod in productos
    ]
    return JsonResponse(data, safe=False)

@require_http_methods(["GET"])
def list_ordenes(request):
    ordenes = OrdenCli.objects.all()
    data = [{"orden_id": orden.orden_id, "orden_fecha": orden.orden_fecha, "orden_total": orden.orden_total, "fk_cli_cedula": orden.fk_cli_cedula.cli_cedula} for orden in ordenes]
    return JsonResponse(data, safe=False)

@require_http_methods(["GET"])
def list_detalle_ordenes(request):
    detalles = DetalleOrden.objects.all()
    data = [
        {
            "detalle_id": det.detalle_id,
            "detalle_cantidad": det.detalle_cantidad,
            "detalle_precio": det.detalle_precio,
            "fk_orden_id": det.fk_orden_id.orden_id,
            "fk_prod_id": det.fk_prod_id.prod_id
        }
        for det in detalles
    ]
    return JsonResponse(data, safe=False)
#-----------------Listamos los productos por categoria------------------
@csrf_exempt
@require_http_methods(["GET"])
def list_productos_by_categoria(request, categoria_id):
    try:
        categoria = Categoria.objects.get(categoria_id=categoria_id)
        productos = Producto.objects.filter(fk_categoria_id=categoria)
        data = [
            {
                "prod_id": prod.prod_id,
                "prod_descripcion": prod.prod_descripcion,
                "prod_precio_unitario": prod.prod_precio_unitario,
                "prod_stock": prod.prod_stock,
                "prod_imagen": prod.prod_imagen if prod.prod_imagen else None,
                "fk_categoria_id": prod.fk_categoria_id.cat_descripcion,
                "fk_prov_id": prod.fk_prov_id.prov_id
            }
            for prod in productos
        ]
        return JsonResponse(data, safe=False)
    except Categoria.DoesNotExist:
        return JsonResponse({"error": "Categoria no encontrada"}, status=404)
    
#-----------------Listamos los productos por proovedor------------------
@csrf_exempt
@require_http_methods(["GET"])
def list_productos_by_proveedor(request, prov_id):
    try:
        proveedor = Proveedor.objects.get(prov_id=prov_id)
        productos = Producto.objects.filter(fk_prov_id=proveedor)
        data = [
            {
                "prod_id": prod.prod_id,
                "prod_descripcion": prod.prod_descripcion,
                "prod_precio_unitario": prod.prod_precio_unitario,
                "prod_stock": prod.prod_stock,
                "imagen": prod.prod_imagen if prod.prod_imagen else None,
                "fk_categoria_id": prod.fk_categoria_id.cat_descripcion,
                "fk_prov_id": prod.fk_prov_id.prov_id
            }
            for prod in productos
        ]
        return JsonResponse(data, safe=False)
    except Proveedor.DoesNotExist:
        return JsonResponse({"error": "Proveedor no encontrado"}, status=404)
    
#-------Funciones para loguear y aniadir clientes/proveedores-------------
#Funcion para loguear clientes
@csrf_exempt
@require_http_methods(["POST"])
def login_clientes(request):
    try:
        data = json.loads(request.body)
        cli_correo = data.get('cli_correo')
        cli_contrasenia = data.get('cli_contrasenia')
            
        try:
            user = Clientes.objects.get(cli_correo=cli_correo)
                
            if check_password(cli_contrasenia, user.cli_contrasenia):
                return JsonResponse({"status": "success", "user_type": "Cliente", "cli_cedula": user.cli_cedula})
        except Clientes.DoesNotExist:
            pass
            
        return JsonResponse({"status": "error", "message": "Invalid email or password"})
    except Exception as e:
        return JsonResponse({"status": "error", "message": "Error al loguear cliente: " + str(e)})

#Funcion para loguear proovedores
@csrf_exempt
@require_http_methods(["POST"])
def login_proveedores(request):
    try:
        data = json.loads(request.body)
        prov_correo = data.get('prov_correo')
        prov_contrasenia = data.get('prov_contrasenia')
        
        try:
            user = Proveedor.objects.get(prov_correo=prov_correo)
            
            if check_password(prov_contrasenia, user.prov_contrasenia):
                return JsonResponse({"status": "success", "user_type": "Proveedor", "prov_id": user.prov_id})
            else:
                print("Contraseña incorrecta")
        except Proveedor.DoesNotExist:
            print("Proveedor no encontrado")
        
        return JsonResponse({"status": "error", "message": "Invalid email or password"})
    except Exception as e:
        return JsonResponse({"status": "error", "message": "Error al loguear cliente: " + str(e)})

#Funcion para aniadir clientes
@csrf_exempt
@require_http_methods(["POST"])
def add_cliente(request):
    try:
        data = json.loads(request.body)
        cli_correo = data.get('cli_correo')
        if Clientes.objects.filter(cli_correo=cli_correo).exists():
            return JsonResponse({"status": "error", "message": "Email already exists"})
        
        cliente = Clientes(
            cli_cedula=data.get('cli_cedula'),
            cli_nombre=data.get('cli_nombre'),
            cli_apellido=data.get('cli_apellido'),
            cli_correo=cli_correo,
            cli_celular=data.get('cli_celular'),
            cli_direccion=data.get('cli_direccion'),
            cli_contrasenia=make_password(data.get('cli_contrasenia'))
        )
        cliente.save()
        return JsonResponse({"status": "success", "message": "Cliente added successfully"})
    except ValidationError as e:
        return JsonResponse({"status": "error", "message": str(e)})
    except json.JSONDecodeError:
        return JsonResponse({"status": "error", "message": "Invalid JSON data"})

#Funcion para aniadir proveedores
@csrf_exempt
@require_http_methods(["POST"])
def add_proveedor(request):
    try:
        data = json.loads(request.body)
        prov_correo = data.get('prov_correo')
        if Proveedor.objects.filter(prov_correo=prov_correo).exists():
            return JsonResponse({"status": "error", "message": "Email already exists"})

        proveedor = Proveedor(
            prov_nombre=data.get('prov_nombre'),
            prov_numero=data.get('prov_numero'),
            prov_correo=prov_correo,
            prov_contrasenia=make_password(data.get('prov_contrasenia')),
            prov_direccion=data.get('prov_direccion')
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
        data = json.loads(request.body)  # Parse JSON data
        categoria = Categoria(
            categoria_descripcion=data.get('cat_descripcion')
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
    print("Accediendo a add_producto")
    try:
        data = json.loads(request.body)
        print("Datos recibidos: ", data)
        
        try:
            categoria = Categoria.objects.get(categoria_descripcion=data.get('fk_categoria_id'))
        except Categoria.DoesNotExist:
            print("Categoria no encontrada")
            return JsonResponse({"status": "error", "message": "Categoria not found"})
        
        producto = Producto(
            prod_descripcion=data.get('prod_descripcion'),
            prod_precio_unitario=data.get('prod_precio_unitario'),
            prod_stock=data.get('prod_stock'),
            prod_imagen=data.get('prod_imagen'),
            fk_categoria_id=categoria,
            fk_prov_id=Proveedor.objects.get(prov_id=data.get('fk_prov_id'))
        )
        producto.save()
        print("Producto guardado exitosamente")
        return JsonResponse({"status": "success", "message": "Producto added successfully"})
    except ValidationError as e:
        print("Error de validación: ", e)
        return JsonResponse({"status": "error", "message": str(e)})
    except Exception as e:
        print("Error al agregar producto: ", e)
        return JsonResponse({"status": "error", "message": "Error al agregar producto: " + str(e)})

#-----------------Crear ordenes y detalle ordenes-------------------------------------------
@csrf_exempt
@require_http_methods(["POST"])
def create_order(request):
    try:
        data = json.loads(request.body)
        cli_cedula = data.get('cli_cedula')
        productos = data.get('productos')  # Lista de diccionarios con 'prod_id' y 'cantidad'

        if not cli_cedula or not productos:
            return JsonResponse({"status": "error", "message": "Datos incompletos"}, status=400)

        cliente = Clientes.objects.get(cli_cedula=cli_cedula)

        total = 0
        detalles = []

        # Verificar stock y calcular total
        for item in productos:
            prod_id = item.get('prod_id')
            prod_stock = item.get('prod_stock')

            producto = Producto.objects.get(prod_id=prod_id)

            if producto.prod_stock < prod_stock:
                return JsonResponse({"status": "error", "message": f"Stock insuficiente para el producto {producto.prod_descripcion}"}, status=400)

            total += producto.prod_precio_unitario * prod_stock
            detalles.append((producto, prod_stock))

        # Crear orden y detalles dentro de una transacción
        with transaction.atomic():
            orden = OrdenCli(
                orden_fecha=datetime.date.today(),
                orden_total=total,
                fk_cli_cedula=cliente
            )
            orden.save()

            for producto, prod_stock in detalles:
                detalle = DetalleOrden(
                    detalle_id=DetalleOrden.objects.filter(fk_orden_id=orden).count() + 1,
                    detalle_cantidad=prod_stock,
                    detalle_precio=producto.prod_precio_unitario,
                    fk_orden_id=orden,
                    fk_prod_id=producto
                )
                detalle.save()

                # Reducir stock del producto
                producto.prod_stock -= prod_stock
                producto.save()

        return JsonResponse({"status": "success", "message": "Orden creada exitosamente"}, status=201)

    except Clientes.DoesNotExist:
        return JsonResponse({"status": "error", "message": "Cliente no encontrado"}, status=404)
    except Producto.DoesNotExist:
        return JsonResponse({"status": "error", "message": "Producto no encontrado"}, status=404)
    except Exception as e:
        return JsonResponse({"status": "error", "message": str(e)}, status=500)
    
#-----------------Productos vendidos por proveedor-------------------------------------------
@require_http_methods(["GET"])
def productos_vendidos_por_proveedor(request, prov_id):
    try:
        prov = Proveedor.objects.get(prov_id=prov_id)
        fk_prov_id = Producto.objects.filter(fk_prov_id=prov)
        productos_vendidos = []

        for producto in fk_prov_id:
            detalles = DetalleOrden.objects.filter(fk_prod_id=producto)
            cantidad_vendida = sum(detalle.detalle_cantidad for detalle in detalles)

            if cantidad_vendida > 0:
                productos_vendidos.append({
                    "prod_id": producto.prod_id,
                    "prod_descripcion": producto.prod_descripcion,
                    "prod_precio_unitario": producto.prod_precio_unitario,
                    "detalle_cantidad": cantidad_vendida
                })

        data = {
            "prov_id": prov.prov_id,
            "productos_vendidos": productos_vendidos
        }

        return JsonResponse(data, safe=False)
    except Proveedor.DoesNotExist:
        return JsonResponse({"status": "error", "message": "Proveedor no encontrado"}, status=404)
    except Exception as e:
        return JsonResponse({"status": "error", "message": str(e)}, status=500)
    
#-----------------Productos vendidos por categoria-------------------------------------------
@require_http_methods(["GET"])
def productos_vendidos_por_categoria(request, categoria_id):
    try:
        categoria = Categoria.objects.get(categoria_id=categoria_id)
        productos = Producto.objects.filter(fk_categoria_id=categoria)
        productos_vendidos = []

        for producto in productos:
            detalles = DetalleOrden.objects.filter(fk_prod_id=producto)
            cantidad_vendida = sum(detalle.detalle_cantidad for detalle in detalles)

            if cantidad_vendida > 0:
                productos_vendidos.append({
                    "prod_id": producto.prod_id,
                    "prod_descripcion": producto.prod_descripcion,
                    "prod_precio_unitario": producto.prod_precio_unitario,
                    "detalle_cantidad": cantidad_vendida
                })

        data = {
            "cat_descripcion": categoria.cat_descripcion,
            "productos_vendidos": productos_vendidos
        }

        return JsonResponse(data, safe=False)
    except Categoria.DoesNotExist:
        return JsonResponse({"status": "error", "message": "Categoria no encontrada"}, status=404)
    except Exception as e:
        return JsonResponse({"status": "error", "message": str(e)}, status=500)