
# Guía de Configuración del Proyecto

## Configuración del Volumen en Docker

En el archivo `docker-compose.yml`, ajusta el volumen para almacenar la base de datos en tu PC local:

```yaml
volumes:
  postgres_data:
    driver: local
    driver_opts:
      o: bind
      type: none
      device: C:/Users/juanj/Desktop/datapg  # Cambia esta ruta por la que desees en tu PC
```

Reemplaza `device: C:/Users/juanj/Desktop/datapg` por una ruta en tu sistema donde se almacenarán los datos de PostgreSQL.


## Iniciar el Servidor de Desarrollo

Ejecuta el siguiente comando para iniciar el servidor de Django:
```bash
docker compose up --build
```


## Credenciales de Acceso a pgAdmin4
- **Pagina:** http://localhost:5050/login?next=/

- **Correo Electrónico:** `info@jasoft.ec`  
- **Contraseña:** `clave`  

### Configuración de la Conexión en pgAdmin

Sigue estos pasos para conectar pgAdmin al contenedor de PostgreSQL:

1. **Nombre/Dirección del Servidor:** `db_postgres`
2. **Puerto:** `5432`  
   *(Usa el puerto interno de PostgreSQL, ya que estamos en la misma red de Docker.)*
3. **Base de Datos de Mantenimiento:** `probando`
4. **Nombre de Usuario:** `postgres`
5. **Contraseña:** `probando`
6. **Guardar Contraseña:** Opcional, puedes marcar esta opción para que pgAdmin guarde la contraseña.

## Acceso al Superusuario de Django

Para acceder al panel de administración de Django, utiliza las siguientes credenciales:


- **Pagina:** http://localhost:8000/admin/
- **Usuario:** `admin`
- **Contraseña:** `admin123`

## Notas Importantes

- **Errores iniciales:** Es posible que aparezcan errores al inicio. Puedes ignorarlos y esperar de 3 a 5 minutos hasta que todos los contenedores se inicialicen correctamente.
