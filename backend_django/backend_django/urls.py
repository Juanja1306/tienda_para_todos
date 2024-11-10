"""
URL configuration for backend_django project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from postgres import views

urlpatterns = [
    path('', views.home, name='home'),  # Página de inicio
    path('admin/', admin.site.urls),
    path('categorias/', views.list_categorias, name='list_categorias'),
    path('proveedores/', views.list_proveedores, name='list_proveedores'),
    path('clientes/', views.list_clientes, name='list_clientes'),
    path('productos/', views.list_productos, name='list_productos'),
    path('ordenes/', views.list_ordenes, name='list_ordenes'),
    path('detalle_ordenes/', views.list_detalle_ordenes, name='list_detalle_ordenes'),
    path('login_clientes/', views.login_clientes, name='login_clientes'),
    path('login_proveedores/', views.login_proveedores, name='login_proveedores'),
    path('add_cliente/', views.add_cliente, name='add_cliente'),
    path('add_proveedor/', views.add_proveedor, name='add_proveedor'),
]
