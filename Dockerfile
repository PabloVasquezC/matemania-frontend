# === 1. FASE DE CONSTRUCCIÓN (Build) ===
FROM node:20-alpine AS builder

WORKDIR /app

# Copia los archivos de configuración de dependencias
COPY package.json package-lock.json ./

# Instala las dependencias
RUN npm install

# Copia el resto del código fuente del frontend
COPY . .

# Ejecuta el comando de construcción de Vite
RUN npm run build


# === 2. FASE DE PRODUCCIÓN (Servir con Nginx) ===
FROM nginx:alpine AS final

# Copia la configuración de Nginx personalizada (la que acabamos de crear)
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copia los archivos estáticos construidos a la carpeta de Nginx
COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
