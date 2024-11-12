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
    data = [{"id": cat.categoria_id, "descripcion": cat.categoria_descripcion} for cat in categorias]
    return JsonResponse(data, safe=False)

@require_http_methods(["GET"])
def list_proveedores(request):
    proveedores = Proveedor.objects.all()
    data = [{"id": prov.prov_id, "nombre": prov.prov_nombre, "Correo": prov.prov_correo, "contrasenia": prov.prov_contrasenia} for prov in proveedores]
    return JsonResponse(data, safe=False)

@require_http_methods(["GET"])
def list_clientes(request):
    clientes = Clientes.objects.all()
    data = [{"cedula": cli.cli_cedula, "nombre": cli.cli_nombre, "apellido": cli.cli_apellido} for cli in clientes]
    return JsonResponse(data, safe=False)

@require_http_methods(["GET"])
def list_productos(request):
    productos = Producto.objects.all()
    data = [
        {
            "id": prod.prod_id,
            "descripcion": prod.prod_descripcion,
            "precio": prod.prod_precio_unitario,
            "cantidad": prod.prod_stock,
            "imagen": prod.prod_imagen.url if prod.prod_imagen else None,
            "categoria": prod.fk_categoria_id.categoria_descripcion,
            "proveedor": prod.fk_prov_id.prov_nombre
        }
        for prod in productos
    ]
    return JsonResponse(data, safe=False)

@require_http_methods(["GET"])
def list_ordenes(request):
    ordenes = OrdenCli.objects.all()
    data = [{"id": orden.orden_id, "fecha": orden.orden_fecha, "total": orden.orden_total} for orden in ordenes]
    return JsonResponse(data, safe=False)

@require_http_methods(["GET"])
def list_detalle_ordenes(request):
    detalles = DetalleOrden.objects.all()
    data = [
        {
            "id": det.detalle_id,
            "cantidad": det.detalle_cantidad,
            "precio": det.detalle_precio,
            "orden": det.fk_orden_id_id  # Accede solo al ID
        }
        for det in detalles
    ]
    return JsonResponse(data, safe=False)
#-----------------Listamos los productos por categoria------------------
@csrf_exempt
@require_http_methods(["GET"])
def list_productos_by_categoria(request, categoriaid):
    try:
        categoria = Categoria.objects.get(categoria_id=categoriaid)
        productos = Producto.objects.filter(fk_categoria_id=categoria)
        data = [
            {
                "id": prod.prod_id,
                "descripcion": prod.prod_descripcion,
                "precio": prod.prod_precio_unitario,
                "cantidad": prod.prod_stock,
                "imagen": prod.prod_imagen.url if prod.prod_imagen else None,
                "categoria": prod.fk_categoria_id.categoria_descripcion,
                "proveedor": prod.fk_prov_id.prov_nombre
            }
            for prod in productos
        ]
        return JsonResponse(data, safe=False)
    except Categoria.DoesNotExist:
        return JsonResponse({"error": "Categoria no encontrada"}, status=404)
    
#-----------------Listamos los productos por proovedor------------------
@csrf_exempt
@require_http_methods(["GET"])
def list_productos_by_proveedor(request, proveedorid):
    try:
        proveedor = Proveedor.objects.get(prov_id=proveedorid)
        productos = Producto.objects.filter(fk_prov_id=proveedor)
        data = [
            {
                "id": prod.prod_id,
                "descripcion": prod.prod_descripcion,
                "precio": prod.prod_precio_unitario,
                "cantidad": prod.prod_stock,
                "imagen": prod.prod_imagen.url if prod.prod_imagen else None,
                "categoria": prod.fk_categoria_id.categoria_descripcion,
                "proveedor": prod.fk_prov_id.prov_nombre
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
        email = data.get('email')
        password = data.get('password')
            
        try:
            user = Clientes.objects.get(cli_correo=email)
                
            if check_password(password, user.cli_contrasenia):
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
        email = data.get('email')
        password = data.get('password')
        
        try:
            user = Proveedor.objects.get(prov_correo=email)
            
            if check_password(password, user.prov_contrasenia):
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
        email = data.get('cli_correo')
        if Clientes.objects.filter(cli_correo=email).exists():
            return JsonResponse({"status": "error", "message": "Email already exists"})
        
        cliente = Clientes(
            cli_cedula=data.get('cli_cedula'),
            cli_nombre=data.get('cli_nombre'),
            cli_apellido=data.get('cli_apellido'),
            cli_correo=email,
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
        email = data.get('prov_correo')
        if Proveedor.objects.filter(prov_correo=email).exists():
            return JsonResponse({"status": "error", "message": "Email already exists"})

        proveedor = Proveedor(
            prov_nombre=data.get('prov_nombre'),
            prov_numero=data.get('prov_numero'),
            prov_correo=email,
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
            categoria_descripcion=data.get('categoria_descripcion')
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
    print("aacediendo a add_producto")
    try:
        data = json.loads(request.body)
        print("data: ", data)
        
        try:
            categoria = Categoria.objects.get(categoria_descripcion=data.get('categoria_descripcion'))
        except Categoria.DoesNotExist:
            return JsonResponse({"status": "error", "message": "Categoria not found"})
        
        producto = Producto(
            prod_descripcion=data.get('prod_descripcion'),
            prod_precio_unitario=data.get('prod_precio_unitario'),
            prod_stock=data.get('prod_stock'),
            prod_imagen=data.get('prod_imagen'),
            fk_categoria_id=Categoria.objects.get(categoria_id=categoria.categoria_id),
            fk_prov_id=Proveedor.objects.get(prov_id = data.get('fk_prov_id'))
        )
        producto.save()
        return JsonResponse({"status": "success", "message": "Producto added successfully"})
    except ValidationError as e:
        return JsonResponse({"status": "error", "message": str(e)})
    except Exception as e:
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
            cantidad = item.get('cantidad')

            producto = Producto.objects.get(prod_id=prod_id)

            if producto.prod_stock < cantidad:
                return JsonResponse({"status": "error", "message": f"Stock insuficiente para el producto {producto.prod_descripcion}"}, status=400)

            total += producto.prod_precio_unitario * cantidad
            detalles.append((producto, cantidad))

        # Crear orden y detalles dentro de una transacción
        with transaction.atomic():
            orden = OrdenCli(
                orden_fecha=datetime.date.today(),
                orden_total=total,
                fk_cli_cedula=cliente
            )
            orden.save()

            for producto, cantidad in detalles:
                detalle = DetalleOrden(
                    detalle_id=DetalleOrden.objects.filter(fk_orden_id=orden).count() + 1,
                    detalle_cantidad=cantidad,
                    detalle_precio=producto.prod_precio_unitario,
                    fk_orden_id=orden,
                    fk_prod_id=producto
                )
                detalle.save()

                # Reducir stock del producto
                producto.prod_stock -= cantidad
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
def productos_vendidos_por_proveedor(request, proveedorid):
    try:
        proveedor = Proveedor.objects.get(prov_id=proveedorid)
        productos = Producto.objects.filter(fk_prov_id=proveedor)
        productos_vendidos = []

        for producto in productos:
            detalles = DetalleOrden.objects.filter(fk_prod_id=producto)
            cantidad_vendida = sum(detalle.detalle_cantidad for detalle in detalles)

            if cantidad_vendida > 0:
                productos_vendidos.append({
                    "id": producto.prod_id,
                    "descripcion": producto.prod_descripcion,
                    "precio": producto.prod_precio_unitario,
                    "cantidad_vendida": cantidad_vendida
                })

        data = {
            "proveedor": proveedor.prov_nombre,
            "productos_vendidos": productos_vendidos
        }

        return JsonResponse(data, safe=False)
    except Proveedor.DoesNotExist:
        return JsonResponse({"status": "error", "message": "Proveedor no encontrado"}, status=404)
    except Exception as e:
        return JsonResponse({"status": "error", "message": str(e)}, status=500)
    
#-----------------Productos vendidos por categoria-------------------------------------------
@require_http_methods(["GET"])
def productos_vendidos_por_categoria(request, categoriaid):
    try:
        categoria = Categoria.objects.get(categoria_id=categoriaid)
        productos = Producto.objects.filter(fk_categoria_id=categoria)
        productos_vendidos = []

        for producto in productos:
            detalles = DetalleOrden.objects.filter(fk_prod_id=producto)
            cantidad_vendida = sum(detalle.detalle_cantidad for detalle in detalles)

            if cantidad_vendida > 0:
                productos_vendidos.append({
                    "id": producto.prod_id,
                    "descripcion": producto.prod_descripcion,
                    "precio": producto.prod_precio_unitario,
                    "cantidad_vendida": cantidad_vendida
                })

        data = {
            "categoria": categoria.categoria_descripcion,
            "productos_vendidos": productos_vendidos
        }

        return JsonResponse(data, safe=False)
    except Categoria.DoesNotExist:
        return JsonResponse({"status": "error", "message": "Categoria no encontrada"}, status=404)
    except Exception as e:
        return JsonResponse({"status": "error", "message": str(e)}, status=500)