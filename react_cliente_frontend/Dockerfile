# Usa la imagen oficial de Node.js versión 20
FROM node:20 AS builder

# Establece el directorio de trabajo en /app
WORKDIR /app

# Copia los archivos de configuración (package.json, package-lock.json) y los archivos de Vite
COPY package.json package-lock.json ./

# Instala las dependencias
RUN npm install

# Copia el resto del código de la aplicación
COPY . .

# Construye la aplicación
RUN npm run build

# Usa una imagen ligera de Node.js para la etapa de producción
FROM node:20-slim AS production

# Instala 'serve' para servir el contenido estático
RUN npm install -g serve

# Establece el directorio de trabajo en /app
WORKDIR /app

# Copia el resultado de la construcción desde la etapa de 'builder'
COPY --from=builder /app/dist ./dist

# Inicia la aplicación en el puerto 5173 
CMD ["serve", "-s", "dist", "-l", "5173"]
