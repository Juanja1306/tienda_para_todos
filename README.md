
# Guía de Configuración del Proyecto

## Configuración del Volumen en Docker

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

## Notas Importantes

- **Errores iniciales:** Es posible que aparezcan errores al inicio. Puedes ignorarlos y esperar de 3 a 5 minutos hasta que todos los contenedores se inicialicen correctamente.


## Entrar a portainer:

- **Pagina:** http://localhost:9000/
- **Usuario:** `admin`
- **Contraseña:** TLpRjw7pt5s9BeK

## Entrar a grafana:

- **Pagina:** http://localhost:3000/
- **Usuario:** `admin`
- **Contraseña:** TLpRjw7pt5s9BeK

## Entrar a Netdata

- **Pagina:** http://localhost:19999/
- **Entrar en:** Skip and use the dashboard anonymously.


## Conectarse al contenedor SSH
- `ssh root@localhost -p 2222`
  
### Ingresar la contraseña de SSH cuando se solicite
- `root`

### Instalar las dependencias necesarias (solo si es la primera vez)
- `apt update`
- `apt install -y postgresql-client`
  
### Conectarse a PostgreSQL
- `psql -h postgres_db_new -U postgres -d probando`
  
### Ingresar la contraseña de PostgreSQL cuando se solicite
- `probando`
  
### Verificar la estructura de la tabla
- `\d categorias`
  
### Insertar datos en la tabla
- `INSERT INTO categorias VALUES ('Ejemplo Categoria');`
  
### Consultar datos en la tabla
- `SELECT * FROM categorias;`
  
### Salir de PostgreSQL
- `\q`
  
### Salir de SSH
- `exit`
