# Guía de Testing de Build - Frontend Astro 5

## Tabla de Contenidos
1. [Overview](#overview)
2. [Build con Backend Activo](#build-con-backend-activo)
3. [Build sin Backend (Fallbacks)](#build-sin-backend-fallbacks)
4. [Validación de Build](#validación-de-build)
5. [Testing del Sitio Estático](#testing-del-sitio-estático)
6. [Deploy Checklist](#deploy-checklist)
7. [Troubleshooting](#troubleshooting)

---

## Overview

Astro 5 genera sitios estáticos (SSG - Static Site Generation) en build time. Esto significa que:

- **Todas las llamadas a API ocurren durante el build** (no en el navegador del usuario)
- Los datos del backend se "congelan" en HTML estático
- Si el backend está caído durante el build, se usan fallbacks
- Para actualizar datos, se requiere rebuild + redeploy

### Implicaciones Clave
- Build exitoso NO garantiza datos correctos (puede usar fallbacks)
- Validar que el build usó datos reales del backend, no fallbacks
- Testing del sitio generado es crucial antes de deploy

---

## Build con Backend Activo

### Preparación

#### 1. Verificar Backend Está Corriendo
```bash
# Desde directorio raíz del proyecto
cd backend

# Iniciar PostgreSQL
docker-compose up -d

# Verificar PostgreSQL está corriendo
docker-compose ps

# Iniciar Strapi
npm run develop
# O en modo producción:
# npm run start
```

**Validar:**
- Strapi accesible en `http://localhost:1337`
- Admin panel funcional en `http://localhost:1337/admin`
- API endpoints responden (prueba: `curl http://localhost:1337/api/pricing-plans`)

#### 2. Verificar Datos en Strapi
```bash
# Probar endpoints manualmente
curl http://localhost:1337/api/pricing-plans?populate=*
curl http://localhost:1337/api/features?populate=*
curl http://localhost:1337/api/testimonials?populate=*
curl http://localhost:1337/api/site-stats
curl http://localhost:1337/api/client-logos?populate=*
curl http://localhost:1337/api/use-case-benefits?populate=*
```

**Checklist:**
- [ ] Todos los endpoints retornan HTTP 200
- [ ] Cada endpoint tiene al menos 3 registros (excepto site-stats)
- [ ] Todos los registros tienen `publishedAt` no nulo
- [ ] Imágenes tienen URLs válidas
- [ ] No hay campos null en datos críticos

### Ejecutar Build

#### 1. Build de Desarrollo
```bash
cd frontend

# Limpiar builds anteriores (opcional)
rm -rf dist

# Build con verbose para ver detalles
npm run build
```

#### 2. Observar Logs del Build

**Qué buscar durante el build:**

✅ **Señales de Éxito:**
```
✓ Completed in Xms
✓ 320 page(s) built in Xs
✓ Generated static files
```

✅ **Llamadas API exitosas:**
- No deberías ver errores de fetch
- Build debería ser relativamente rápido (< 30s para proyecto pequeño)

❌ **Señales de Problemas:**
```
Error: fetch failed
ECONNREFUSED
timeout of 10000ms exceeded
```

#### 3. Verificar Logs en Detalle

**Durante el build, Astro debería:**
1. Llamar a cada endpoint del API
2. Recibir datos
3. Generar HTML estático con esos datos

**Validar en logs:**
```bash
# Si ves muchos errores de fetch, el backend no estaba accesible
grep "fetch failed" logs.txt
grep "ECONNREFUSED" logs.txt
```

### Validación Post-Build

#### 1. Verificar Archivos Generados
```bash
# Desde /frontend
ls -lah dist/

# Deberías ver:
# - index.html (página principal)
# - danzas/index.html
# - artes-marciales/index.html
# - artes-escenicas/index.html
# - deportiva/index.html
# - musica/index.html
# - pre-escolar/index.html
# - _astro/ (assets)
# - favicon.svg
```

**Checklist:**
- [ ] Carpeta `dist/` existe
- [ ] Todas las páginas HTML generadas (7 páginas)
- [ ] Carpeta `_astro/` contiene assets (CSS, JS, imágenes)
- [ ] Tamaño de archivos razonable (no vacíos)

#### 2. Inspeccionar HTML Generado

**Buscar datos reales del backend:**
```bash
# Verificar que pricing plans contienen datos reales
cat dist/index.html | grep -i "precio\|price\|plan"

# Verificar testimonios tienen nombres reales
cat dist/index.html | grep -i "testimonio\|testimonial"

# Verificar estadísticas tienen números
cat dist/index.html | grep -i "estudiantes\|academias"
```

**Qué buscar:**
- [ ] Nombres de planes reales (no "Plan Básico", "Plan Pro" de fallback)
- [ ] Precios correctos
- [ ] Nombres de testimonios reales
- [ ] Estadísticas con números del backend
- [ ] Logos de clientes (verificar URLs de imágenes)

#### 3. Verificar Imágenes Optimizadas
```bash
# Astro debería generar múltiples formatos
ls -lah dist/_astro/

# Buscar archivos webp, avif
ls dist/_astro/*.webp
ls dist/_astro/*.avif
```

**Validar:**
- [ ] Imágenes en múltiples formatos (webp, avif, original)
- [ ] Diferentes tamaños para responsive (width descriptors)
- [ ] Nombres de archivo hasheados (cache busting)

---

## Build sin Backend (Fallbacks)

### Propósito
Validar que el sitio puede buildear y funcionar incluso si el backend está caído durante el build.

### Procedimiento

#### 1. Detener Backend
```bash
# En terminal del backend
Ctrl+C (para Strapi)

# Detener PostgreSQL
docker-compose down
```

#### 2. Limpiar Cache (importante)
```bash
cd frontend

# Limpiar completamente
rm -rf dist
rm -rf node_modules/.astro
rm -rf node_modules/.vite
```

#### 3. Ejecutar Build
```bash
npm run build
```

#### 4. Observar Comportamiento

**Esperado:**
- Build completa sin errores críticos (exit code 0)
- Warnings o errores de fetch en logs (normal)
- Sitio generado con datos de fallback

**Logs típicos:**
```
[WARN] Failed to fetch from http://localhost:1337/api/pricing-plans
[INFO] Using fallback data for pricing plans
```

### Validación de Fallbacks

#### 1. Verificar HTML con Datos de Fallback
```bash
# Abrir index.html y buscar datos de fallback
cat dist/index.html | grep -i "plan básico"
cat dist/index.html | grep -i "plan profesional"
cat dist/index.html | grep -i "plan empresa"
```

**Verificar:**
- [ ] 3 planes de pricing (Básico, Profesional, Empresa)
- [ ] 6 features predefinidas
- [ ] 3 testimonios genéricos
- [ ] Estadísticas de ejemplo (ej: 1000 estudiantes, 50 academias)
- [ ] 6 logos de clientes genéricos

#### 2. Comprobar Funcionalidad Visual
```bash
# Preview del sitio
npm run preview
```

Abrir `http://localhost:4321` y verificar:
- [ ] Todas las secciones visibles
- [ ] No hay espacios vacíos
- [ ] Imágenes de fallback cargan
- [ ] Layout mantiene estructura
- [ ] No mensajes de error visibles al usuario

#### 3. Validar Formulario Callback

**Importante:** El formulario NO funcionará sin backend activo (porque hace POST en runtime).

**Verificar:**
- [ ] Formulario se muestra correctamente
- [ ] Campos son editables
- [ ] Al enviar, muestra error claro ("Servicio no disponible temporalmente")
- [ ] No crash de la aplicación
- [ ] Datos del usuario se preservan en el formulario

---

## Validación de Build

### Checklist Completo Pre-Deploy

#### 1. Integridad de Archivos
```bash
cd dist

# Verificar todas las páginas existen
test -f index.html && echo "✓ index.html" || echo "✗ index.html missing"
test -f danzas/index.html && echo "✓ danzas/index.html" || echo "✗ danzas/index.html missing"
test -f artes-marciales/index.html && echo "✓ artes-marciales/index.html" || echo "✗ artes-marciales/index.html missing"
test -f artes-escenicas/index.html && echo "✓ artes-escenicas/index.html" || echo "✗ artes-escenicas/index.html missing"
test -f deportiva/index.html && echo "✓ deportiva/index.html" || echo "✗ deportiva/index.html missing"
test -f musica/index.html && echo "✓ musica/index.html" || echo "✗ musica/index.html missing"
test -f pre-escolar/index.html && echo "✓ pre-escolar/index.html" || echo "✗ pre-escolar/index.html missing"

# Verificar assets
test -d _astro && echo "✓ _astro directory" || echo "✗ _astro directory missing"
test -f favicon.svg && echo "✓ favicon.svg" || echo "✗ favicon.svg missing"
```

#### 2. Validación de HTML

**Validar estructura HTML:**
```bash
# Validar que no hay HTML roto
grep -r "undefined" dist/*.html && echo "⚠️ Found 'undefined' in HTML" || echo "✓ No undefined values"
grep -r "null" dist/*.html && echo "⚠️ Found 'null' in HTML" || echo "✓ No null values"

# Validar meta tags
grep -r "og:title" dist/index.html && echo "✓ OG tags present" || echo "⚠️ Missing OG tags"
grep -r "description" dist/index.html && echo "✓ Meta description" || echo "⚠️ Missing meta description"
```

#### 3. Validación de Assets

**Verificar CSS y JS:**
```bash
# Verificar que CSS fue generado
ls -lh dist/_astro/*.css | head -5

# Verificar que no hay archivos vacíos
find dist/_astro -name "*.css" -size 0 && echo "⚠️ Empty CSS files" || echo "✓ All CSS files valid"
find dist/_astro -name "*.js" -size 0 && echo "⚠️ Empty JS files" || echo "✓ All JS files valid"
```

#### 4. Tamaño del Build

```bash
# Tamaño total
du -sh dist/

# Tamaño por tipo
du -sh dist/_astro/*.css | head -5
du -sh dist/_astro/*.js | head -5
```

**Benchmarks esperados:**
- Total: < 5 MB (sin contar uploads grandes)
- CSS: < 200 KB (total de todos los archivos)
- JS: < 300 KB (total de todos los archivos)
- HTML: < 100 KB por página

---

## Testing del Sitio Estático

### Preview Local

#### 1. Iniciar Preview Server
```bash
npm run preview
```

Esto sirve el contenido de `dist/` en `http://localhost:4321`

#### 2. Testing Manual Completo

**Navegación:**
- [ ] Página principal (/) carga correctamente
- [ ] Links de navegación funcionan
- [ ] Páginas específicas accesibles (/danzas, /artes-marciales, etc.)
- [ ] View transitions suaves entre páginas
- [ ] Botón "volver arriba" funciona

**Contenido Dinámico:**
- [ ] Pricing plans muestran datos correctos
- [ ] Features desplegadas correctamente
- [ ] Testimonios visibles con avatares
- [ ] Estadísticas con números reales
- [ ] Logos de clientes en carrusel
- [ ] Benefits específicos por página de use case

**Interactividad:**
- [ ] Navbar sticky funciona
- [ ] Hamburger menu (mobile) abre/cierra
- [ ] Carrusel de logos se anima
- [ ] Formulario de callback es editable
- [ ] Hover states funcionan (botones, cards)

**Responsive:**
- [ ] Mobile (320px): Layout columna única, texto legible
- [ ] Tablet (768px): Layout 2 columnas donde aplique
- [ ] Desktop (1280px): Layout completo, espaciado correcto
- [ ] Ultra-wide (1920px): Contenido centrado, no overflow

#### 3. Testing con DevTools

**Performance:**
```bash
# Abrir Chrome DevTools
# Ir a Lighthouse tab
# Run audit en todas las categorías
```

**Targets mínimos:**
- Performance: > 90
- Accessibility: > 95
- Best Practices: > 90
- SEO: > 90

**Network:**
- [ ] Abrir Network tab y recargar
- [ ] Verificar que no hay requests a `/api/*` (sitio es estático)
- [ ] Imágenes en formatos modernos (webp, avif)
- [ ] Recursos cacheables tienen headers correctos
- [ ] Total transferred < 3 MB en carga inicial

**Console:**
- [ ] No errores JavaScript
- [ ] No warnings críticos
- [ ] No 404s de recursos

### Testing de Formulario Callback

**Con Backend Activo:**
```bash
# En otra terminal, iniciar backend
cd backend
npm run develop
```

Luego en preview:
1. Rellenar formulario con datos de prueba
2. Enviar
3. Verificar en Network tab: POST a `http://localhost:1337/api/callback-requests`
4. Verificar respuesta HTTP 200
5. Comprobar en Strapi admin panel que el registro se creó

**Sin Backend:**
1. Detener backend
2. Intentar enviar formulario
3. Verificar mensaje de error claro
4. Verificar que datos se preservan en el formulario

---

## Deploy Checklist

### Pre-Deploy

#### 1. Build Final con Backend Activo
```bash
# Asegurar backend corriendo
cd backend && docker-compose up -d && npm run develop

# En otra terminal
cd frontend

# Limpiar todo
rm -rf dist node_modules/.astro node_modules/.vite

# Build limpio
npm run build
```

#### 2. Validación Final
```bash
# Ejecutar script de testing (si backend está activo)
node test-integration.js

# Preview local
npm run preview

# Testing manual completo (ver sección anterior)
```

#### 3. Verificar Variables de Entorno

**Si tienes `.env` en frontend:**
```bash
# Verificar que variables están configuradas
cat .env

# Ejemplo:
# PUBLIC_API_URL=http://localhost:1337/api
```

**Para producción:**
- Actualizar `PUBLIC_API_URL` a URL de producción del backend
- Rebuild con nuevas variables

#### 4. Optimización de Assets

```bash
# Verificar que imágenes están optimizadas
cd dist/_astro
ls -lh *.{webp,avif,jpg,png} | head -10

# Si hay imágenes muy grandes (> 500KB), optimizar en Strapi
```

### Deploy

#### Opción 1: Deploy con Docker (Recomendado)

```bash
cd frontend

# Build de imagen Docker
docker build -t akdemi-frontend:latest .

# Probar localmente
docker run -p 3000:3000 akdemi-frontend:latest

# Verificar en http://localhost:3000
```

**Validar:**
- [ ] Contenedor inicia sin errores
- [ ] Sitio accesible en puerto 3000
- [ ] Todas las páginas cargan
- [ ] Assets sirven correctamente

**Push a registry:**
```bash
# Tag para registry
docker tag akdemi-frontend:latest registry.example.com/akdemi-frontend:latest

# Push
docker push registry.example.com/akdemi-frontend:latest
```

#### Opción 2: Deploy Directo de `dist/`

**Para plataformas como Netlify, Vercel, Coolify:**

```bash
# Asegurar que dist/ está actualizado
npm run build

# Comprimir para upload (opcional)
tar -czf dist.tar.gz dist/

# Subir dist/ o dist.tar.gz según plataforma
```

**Configuración en plataforma:**
- Build command: `npm run build`
- Publish directory: `dist`
- Node version: 18.x o 20.x

### Post-Deploy

#### 1. Smoke Testing en Producción

**URLs a probar:**
```
https://tudominio.com/
https://tudominio.com/danzas
https://tudominio.com/artes-marciales
https://tudominio.com/artes-escenicas
https://tudominio.com/deportiva
https://tudominio.com/musica
https://tudominio.com/pre-escolar
```

**Verificar:**
- [ ] Todas las páginas responden HTTP 200
- [ ] Certificado SSL válido (HTTPS)
- [ ] Assets cargan desde CDN (si aplica)
- [ ] Imágenes optimizadas sirven
- [ ] No errores en console
- [ ] Performance Lighthouse > 90

#### 2. Testing de Formulario en Producción

**Importante:** Actualizar URL del backend en el código del formulario o variables de entorno.

```bash
# Si usas variable de entorno
PUBLIC_API_URL=https://api.tudominio.com/api npm run build
```

**Probar:**
- [ ] Rellenar formulario
- [ ] Enviar
- [ ] Verificar que llega a backend de producción
- [ ] Comprobar CORS configurado en backend de producción

#### 3. Monitoreo

**Configurar (recomendado):**
- Uptime monitoring (UptimeRobot, Pingdom)
- Error tracking (Sentry)
- Analytics (Google Analytics, Plausible)
- Logs de servidor/CDN

---

## Troubleshooting

### Build Falla con Errores de Fetch

**Síntomas:**
```
Error: fetch failed
ECONNREFUSED 127.0.0.1:1337
```

**Soluciones:**
1. Verificar que backend está corriendo: `curl http://localhost:1337/_health`
2. Verificar que Content Types existen en Strapi
3. Verificar permisos públicos en Settings > Roles > Public
4. Si backend está en otra máquina, actualizar URL en `src/lib/api.ts`

### Build Usa Fallbacks Cuando No Debería

**Síntomas:**
- Build exitoso pero datos genéricos en HTML
- Logs muestran "Using fallback data"

**Soluciones:**
1. Verificar que datos están publicados (`publishedAt` no null)
2. Verificar que permisos de lectura están habilitados
3. Probar endpoints manualmente con `curl`
4. Limpiar cache: `rm -rf node_modules/.astro`
5. Rebuild desde cero

### Imágenes No Cargan en Preview

**Síntomas:**
- 404 en URLs de imágenes
- Imágenes rotas en preview

**Soluciones:**
1. Verificar que imágenes están en Strapi: `http://localhost:1337/uploads/`
2. Verificar que `populate=*` está en requests del API
3. Verificar que URLs de imagen son absolutas (no relativas)
4. Revisar configuración de `server.url` en Strapi (`config/server.ts`)

### Performance Degradada

**Síntomas:**
- Lighthouse score < 70
- Carga lenta

**Soluciones:**
1. Optimizar imágenes en Strapi (< 200KB por imagen)
2. Verificar que Astro genera webp/avif: `ls dist/_astro/*.webp`
3. Minimizar JavaScript no usado
4. Habilitar compresión gzip/brotli en servidor
5. Usar CDN para assets

### Formulario No Envía en Producción

**Síntomas:**
- CORS error
- 403 Forbidden
- Network error

**Soluciones:**
1. Verificar CORS en backend de producción (`config/middlewares.ts`):
```typescript
cors: {
  origin: ['https://tudominio.com'],
  credentials: true,
}
```
2. Verificar que URL del API es correcta (HTTPS en producción)
3. Verificar permisos POST en callback-requests
4. Verificar que backend de producción está accesible

### Páginas 404 en Producción

**Síntomas:**
- URLs funcionan en dev pero no en producción
- Rutas con slash al final fallan

**Soluciones:**
1. Verificar configuración de servidor (para SPAs)
2. Para páginas estáticas, asegurar que `index.html` está en cada carpeta
3. Configurar redirects en plataforma de hosting
4. Verificar `trailingSlash` en `astro.config.mjs`

---

## Automatización de Testing

### Script de Build y Validación

Crear `build-and-test.sh`:
```bash
#!/bin/bash

echo "🚀 Starting build and test process..."

# 1. Verificar backend
echo "1. Checking backend..."
curl -f http://localhost:1337/_health || { echo "❌ Backend not running"; exit 1; }

# 2. Limpiar build anterior
echo "2. Cleaning previous build..."
rm -rf dist node_modules/.astro

# 3. Build
echo "3. Building..."
npm run build || { echo "❌ Build failed"; exit 1; }

# 4. Verificar archivos
echo "4. Verifying build output..."
test -f dist/index.html || { echo "❌ index.html missing"; exit 1; }
test -d dist/_astro || { echo "❌ _astro directory missing"; exit 1; }

# 5. Validar HTML
echo "5. Validating HTML..."
grep -r "undefined" dist/*.html && { echo "⚠️ Found undefined in HTML"; }
grep -r "null" dist/*.html && { echo "⚠️ Found null in HTML"; }

# 6. Preview
echo "6. Starting preview server..."
npm run preview &
PREVIEW_PID=$!
sleep 3

# 7. Test endpoints
echo "7. Testing preview..."
curl -f http://localhost:4321/ || { echo "❌ Preview failed"; kill $PREVIEW_PID; exit 1; }

# 8. Cleanup
echo "8. Stopping preview..."
kill $PREVIEW_PID

echo "✅ Build and test completed successfully!"
```

**Uso:**
```bash
chmod +x build-and-test.sh
./build-and-test.sh
```

---

## Conclusión

### Workflow Recomendado

**Para cada deploy:**
1. ✅ Verificar backend está corriendo y con datos actualizados
2. ✅ Ejecutar `node test-integration.js` para validar API
3. ✅ Limpiar cache y hacer build limpio
4. ✅ Validar HTML generado contiene datos reales (no fallbacks)
5. ✅ Preview local y testing manual
6. ✅ Run Lighthouse audit
7. ✅ Deploy
8. ✅ Smoke test en producción

**Para cambios de contenido en Strapi:**
- Actualizar datos en Strapi
- Rebuild frontend (`npm run build`)
- Redeploy
- No es necesario cambiar código

**Para cambios de código frontend:**
- Desarrollar en modo dev (`npm run dev`)
- Testing local
- Build con backend activo
- Validar preview
- Deploy

---

**Versión:** 1.0
**Última actualización:** 2025-11-12
**Mantenedor:** QA Team
