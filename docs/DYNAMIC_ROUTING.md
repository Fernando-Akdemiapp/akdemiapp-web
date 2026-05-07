# Dynamic Routing System - Page Builder

Sistema completo de routing dinámico para AkdemiApp usando Astro 5 y Strapi 5.

## Descripción General

Este sistema permite crear páginas dinámicas en Strapi CMS que se renderizan automáticamente en el frontend sin necesidad de modificar código. Utiliza Static Site Generation (SSG) para pre-renderizar todas las páginas en tiempo de build.

## Arquitectura

```
┌─────────────────────────────────────────────────────────────┐
│                         Strapi CMS                          │
│  (Backend - Content Management)                             │
│                                                              │
│  - Pages Collection Type                                    │
│  - Sections Dynamic Zone                                    │
│  - SEO Component                                            │
└──────────────────┬──────────────────────────────────────────┘
                   │
                   │ API Call (Build Time)
                   │ GET /api/pages
                   │
                   ▼
┌─────────────────────────────────────────────────────────────┐
│                      Astro Frontend                          │
│  (Static Site Generation)                                    │
│                                                              │
│  1. getStaticPaths() fetches all pages                      │
│  2. Generates static HTML for each page                     │
│  3. DynamicPageRenderer maps sections to components         │
└─────────────────────────────────────────────────────────────┘
```

## Componentes Principales

### 1. Catch-All Route (`src/pages/[...slug].astro`)

Ruta dinámica que captura todas las páginas creadas en Strapi.

**Características:**
- Usa `getStaticPaths()` para generar rutas en build time
- Fetch páginas desde Strapi usando `getPages()`
- Renderiza dinámicamente usando `DynamicPageRenderer`
- Incluye SEO metadata completo
- Maneja 404 para páginas no encontradas

**Ejemplo de uso:**
```typescript
// Una página con slug "academia-musica" en Strapi
// se convierte en la URL: /academia-musica
```

### 2. Dynamic Page Renderer (`src/components/DynamicPageRenderer.astro`)

Componente que renderiza sections dinámicamente.

**Características:**
- Itera sobre el array `sections`
- Mapea cada section a su componente usando `componentRegistry`
- Pasa props dinámicamente a cada componente
- Maneja errores para componentes desconocidos
- Muestra mensajes de error informativos en desarrollo

**Ejemplo de uso:**
```astro
<DynamicPageRenderer sections={page.sections} />
```

### 3. Component Registry (`src/lib/componentRegistry.ts`)

Mapeo entre identificadores de Strapi y componentes Astro.

**Componentes registrados:**
- `sections.hero-section` → Hero.astro
- `sections.use-case-hero-section` → UseCaseHero.astro
- `sections.features-section` → Features.astro
- `sections.use-case-features-section` → UseCaseFeatures.astro
- `sections.pricing-section` → Pricing.astro
- `sections.cta-section` → CTA.astro
- `sections.callback-form-section` → CallbackForm.astro
- `sections.testimonial-feature-section` → TestimonialFeature.astro
- `sections.logo-carousel-section` → LogoCarousel.astro

## Flujo de Datos

```
1. Build Time
   ├─ getStaticPaths() ejecuta
   ├─ getPages() fetch desde Strapi
   ├─ Para cada página:
   │  ├─ Crea ruta estática
   │  ├─ Renderiza sections con DynamicPageRenderer
   │  └─ Genera HTML estático
   └─ Build completo

2. Runtime
   ├─ Usuario visita /academia-musica
   ├─ Servidor devuelve HTML pre-renderizado
   └─ No hay fetch de datos en runtime (SSG)
```

## Estructura de Tipos

### Page Interface

```typescript
interface Page {
  id: number;
  slug: string;
  title: string;
  description?: string;
  academyType: AcademyType;
  isActive: boolean;
  order: number;
  sections: Section[];
  seo?: SEO;
  publishedAt: string | null;
  createdAt: string;
  updatedAt: string;
}
```

### Section Types

Todas las sections extienden de `BaseSection`:

```typescript
interface BaseSection {
  __component: string;  // Identificador único (ej: 'sections.hero-section')
  id: number;
}
```

Ejemplo de section específica:

```typescript
interface HeroSection extends BaseSection {
  __component: 'sections.hero-section';
  title: string;
  subtitle: string;
  description: string;
  ctaText: string;
  ctaLink: string;
  // ... más campos
}
```

### SEO Interface

```typescript
interface SEO {
  metaTitle: string;
  metaDescription: string;
  keywords?: string;
  metaRobots?: string;
  structuredData?: Record<string, any>;
  metaViewport?: string;
  canonicalURL?: string;
  metaImage?: StrapiMedia | null;
  metaSocial?: MetaSocial[];
}
```

## Cómo Crear una Nueva Página

### En Strapi (Backend)

1. Navegar a **Content Manager → Pages**
2. Hacer click en **Create new entry**
3. Rellenar campos básicos:
   ```
   Title: Academia de Música
   Slug: academia-musica
   Academy Type: musica
   Is Active: true
   Order: 1
   ```
4. Agregar sections en el Dynamic Zone:
   - Hero Section
   - Features Section
   - Pricing Section
   - CTA Section
5. Configurar SEO metadata
6. **Publish** la página

### En el Frontend (Automático)

1. Ejecutar build:
   ```bash
   npm run build
   ```
2. La página se genera automáticamente en `/academia-musica`
3. No se requiere código adicional

## Agregar un Nuevo Tipo de Section

### 1. Crear el Componente Astro

```astro
<!-- src/components/sections/NewSection.astro -->
---
import type { NewSection } from '@/types';

interface Props extends NewSection {}

const { title, description } = Astro.props;
---

<section class="py-16">
  <h2>{title}</h2>
  <p>{description}</p>
</section>
```

### 2. Definir el Tipo TypeScript

```typescript
// src/types/Page.ts

export interface NewSection extends BaseSection {
  __component: 'sections.new-section';
  title: string;
  description: string;
}

// Agregar al union type
export type Section =
  | HeroSection
  | NewSection  // ← Agregar aquí
  | FeaturesSection
  // ... resto de sections
```

### 3. Registrar en Component Registry

```typescript
// src/lib/componentRegistry.ts

import NewSection from '@/components/sections/NewSection.astro';

export const componentRegistry = {
  'sections.hero-section': HeroSection,
  'sections.new-section': NewSection,  // ← Agregar aquí
  // ... resto de componentes
} as const;
```

### 4. Crear en Strapi Content-Type Builder

1. Ir a **Content-Type Builder**
2. Editar **Page** collection type
3. Editar **Sections** Dynamic Zone
4. Crear nuevo componente **sections.new-section**
5. Agregar campos necesarios
6. Save y reiniciar Strapi

## Manejo de Errores

### Componente no encontrado

Si un section tiene un `__component` no registrado:

```html
<!-- DynamicPageRenderer muestra: -->
<div class="bg-red-50 border border-red-200 ...">
  <p>Component Not Found</p>
  <code>sections.unknown-component</code>
  <details>
    <!-- JSON del section para debugging -->
  </details>
</div>
```

### Página no encontrada

Si una página no existe en Strapi pero se intenta acceder:

```typescript
// [...slug].astro redirige a:
return Astro.redirect('/404');
```

### API Error (Build Time)

Si Strapi no está disponible durante el build:

```typescript
// getPages() retorna array vacío
// Build continúa sin páginas dinámicas
console.warn('[...slug].astro: No pages returned from getPages()');
```

## SEO y Metadata

Cada página incluye:

### Meta Tags Básicos
- `<title>` - De `seo.metaTitle` o `page.title`
- `<meta name="description">` - De `seo.metaDescription`
- `<link rel="canonical">` - De `seo.canonicalURL`

### Open Graph
- `og:title`, `og:description`, `og:image`
- Personalizable por página

### Twitter Cards
- `twitter:title`, `twitter:description`, `twitter:image`
- Personalizable por página

### Structured Data (JSON-LD)
```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "AkdemiApp",
  ...
}
</script>
```

## Performance

### Build Time
- Pre-renderiza todas las páginas
- Genera HTML estático optimizado
- No hay fetch de datos en runtime

### Runtime
- HTML estático servido instantáneamente
- Sin JavaScript para data fetching
- SEO perfecto (contenido en HTML inicial)

### Rebuild Triggers
Cambios en Strapi requieren rebuild:
```bash
npm run build
```

Para automatizar:
- Configurar webhooks en Strapi
- Trigger rebuild en CI/CD (GitHub Actions, Vercel, etc.)

## Testing

### Verificar Build
```bash
npm run build
```

### Preview Local
```bash
npm run preview
```

### Verificar Rutas Generadas
```bash
ls -la dist/[pageslug]/index.html
```

### Check Console Logs
Durante el build, verás:
```
[...slug].astro: Generating 5 static page(s)
  → Generating page: /academia-musica (Academia de Música)
  → Generating page: /academia-danzas (Academia de Danzas)
  ...
```

## Troubleshooting

### Problem: Páginas no se generan

**Solución:**
1. Verificar que `isActive: true` en Strapi
2. Verificar que la página está publicada
3. Check console logs durante build
4. Verificar que Strapi está corriendo

### Problem: Section no renderiza

**Solución:**
1. Verificar que el componente está registrado en `componentRegistry`
2. Verificar que el `__component` coincide exactamente
3. Check console para errores de component

### Problem: SEO metadata no aparece

**Solución:**
1. Verificar que `seo` está populated en la API call
2. Check que `seo` component está configurado en Strapi
3. Verificar fallbacks en `[...slug].astro`

### Problem: Build falla con error de API

**Solución:**
1. Iniciar Strapi backend:
   ```bash
   cd ../backend
   npm run develop
   ```
2. Verificar `PUBLIC_API_URL` en `.env`
3. Verificar que endpoints están accesibles

## Best Practices

1. **Siempre usar path aliases:**
   ```typescript
   // ✅ Correcto
   import { getPages } from '@/services';

   // ❌ Incorrecto
   import { getPages } from '../../services';
   ```

2. **Validar sections:**
   ```typescript
   import { validateSections } from '@/lib/componentRegistry';

   if (!validateSections(sections)) {
     console.error('Invalid sections detected');
   }
   ```

3. **Fallbacks para SEO:**
   ```typescript
   const metaTitle = seo?.metaTitle || title;
   const metaDescription = seo?.metaDescription || description || '';
   ```

4. **TypeScript estricto:**
   - Usar interfaces para todos los props
   - No usar `any` types
   - Aprovechar type safety del registry

5. **Error boundaries:**
   - Componentes muestran UI de error, no crashean
   - Logs informativos para debugging
   - Fallback states para contenido vacío

## Próximos Pasos

### Mejoras Futuras

1. **Incremental Static Regeneration (ISR)**
   - On-demand revalidation
   - Webhooks desde Strapi

2. **Preview Mode**
   - Preview de páginas no publicadas
   - Authentication para previews

3. **A/B Testing**
   - Variants de sections
   - Analytics integration

4. **Dynamic Islands**
   - Interactive sections con Astro Islands
   - Progressive enhancement

## Referencias

- [Astro Documentation](https://docs.astro.build)
- [Strapi Documentation](https://docs.strapi.io)
- [Component Registry Pattern](https://docs.astro.build/en/core-concepts/astro-components/)
- [Static Site Generation](https://docs.astro.build/en/core-concepts/routing/#static-ssg-mode)
