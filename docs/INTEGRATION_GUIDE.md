# Guía de Integración Frontend-Backend

Esta guía describe la capa completa de servicios creada para integrar el frontend de Astro con el backend de Strapi.

## Resumen

Se ha creado una arquitectura completa de servicios que incluye:

- **Cliente API base** (`src/lib/api.ts`)
- **Interfaces TypeScript** para todas las entidades (`src/types/`)
- **Servicios específicos** por entidad (`src/services/`)
- **Variables de entorno** configuradas
- **Path aliases** en TypeScript para importaciones limpias
- **Documentación completa** con ejemplos de uso

## Estructura de Archivos Creada

```
frontend/
├── .env                        # Variables de entorno (NO commitear)
├── .env.example                # Plantilla de variables de entorno
├── tsconfig.json               # TypeScript con path aliases configurados
├── INTEGRATION_GUIDE.md        # Este archivo
│
└── src/
    ├── lib/
    │   └── api.ts              # Cliente API base
    │       ├── fetchAPI()      # Función principal de fetch
    │       ├── getStrapiURL()  # Constructor de URLs
    │       ├── getStrapiMedia() # Helper para imágenes
    │       └── buildQueryString() # Constructor de query params
    │
    ├── types/
    │   ├── index.ts            # Exportaciones centralizadas
    │   ├── Plan.ts             # Interface de planes de precios
    │   ├── Feature.ts          # Interface de características
    │   ├── Testimonial.ts      # Interface de testimonios
    │   ├── SiteStats.ts        # Interface de estadísticas
    │   ├── CallbackRequest.ts  # Interface de solicitudes
    │   └── ClientLogo.ts       # Interface de logos de clientes
    │
    └── services/
        ├── index.ts            # Exportaciones centralizadas
        ├── README.md           # Documentación de servicios
        ├── EXAMPLES.md         # Ejemplos completos de uso
        ├── plans.ts            # Servicios de planes
        ├── features.ts         # Servicios de características
        ├── testimonials.ts     # Servicios de testimonios
        ├── stats.ts            # Servicios de estadísticas
        ├── callbacks.ts        # Servicios de callbacks
        └── clients.ts          # Servicios de logos de clientes
```

## Variables de Entorno Configuradas

### Desarrollo Local (.env)
```env
PUBLIC_API_URL=http://localhost:1337/api
PUBLIC_STRAPI_URL=http://localhost:1337
```

### Producción
```env
PUBLIC_API_URL=https://api.akdemiapp.com/api
PUBLIC_STRAPI_URL=https://api.akdemiapp.com
```

## Path Aliases Configurados

El archivo `tsconfig.json` ahora incluye path aliases para importaciones limpias:

```typescript
// En lugar de:
import { getPricingPlans } from '../../../services/plans';

// Puedes usar:
import { getPricingPlans } from '@/services';
// o
import { getPricingPlans } from '@/services/plans';
```

### Aliases Disponibles

- `@/*` → `src/*`
- `@/components/*` → `src/components/*`
- `@/layouts/*` → `src/layouts/*`
- `@/lib/*` → `src/lib/*`
- `@/services` → `src/services/index.ts` (exportaciones centralizadas)
- `@/services/*` → `src/services/*` (archivos individuales)
- `@/types` → `src/types/index.ts` (exportaciones centralizadas)
- `@/types/*` → `src/types/*` (archivos individuales)
- `@/assets/*` → `src/assets/*`
- `@/styles/*` → `src/styles/*`

## Servicios Disponibles

### 1. Plans Service
```typescript
import { getPricingPlans, getPricingPlanBySlug } from '@/services';

// Obtener todos los planes activos
const plans = await getPricingPlans();

// Obtener plan específico por slug
const proPlan = await getPricingPlanBySlug('pro');
```

### 2. Features Service
```typescript
import { getFeatures } from '@/services';

const features = await getFeatures();
```

### 3. Testimonials Service
```typescript
import { getTestimonials, getFeaturedTestimonials } from '@/services';

// Todos los testimonios
const allTestimonials = await getTestimonials();

// Filtrados por tipo de academia
const martialArtsTestimonials = await getTestimonials('artes-marciales');

// Solo destacados
const featured = await getFeaturedTestimonials();
```

### 4. Stats Service
```typescript
import { getSiteStats } from '@/services';

const stats = await getSiteStats();
// Returns: { totalAcademies, activeUsers, satisfactionRate, hoursPerMonthSaved, ... }
```

### 5. Callbacks Service
```typescript
import { createCallbackRequest } from '@/services';

const result = await createCallbackRequest({
  nombre: 'Juan Pérez',
  prefijo: '+34',
  telefono: '612345678',
  telefonoCompleto: '+34612345678',
  source: 'landing-page'
});
```

### 6. Clients Service
```typescript
import { getClientLogos } from '@/services';

const clients = await getClientLogos();
```

## Tipos TypeScript Disponibles

Todas las interfaces están disponibles desde `@/types`:

```typescript
import type {
  Plan,
  Feature,
  Testimonial,
  SiteStats,
  CallbackRequest,
  ClientLogo
} from '@/types';

// O importar individualmente:
import type { Plan } from '@/types/Plan';
```

## Ejemplo de Uso en Página Astro

```astro
---
// src/pages/index.astro
import Layout from '@/layouts/Layout.astro';
import { getPricingPlans, getFeatures, getSiteStats } from '@/services';

// Obtener datos en build time (SSG)
const [plans, features, stats] = await Promise.all([
  getPricingPlans(),
  getFeatures(),
  getSiteStats()
]);
---

<Layout title="AkdemiApp">
  <!-- Stats Section -->
  {stats && (
    <section class="stats">
      <div>
        <h3>{stats.totalAcademies}+</h3>
        <p>Academias</p>
      </div>
      <div>
        <h3>{stats.activeUsers}+</h3>
        <p>Usuarios</p>
      </div>
    </section>
  )}

  <!-- Features Section -->
  <section class="features">
    {features.map(feature => (
      <div class="feature-card">
        <i class={feature.icon}></i>
        <h3>{feature.title}</h3>
        <p>{feature.description}</p>
      </div>
    ))}
  </section>

  <!-- Pricing Section -->
  <section class="pricing">
    {plans.map(plan => (
      <div class="plan-card">
        <h3>{plan.name}</h3>
        <p>{plan.description}</p>
        <span class="price">${plan.monthlyPrice}/mes</span>
        <ul>
          {plan.features.map(f => <li>{f}</li>)}
        </ul>
      </div>
    ))}
  </section>
</Layout>
```

## Próximos Pasos

### 1. Configurar Backend (Strapi)

Necesitas crear los siguientes Content Types en Strapi que coincidan con las interfaces:

#### Collection Types:
- **plans** - Planes de precios
- **features** - Características del producto
- **testimonials** - Testimonios de clientes
- **callback-requests** - Solicitudes de callback
- **client-logos** - Logos de clientes

#### Single Type:
- **site-stat** - Estadísticas del sitio

### 2. Configurar CORS en Strapi

Edita `backend/config/middlewares.ts`:

```typescript
export default [
  'strapi::logger',
  'strapi::errors',
  {
    name: 'strapi::security',
    config: {
      contentSecurityPolicy: {
        useDefaults: true,
        directives: {
          'connect-src': ["'self'", 'https:'],
          'img-src': ["'self'", 'data:', 'blob:', 'https:'],
          'media-src': ["'self'", 'data:', 'blob:', 'https:'],
          upgradeInsecureRequests: null,
        },
      },
    },
  },
  {
    name: 'strapi::cors',
    config: {
      origin: ['http://localhost:4321', 'https://akdemiapp.com'],
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
      headers: ['Content-Type', 'Authorization', 'Origin', 'Accept'],
      keepHeaderOnError: true,
    },
  },
  // ... resto de middlewares
];
```

### 3. Configurar Permisos en Strapi

En el panel de administración de Strapi (`http://localhost:1337/admin`):

1. Navega a **Settings → Users & Permissions Plugin → Roles → Public**
2. Habilita los siguientes permisos para acceso público:
   - **plans**: `find`, `findOne`
   - **features**: `find`
   - **testimonials**: `find`
   - **site-stat**: `find`
   - **callback-requests**: `create`
   - **client-logos**: `find`

### 4. Integrar Servicios en Componentes Existentes

Reemplaza los datos hardcodeados en tus componentes actuales con llamadas a los servicios:

```astro
---
// Antes:
const plans = [
  { name: 'Basic', price: 29, ... },
  { name: 'Pro', price: 49, ... },
];

// Después:
import { getPricingPlans } from '@/services';
const plans = await getPricingPlans();
---
```

### 5. Probar la Integración

1. Asegúrate de que Strapi esté corriendo:
   ```bash
   cd backend
   npm run develop
   ```

2. Agrega datos de prueba en Strapi Admin

3. Inicia el servidor de desarrollo de Astro:
   ```bash
   cd frontend
   npm run dev
   ```

4. Verifica que los datos se cargan correctamente en `http://localhost:4321`

### 6. Manejo de Errores en Producción

Para producción, considera agregar:

- **Logging**: Integra un servicio de logging (Sentry, LogRocket)
- **Retry Logic**: Reintentos automáticos en caso de fallo
- **Caching**: Caché de respuestas para mejorar performance
- **Fallbacks**: Datos de respaldo si Strapi no está disponible

## Recursos Adicionales

- **Documentación completa de servicios**: `src/services/README.md`
- **Ejemplos de implementación**: `src/services/EXAMPLES.md`
- **Documentación de Astro 5**: https://docs.astro.build
- **Documentación de Strapi 5**: https://docs.strapi.io

## Notas Importantes

1. **SSG por Defecto**: Los servicios están optimizados para Static Site Generation. Los datos se obtienen en build time.

2. **Datos Dinámicos**: Si necesitas datos en tiempo real, considera:
   - Habilitar SSR en Astro
   - Usar client-side fetching con JavaScript
   - Implementar ISR (Incremental Static Regeneration)

3. **TypeScript Strict**: El proyecto usa TypeScript en modo estricto. Todas las interfaces están tipadas correctamente.

4. **No Modificar Componentes Todavía**: Esta capa de servicios es solo la infraestructura. La integración en componentes se hará posteriormente.

5. **Variables de Entorno**: Recuerda actualizar las URLs en producción en el archivo `.env`.

## Troubleshooting

### Error: "Cannot find module '@/services'"
- Verifica que `tsconfig.json` tenga los path aliases configurados
- Reinicia el servidor de desarrollo de Astro

### Error: "Fetch failed" o datos vacíos
- Verifica que Strapi esté corriendo en `http://localhost:1337`
- Verifica que los Content Types existan en Strapi
- Verifica que los permisos estén configurados correctamente
- Revisa la consola del navegador para más detalles

### Error CORS
- Configura CORS en `backend/config/middlewares.ts`
- Asegúrate de incluir el origen del frontend (`http://localhost:4321`)

### Tipos no reconocidos
- Ejecuta `npm run build` para regenerar los tipos de Astro
- Reinicia tu editor/IDE
