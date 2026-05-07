# Dockerfile para AkdemiApp Frontend - Astro SSG
# Optimizado para producción con Coolify
# Modo: Static Site Generation (SSG) con auto-rebuild via webhooks

# ============================================
# Stage 1: Build - Construcción de la app
# ============================================
FROM node:20-alpine AS build

# Metadata
LABEL maintainer="AkdemiApp Team"
LABEL description="AkdemiApp Frontend - Astro 5 Landing Page"

WORKDIR /app

# Instalar dependencias del sistema necesarias para el build
RUN apk add --no-cache \
    git \
    python3 \
    make \
    g++

# Copiar archivos de dependencias primero (cache layer)
COPY package*.json ./

# Instalar dependencias de producción y desarrollo
# --force: resolver conflictos de peer dependencies
# --no-audit: skip audit para build más rápido
RUN npm ci --force --no-audit

# Copiar código fuente
# .dockerignore excluye archivos innecesarios
COPY . .

# Construir aplicación Astro
# Las variables de entorno se pueden pasar en build-time si es necesario
ARG PUBLIC_API_URL
ARG PUBLIC_STRAPI_URL
ENV PUBLIC_API_URL=${PUBLIC_API_URL}
ENV PUBLIC_STRAPI_URL=${PUBLIC_STRAPI_URL}

RUN npm run build:docker

# Verificar que el build se completó correctamente
RUN test -d dist || (echo "Error: dist directory not created" && exit 1)

# ============================================
# Stage 2: Production - Servidor ligero
# ============================================
FROM node:20-alpine AS production

# Metadata
LABEL maintainer="AkdemiApp Team"
LABEL version="1.0"

WORKDIR /app

# Crear usuario no-root para seguridad
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nodejs -u 1001

# Instalar serve para servir archivos estáticos
# --production: solo dependencias de producción
RUN npm install -g serve@14 --production

# Copiar archivos estáticos desde build stage
# Cambiar ownership al usuario nodejs
COPY --from=build --chown=nodejs:nodejs /app/dist ./dist

# Cambiar a usuario no-root
USER nodejs

# Exponer puerto 3000
EXPOSE 3000

# Variables de entorno de runtime
ENV NODE_ENV=production
ENV HOST=0.0.0.0
ENV PORT=3000

# Health check para Coolify
HEALTHCHECK --interval=30s \
            --timeout=10s \
            --start-period=5s \
            --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:3000/ || exit 1

# Comando de inicio
# -l: puerto 3000
# --no-port-switching: no cambiar puerto automáticamente
# --no-clipboard: no copiar URL al clipboard (innecesario en prod)
# --cors: habilitar CORS si es necesario
CMD ["serve", "dist", "-l", "3000", "--no-port-switching", "--no-clipboard"]
