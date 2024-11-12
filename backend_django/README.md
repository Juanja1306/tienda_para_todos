python manage.py runserver

Cambiar el volumen en docker-compose.yml

volumes:
  postgres_data:
    driver: local
    driver_opts:
      o: bind
      type: none
      device: C:/Users/juanj/Desktop/datapg

Cambiar el device: C:/Users/juanj/Desktop/datapg por una ruta de su PC para almacenar la base de datos

Las credenciales de acceso a pgAdmin4:
Correo electrónico: info@jasoft.ec
Contraseña: clave
A continuación, intenta los siguientes pasos para configurar la conexión en pgAdmin:
Nombre/Dirección de servidor: db_postgres
Puerto: 5432 (como estamos dentro de la misma red de Docker usar el puerto interno del contenedor de PostgreSQL en lugar de 5433).
Base de datos de mantenimiento: probando
Nombre de usuario: postgres
Contraseña: probando
¿Salvar contraseña?: Puedes marcar esta opción si deseas que pgAdmin guarde la contraseña para futuras conexiones.

Para acceder al super usuario de django:
Usuario: admin
Contraseña: admin123


Obviar los errores, esperar unos 3 a 5 minutos hasta que se inicialice todo