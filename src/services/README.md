# Services Layer Documentation

Esta capa proporciona la integración completa entre el frontend de Astro y el backend de Strapi.

## Estructura

```
src/
├── lib/
│   └── api.ts              # Cliente API base con funciones helper
├── types/
│   ├── Plan.ts             # Interfaces para planes de precios
│   ├── Feature.ts          # Interfaces para características
│   ├── Testimonial.ts      # Interfaces para testimonios
│   ├── SiteStats.ts        # Interfaces para estadísticas del sitio
│   ├── CallbackRequest.ts  # Interfaces para solicitudes de callback
│   ├── ClientLogo.ts       # Interfaces para logos de clientes
│   └── index.ts            # Exportaciones centralizadas
└── services/
    ├── plans.ts            # Servicios para planes de precios
    ├── features.ts         # Servicios para características
    ├── testimonials.ts     # Servicios para testimonios
    ├── stats.ts            # Servicios para estadísticas
    ├── callbacks.ts        # Servicios para callbacks
    ├── clients.ts          # Servicios para logos de clientes
    └── index.ts            # Exportaciones centralizadas
```

## Cliente API Base (`lib/api.ts`)

### Funciones Principales

#### `fetchAPI<T>(path: string, options?: FetchAPIOptions)`
Función base para realizar peticiones a Strapi.

**Parámetros:**
- `path`: Ruta del endpoint (ej: `/plans`)
- `options`: Opciones de fetch (método, body, headers)

**Retorna:** `Promise<StrapiResponse<T> | null>`

**Ejemplo:**
```typescript
import { fetchAPI } from '@/lib/api';

const response = await fetchAPI('/plans');
```

#### `getStrapiURL(path?: string)`
Construye la URL completa de Strapi.

**Ejemplo:**
```typescript
import { getStrapiURL } from '@/lib/api';

const url = getStrapiURL('/api/plans');
// Returns: http://localhost:1337/api/plans
```

#### `getStrapiMedia(url: string)`
Convierte URLs relativas de medios a URLs absolutas.

**Ejemplo:**
```typescript
import { getStrapiMedia } from '@/lib/api';

const imageUrl = getStrapiMedia('/uploads/logo.png');
// Returns: http://localhost:1337/uploads/logo.png
```

#### `buildQueryString(params: Record<string, any>)`
Construye query strings para filtros de Strapi.

**Ejemplo:**
```typescript
import { buildQueryString } from '@/lib/api';

const query = buildQueryString({
  filters: { isActive: true },
  sort: 'order:asc'
});
// Returns: ?filters=%7B%22isActive%22%3Atrue%7D&sort=order%3Aasc
```

## Servicios

### Plans Service (`services/plans.ts`)

#### `getPricingPlans()`
Obtiene todos los planes de precios activos, ordenados por el campo `order`.

**Retorna:** `Promise<Plan[]>`

**Ejemplo de uso en Astro:**
```astro
---
import { getPricingPlans } from '@/services';

const plans = await getPricingPlans();
---

<section>
  {plans.map(plan => (
    <div>
      <h3>{plan.name}</h3>
      <p>${plan.monthlyPrice}/mes</p>
    </div>
  ))}
</section>
```

#### `getPricingPlanBySlug(slug: string)`
Obtiene un plan específico por su slug.

**Ejemplo:**
```typescript
const proPlan = await getPricingPlanBySlug('pro');
```

### Features Service (`services/features.ts`)

#### `getFeatures()`
Obtiene todas las características activas, ordenadas por `order`.

**Ejemplo:**
```astro
---
import { getFeatures } from '@/services';

const features = await getFeatures();
---

<div class="features-grid">
  {features.map(feature => (
    <div>
      <i class={feature.icon}></i>
      <h4>{feature.title}</h4>
      <p>{feature.description}</p>
      {feature.badge && <span class="badge">{feature.badge}</span>}
    </div>
  ))}
</div>
```

### Testimonials Service (`services/testimonials.ts`)

#### `getTestimonials(academyType?: string)`
Obtiene testimonios, opcionalmente filtrados por tipo de academia.

**Parámetros:**
- `academyType`: Tipo de academia (ej: 'artes-escenicas', 'deportiva')

**Ejemplo:**
```astro
---
const testimonials = await getTestimonials('artes-marciales');
---
```

#### `getFeaturedTestimonials()`
Obtiene solo los testimonios destacados.

### Stats Service (`services/stats.ts`)

#### `getSiteStats()`
Obtiene las estadísticas del sitio (Single Type en Strapi).

**Retorna:** `Promise<SiteStats | null>`

**Ejemplo:**
```astro
---
import { getSiteStats } from '@/services';

const stats = await getSiteStats();
---

{stats && (
  <div class="stats-section">
    <div>
      <h3>{stats.totalAcademies}+</h3>
      <p>Academias</p>
    </div>
    <div>
      <h3>{stats.activeUsers}+</h3>
      <p>Usuarios Activos</p>
    </div>
    <div>
      <h3>{stats.satisfactionRate}%</h3>
      <p>Satisfacción</p>
    </div>
  </div>
)}
```

### Callbacks Service (`services/callbacks.ts`)

#### `createCallbackRequest(data: CallbackRequest)`
Crea una nueva solicitud de callback (POST).

**Ejemplo en componente interactivo:**
```typescript
import { createCallbackRequest } from '@/services';

async function handleSubmit(formData: FormData) {
  const result = await createCallbackRequest({
    nombre: formData.get('nombre') as string,
    prefijo: formData.get('prefijo') as string,
    telefono: formData.get('telefono') as string,
    telefonoCompleto: `${prefijo}${telefono}`,
    source: 'landing-page'
  });

  if (result) {
    console.log('Callback request created:', result.id);
  }
}
```

### Clients Service (`services/clients.ts`)

#### `getClientLogos()`
Obtiene todos los logos de clientes activos, ordenados por `order`.

**Ejemplo:**
```astro
---
import { getClientLogos } from '@/services';

const clients = await getClientLogos();
---

<div class="clients-grid">
  {clients.map(client => (
    <a href={client.url} target="_blank" rel="noopener">
      <img src={client.logo} alt={client.name} />
    </a>
  ))}
</div>
```

## Tipos TypeScript

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
```

### Interfaces Principales

- **Plan**: Planes de suscripción con precios mensuales/anuales
- **Feature**: Características del producto
- **Testimonial**: Testimonios de clientes con calificación
- **SiteStats**: Estadísticas globales del sitio
- **CallbackRequest**: Datos para solicitudes de callback
- **ClientLogo**: Logos de clientes/empresas

## Variables de Entorno

Asegúrate de configurar las variables de entorno en `.env`:

```env
PUBLIC_API_URL=http://localhost:1337/api
PUBLIC_STRAPI_URL=http://localhost:1337
```

Para producción:
```env
PUBLIC_API_URL=https://api.akdemiapp.com/api
PUBLIC_STRAPI_URL=https://api.akdemiapp.com
```

## Manejo de Errores

Todos los servicios manejan errores internamente y retornan:
- Arrays vacíos `[]` en caso de error (para funciones que retornan listas)
- `null` en caso de error (para funciones que retornan un elemento único)

Esto permite usar los servicios de forma segura sin try-catch adicionales:

```astro
---
const plans = await getPricingPlans(); // Siempre retorna array, nunca undefined
const stats = await getSiteStats(); // Retorna SiteStats | null
---

{plans.length > 0 && (
  <div>Plans available!</div>
)}

{stats && (
  <div>{stats.totalAcademies} academies</div>
)}
```

## SSG (Static Site Generation)

Todos los servicios están optimizados para funcionar en build time con Astro:

- Las llamadas se realizan durante el build
- Los datos se embeben en el HTML estático
- No hay llamadas API en el cliente (por defecto)

Para datos dinámicos, considera usar:
- Server-Side Rendering (SSR) de Astro
- Client-side fetching con JavaScript
- Incremental Static Regeneration (ISR) con adaptadores

## Próximos Pasos

1. **Backend**: Crear Content Types en Strapi que coincidan con estas interfaces
2. **Frontend**: Integrar servicios en componentes/páginas existentes
3. **Validación**: Probar cada endpoint con datos reales
4. **Optimización**: Agregar caché y manejo avanzado de errores según necesidades

## Notas Importantes

- Todos los endpoints usan el formato REST de Strapi 5
- Las respuestas incluyen paginación automática (max 100 items)
- Los filtros y ordenamiento usan la sintaxis de Strapi Query Engine
- Las imágenes se procesan automáticamente con `getStrapiMedia()`
