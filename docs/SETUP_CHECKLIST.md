# Checklist de Configuración - Integración Frontend-Backend

## Frontend - COMPLETADO ✓

### Archivos Creados
- [x] `src/lib/api.ts` - Cliente API base
- [x] `src/types/Plan.ts` - Interfaz de planes
- [x] `src/types/Feature.ts` - Interfaz de características
- [x] `src/types/Testimonial.ts` - Interfaz de testimonios
- [x] `src/types/SiteStats.ts` - Interfaz de estadísticas
- [x] `src/types/CallbackRequest.ts` - Interfaz de callbacks
- [x] `src/types/ClientLogo.ts` - Interfaz de logos
- [x] `src/types/index.ts` - Exportaciones centralizadas
- [x] `src/services/plans.ts` - Servicio de planes
- [x] `src/services/features.ts` - Servicio de características
- [x] `src/services/testimonials.ts` - Servicio de testimonios
- [x] `src/services/stats.ts` - Servicio de estadísticas
- [x] `src/services/callbacks.ts` - Servicio de callbacks
- [x] `src/services/clients.ts` - Servicio de logos
- [x] `src/services/index.ts` - Exportaciones centralizadas
- [x] `src/services/README.md` - Documentación de servicios
- [x] `src/services/EXAMPLES.md` - Ejemplos de uso
- [x] `.env` - Variables de entorno (desarrollo)
- [x] `.env.example` - Plantilla de variables
- [x] `tsconfig.json` - Actualizado con path aliases
- [x] `INTEGRATION_GUIDE.md` - Guía completa de integración
- [x] `SETUP_CHECKLIST.md` - Este archivo

### Configuración
- [x] Variables de entorno configuradas (`.env`)
- [x] Path aliases de TypeScript configurados
- [x] Cliente API base implementado
- [x] Todas las interfaces TypeScript definidas
- [x] Todos los servicios implementados
- [x] Documentación completa creada

## Backend - PENDIENTE ⏳

### Content Types a Crear en Strapi

#### Collection Types
- [ ] **plans** (Planes de Precios)
  ```
  Campos:
  - name (Text, required)
  - slug (UID, required, from: name)
  - monthlyPrice (Number, required)
  - yearlyPrice (Number, required)
  - description (Text)
  - features (JSON)
  - icon (Text)
  - isPopular (Boolean, default: false)
  - isActive (Boolean, default: true)
  - order (Number, default: 0)
  ```

- [ ] **features** (Características)
  ```
  Campos:
  - title (Text, required)
  - description (Text, required)
  - icon (Text)
  - badge (Text)
  - isActive (Boolean, default: true)
  - order (Number, default: 0)
  ```

- [ ] **testimonials** (Testimonios)
  ```
  Campos:
  - quote (Text, required)
  - author (Text, required)
  - role (Text, required)
  - company (Text)
  - avatar (Text)
  - rating (Number, min: 1, max: 5, default: 5)
  - isFeatured (Boolean, default: false)
  - academyType (Enumeration: artes-escenicas, artes-marciales, danzas, deportiva, musica, pre-escolar)
  ```

- [ ] **callback-requests** (Solicitudes de Callback)
  ```
  Campos:
  - nombre (Text, required)
  - prefijo (Text, required)
  - telefono (Text, required)
  - telefonoCompleto (Text, required)
  - source (Text)
  - processed (Boolean, default: false)
  - notes (RichText)
  ```

- [ ] **client-logos** (Logos de Clientes)
  ```
  Campos:
  - name (Text, required)
  - logo (Text, required) // URL de la imagen
  - url (Text) // URL del sitio web del cliente
  - isActive (Boolean, default: true)
  - order (Number, default: 0)
  ```

#### Single Type
- [ ] **site-stat** (Estadísticas del Sitio)
  ```
  Campos:
  - totalAcademies (Number, required, default: 0)
  - activeUsers (Number, required, default: 0)
  - satisfactionRate (Number, required, default: 0)
  - hoursPerMonthSaved (Number, required, default: 0)
  - lastUpdated (DateTime, required)
  ```

### Configuración de Strapi

#### 1. CORS
- [ ] Editar `backend/config/middlewares.ts`
- [ ] Agregar origen del frontend: `http://localhost:4321`
- [ ] Configurar headers permitidos
- [ ] Reiniciar Strapi

#### 2. Permisos (Settings → Roles → Public)
- [ ] **plans**: Habilitar `find` y `findOne`
- [ ] **features**: Habilitar `find`
- [ ] **testimonials**: Habilitar `find`
- [ ] **site-stat**: Habilitar `find`
- [ ] **callback-requests**: Habilitar `create`
- [ ] **client-logos**: Habilitar `find`

#### 3. Datos de Prueba
- [ ] Crear al menos 3 planes de precios
- [ ] Crear al menos 6 características
- [ ] Crear al menos 5 testimonios
- [ ] Configurar estadísticas del sitio
- [ ] Agregar al menos 5 logos de clientes
- [ ] Verificar que `isActive` esté en `true`

### Base de Datos
- [ ] PostgreSQL corriendo (`docker-compose up -d`)
- [ ] Strapi corriendo (`npm run develop`)
- [ ] Panel de admin accesible en `http://localhost:1337/admin`

## Integración - PENDIENTE ⏳

### Probar Servicios
- [ ] Verificar que Strapi esté corriendo
- [ ] Verificar que frontend esté corriendo
- [ ] Probar `getPricingPlans()` desde Astro
- [ ] Probar `getFeatures()` desde Astro
- [ ] Probar `getTestimonials()` desde Astro
- [ ] Probar `getSiteStats()` desde Astro
- [ ] Probar `getClientLogos()` desde Astro
- [ ] Probar `createCallbackRequest()` desde formulario

### Actualizar Componentes Existentes
- [ ] Reemplazar datos hardcodeados en `Pricing.astro`
- [ ] Reemplazar datos hardcodeados en `Features.astro`
- [ ] Reemplazar datos hardcodeados en `Testimonials.astro`
- [ ] Integrar `Stats.astro` con servicio
- [ ] Integrar `CallbackForm.astro` con servicio
- [ ] Integrar logos de clientes si aplica

### Páginas a Actualizar
- [ ] `src/pages/index.astro` - Página principal
- [ ] `src/pages/artes-escenicas.astro`
- [ ] `src/pages/artes-marciales.astro`
- [ ] `src/pages/danzas.astro`
- [ ] `src/pages/deportiva.astro`
- [ ] `src/pages/musica.astro`
- [ ] `src/pages/pre-escolar.astro`

## Testing - PENDIENTE ⏳

### Pruebas Funcionales
- [ ] Verificar que todos los servicios retornen datos
- [ ] Verificar manejo de errores (Strapi apagado)
- [ ] Verificar filtros (testimonios por academyType)
- [ ] Verificar ordenamiento (order field)
- [ ] Verificar que solo items activos se muestren
- [ ] Probar formulario de callback (POST)

### Pruebas de Performance
- [ ] Verificar tiempos de build
- [ ] Verificar tamaño del bundle
- [ ] Verificar que SSG funcione correctamente
- [ ] Verificar que imágenes se optimicen

### Pruebas Cross-Browser
- [ ] Chrome
- [ ] Firefox
- [ ] Safari
- [ ] Edge

## Deployment - PENDIENTE ⏳

### Variables de Entorno (Producción)
- [ ] Crear `.env.production` en frontend
- [ ] Configurar `PUBLIC_API_URL` con URL de producción
- [ ] Configurar `PUBLIC_STRAPI_URL` con URL de producción
- [ ] Configurar variables en plataforma de hosting

### Backend (Strapi)
- [ ] Configurar base de datos PostgreSQL en producción
- [ ] Configurar variables de entorno en servidor
- [ ] Configurar CORS con dominio de producción
- [ ] Deploy a servidor/plataforma

### Frontend (Astro)
- [ ] Configurar variables de entorno en Coolify/hosting
- [ ] Verificar build de producción (`npm run build`)
- [ ] Deploy a plataforma
- [ ] Verificar que la integración funcione en producción

## Documentación - COMPLETADO ✓

- [x] `INTEGRATION_GUIDE.md` - Guía completa de integración
- [x] `src/services/README.md` - Documentación de servicios
- [x] `src/services/EXAMPLES.md` - Ejemplos de implementación
- [x] `SETUP_CHECKLIST.md` - Este checklist
- [ ] Actualizar `README.md` principal del proyecto

## Comandos Útiles

### Backend (Strapi)
```bash
cd backend
docker-compose up -d        # Iniciar PostgreSQL
npm run develop             # Iniciar Strapi con auto-reload
npm run build               # Build del admin panel
```

### Frontend (Astro)
```bash
cd frontend
npm run dev                 # Servidor de desarrollo
npm run build               # Build de producción
npm run preview             # Preview del build
```

### Testing de API (cURL)
```bash
# Probar endpoint de planes
curl http://localhost:1337/api/plans

# Probar endpoint de características
curl http://localhost:1337/api/features

# Probar creación de callback
curl -X POST http://localhost:1337/api/callback-requests \
  -H "Content-Type: application/json" \
  -d '{"data":{"nombre":"Test","prefijo":"+34","telefono":"123456789","telefonoCompleto":"+34123456789"}}'
```

## Notas

### Estado Actual
- **Frontend**: Infraestructura completa de servicios creada ✓
- **Backend**: Pendiente crear Content Types en Strapi
- **Integración**: Pendiente integrar servicios en componentes

### Próximo Paso Recomendado
1. Crear Content Types en Strapi siguiendo las especificaciones
2. Configurar permisos públicos
3. Agregar datos de prueba
4. Probar servicios desde Astro
5. Integrar en componentes existentes

### Recursos
- Guía de integración: `INTEGRATION_GUIDE.md`
- Ejemplos de código: `src/services/EXAMPLES.md`
- Documentación de servicios: `src/services/README.md`
