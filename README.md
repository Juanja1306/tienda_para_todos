
# Guía de Configuración del Proyecto

## Configuración de los Volumenes en Docker

En el archivo `docker-compose.yml`, ajusta los volumenes para almacenar la base de datos en tu PC local, por ejemplo:

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


- **Pagina:** http://localhost:8001/admin/
- **Usuario:** `admin`
- **Contraseña:** `admin123`

## Entrar al frontend React:

- **Pagina:** http://localhost:5173/

## Entrar a portainer:

- **Pagina:** http://localhost:9000/
- **Usuario:** `admin`
- **Contraseña:** `TLpRjw7pt5s9BeK`

## Entrar a grafana:

- **Pagina:** http://localhost:3000/
- **Usuario:** `admin`
- **Contraseña:** `admin`

## Entrar a Netdata

- **Pagina:** http://localhost:19999/
- **Entrar en:** Skip and use the dashboard anonymously.

## Conectarse al contenedor SSH

- **Usuario:** `ssh root@localhost -p 2222`
- **Contraseña:** `root`

### Instalar las dependencias necesarias (solo si es la primera vez)
- `apt update`
- `apt install -y postgresql-client`
  
### Conectarse a PostgreSQL
- `psql -h postgres_db_new -U postgres -d probando`
  
### Ingresar la contraseña de PostgreSQL cuando se solicite
- `probando`
  
### Insertar datos en la tabla
- `INSERT INTO categorias (cat_descripcion) VALUES ('Ejemplo Categoria');`
  
### Consultar datos en la tabla
- `SELECT * FROM categorias;`
  
### Salir de PostgreSQL
- `\q`
  
### Salir de SSH
- `exit`

## Notas Importantes

### Ingreso de Categoría
El ingreso de nuevas categorías está restringido exclusivamente al administrador. Esta medida asegura el control total sobre la estructura de datos y evita inconsistencias que podrían afectar la integridad del sistema.

### Errores Iniciales
Durante el arranque del proyecto, es posible que aparezcan errores o mensajes de advertencia en la consola. Estos suelen estar relacionados con la inicialización de servicios y pueden ignorarse. Se recomienda esperar de 3 a 5 minutos para que todos los contenedores se inicialicen completamente.

### Ajuste de Rutas de Volúmenes
Es crucial verificar que las rutas de los volúmenes definidas en el archivo `docker-compose.yml` estén correctamente configuradas según la estructura de tu sistema local. Esto es especialmente importante para servicios que utilizan volúmenes persistentes, como `postgres_data`, `portainer_data` y `grafana_data`. Asegúrate de que las rutas absolutas en el archivo apunten a directorios existentes en tu máquina.

### Consistencia del Entorno
Antes de iniciar el proyecto, verifica que no haya servicios en tu máquina ocupando los puertos definidos (5050, 8001, 9000, 3000, 19999, y 2222). Esto evitará conflictos y garantizará un despliegue sin interrupciones.
