# Examples - Dynamic Routing System

Ejemplos prácticos de uso del sistema de routing dinámico.

## Ejemplo 1: Crear una Página Simple

### En Strapi

1. **Crear nueva página:**
   - Navegar a Content Manager → Pages → Create new entry

2. **Completar campos básicos:**
   ```yaml
   Title: Academia de Música Premium
   Slug: academia-musica-premium
   Description: Software especializado para academias de música
   Academy Type: musica
   Is Active: true
   Order: 1
   ```

3. **Agregar Hero Section:**
   ```yaml
   Component: sections.hero-section
   Title: "Transforma tu Academia de Música"
   Subtitle: "Software todo-en-uno para gestión musical"
   Description: "Gestiona alumnos, horarios, pagos y más desde una sola plataforma"
   CTA Text: "Solicitar Demo"
   CTA Link: "#callback"
   Show Stats: true
   ```

4. **Configurar SEO:**
   ```yaml
   Meta Title: "Software para Academias de Música | AkdemiApp"
   Meta Description: "Gestiona tu academia de música con AkdemiApp. Control de alumnos, profesores, pagos, horarios y más."
   Keywords: "software academias musica, gestion escuelas musica"
   Canonical URL: "/academia-musica-premium"
   ```

5. **Publish**

### Resultado

La página se generará automáticamente en:
- URL: `https://tudominio.com/academia-musica-premium`
- HTML pre-renderizado en build time
- SEO completo incluido

## Ejemplo 2: Página con Múltiples Sections

### Configuración en Strapi

```yaml
Page:
  Title: Academia de Danzas Profesional
  Slug: academia-danzas-pro
  Academy Type: danzas

Sections:
  # 1. Hero Section
  - Component: sections.use-case-hero-section
    Title: "Eleva tu Academia de Danzas"
    Subtitle: "Gestión profesional para escuelas de baile"
    Badge: "Especializado en Danzas"
    Icon: "🩰"
    Accent Color: "#FF6B9D"

  # 2. Features Section
  - Component: sections.use-case-features-section
    Benefits Title: "¿Por qué elegir AkdemiApp?"
    Benefits:
      - Icon: "users"
        Title: "Gestión de Alumnos"
        Description: "Control completo de inscripciones y progreso"
      - Icon: "calendar"
        Title: "Horarios Inteligentes"
        Description: "Evita conflictos automáticamente"

  # 3. Testimonial Feature
  - Component: sections.testimonial-feature-section
    Position: left
    Title: "Resultados Reales"
    Features:
      - Icon: "check"
        Title: "50% menos tiempo administrativo"
    Testimonial:
      Quote: "Ahorramos 10 horas semanales en administración"
      Author: "María González"
      Role: "Directora, Academia de Ballet"

  # 4. Pricing Section
  - Component: sections.pricing-section
    Section Title: "Planes diseñados para ti"
    Show Toggle: true

  # 5. CTA Section
  - Component: sections.cta-section
    Title: "¿Listo para transformar tu academia?"
    Primary Button Text: "Empezar Ahora"
    Show Stats: true
```

### Frontend (Automático)

El sistema renderiza automáticamente:

```html
<!-- /academia-danzas-pro -->
<!DOCTYPE html>
<html>
<head>
  <title>Academia de Danzas Profesional | AkdemiApp</title>
  <meta name="description" content="...">
  <!-- Full SEO metadata -->
</head>
<body>
  <nav><!-- Navbar --></nav>
  <main>
    <!-- UseCaseHero component -->
    <section>...</section>

    <!-- UseCaseFeatures component -->
    <section>...</section>

    <!-- TestimonialFeature component -->
    <section>...</section>

    <!-- Pricing component -->
    <section>...</section>

    <!-- CTA component -->
    <section>...</section>
  </main>
  <footer><!-- Footer --></footer>
</body>
</html>
```

## Ejemplo 3: Página Landing Personalizada

### Use Case: Academia de Artes Marciales

```yaml
Page:
  Title: Academia de Artes Marciales Elite
  Slug: artes-marciales-elite
  Academy Type: artes-marciales

Sections:
  - Component: sections.hero-section
    Title: "Domina tu Dojo Digital"
    Subtitle: "Software de gestión para artes marciales"
    Badge: "🥋 Especializado"
    CTA Text: "Solicitar Demo Gratuita"
    Secondary CTA Text: "Ver Video"
    Show Stats: true

  - Component: sections.features-section
    Section Title: "Funcionalidades Clave"
    Badge: "Características"
    Features:
      - Icon: "award"
        Title: "Sistema de Cinturones"
        Description: "Seguimiento automático de progresos y exámenes"
        Badge: "Popular"
      - Icon: "users-2"
        Title: "Gestión de Competencias"
        Description: "Organiza torneos y llaves de competición"
      - Icon: "video"
        Title: "Clases Online"
        Description: "Integración con Zoom y Google Meet"
    Show CTA: true
    CTA Title: "¿Quieres saber más?"
    CTA Button Text: "Agendar Demo"

  - Component: sections.logo-carousel-section
    Title: "Dojos que confían en nosotros"
    Badge Text: "Más de 500 academias"
    Trust Indicator Text: "Utilizado por instructores certificados"
    Animation Speed: 30

  - Component: sections.callback-form-section
    Form Title: "Agenda una Demo Personalizada"
    Form Description: "Descubre cómo AkdemiApp transforma tu dojo"
    Submit Button Text: "Solicitar Demo"
    Phone Prefixes:
      - value: "+34"
        label: "España (+34)"
      - value: "+52"
        label: "México (+52)"

SEO:
  Meta Title: "Software para Dojos y Academias de Artes Marciales"
  Meta Description: "Sistema completo de gestión para tu academia de artes marciales. Gestiona cinturones, pagos, horarios, competencias y más."
  Keywords: "software artes marciales, gestion dojo, sistema karate"
  Structured Data:
    "@type": "SoftwareApplication"
    "name": "AkdemiApp"
    "applicationCategory": "BusinessApplication"
    "offers":
      "@type": "Offer"
      "price": "29"
      "priceCurrency": "EUR"
```

## Ejemplo 4: A/B Testing con Páginas Alternativas

### Página A: Foco en Precio

```yaml
Slug: academia-musica-precio
Sections:
  - Hero (énfasis en "Desde 29€/mes")
  - Pricing (destacado)
  - Features (breve)
  - CTA
```

### Página B: Foco en Características

```yaml
Slug: academia-musica-features
Sections:
  - Hero (énfasis en funcionalidades)
  - Features (extenso)
  - Testimonials
  - Pricing
  - CTA
```

### Implementación en Frontend

```astro
---
// Ambas páginas se generan automáticamente
// No requiere código adicional

// Para analytics:
const pageVariant = slug.includes('precio') ? 'A' : 'B';
---

<script define:vars={{ pageVariant }}>
  // Track variant
  gtag('event', 'page_view', {
    page_variant: pageVariant
  });
</script>
```

## Ejemplo 5: Página Multi-idioma (Preparación)

### Estructura para i18n

```yaml
# Página en español
Slug: academia-musica
Title: "Academia de Música"

# Página en inglés (futura)
Slug: en/music-academy
Title: "Music Academy"
```

### En componentRegistry (futuro)

```typescript
export function getComponentForSection(section: Section, locale = 'es') {
  // Componentes localizados
  const localizedKey = `${section.__component}-${locale}`;
  return componentRegistry[localizedKey] || componentRegistry[section.__component];
}
```

## Ejemplo 6: Página con Dynamic Islands

### Configuración

```yaml
Page:
  Slug: academia-deportiva-interactiva

Sections:
  - Component: sections.hero-section
    # ... normal hero

  - Component: sections.features-section
    # Features con componentes interactivos

  # Future: Interactive pricing calculator
  - Component: sections.pricing-calculator
    Client Directive: "client:load"
    Interactive: true
```

### Component con Island

```astro
<!-- src/components/sections/PricingCalculator.astro -->
---
import PricingCalculatorIsland from './PricingCalculatorIsland';
---

<section>
  <!-- Static content -->
  <h2>Calcula tu Plan Ideal</h2>

  <!-- Interactive island -->
  <PricingCalculatorIsland client:load />
</section>
```

## Ejemplo 7: Custom Section Types

### 1. Crear Componente

```astro
<!-- src/components/sections/VideoDemo.astro -->
---
import type { VideoDemoSection } from '@/types';

interface Props extends VideoDemoSection {}

const {
  title,
  videoUrl,
  thumbnail,
  ctaText,
  ctaLink
} = Astro.props;
---

<section class="py-16 bg-gray-50">
  <div class="container mx-auto px-4">
    <h2 class="text-3xl font-bold text-center mb-8">
      {title}
    </h2>

    <div class="max-w-4xl mx-auto">
      <!-- Video embed -->
      <div class="aspect-video rounded-lg overflow-hidden shadow-xl">
        {videoUrl.includes('youtube') ? (
          <iframe
            src={videoUrl}
            class="w-full h-full"
            allow="accelerometer; autoplay; encrypted-media; gyroscope"
            allowfullscreen
          />
        ) : (
          <video
            src={videoUrl}
            poster={thumbnail?.url}
            controls
            class="w-full h-full"
          />
        )}
      </div>

      {ctaText && (
        <div class="text-center mt-8">
          <a
            href={ctaLink}
            class="inline-block bg-primary text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary/90"
          >
            {ctaText}
          </a>
        </div>
      )}
    </div>
  </div>
</section>
```

### 2. Agregar Tipo

```typescript
// src/types/Page.ts

export interface VideoDemoSection extends BaseSection {
  __component: 'sections.video-demo-section';
  title: string;
  videoUrl: string;
  thumbnail?: StrapiMedia | null;
  ctaText?: string;
  ctaLink?: string;
}

// Agregar al union
export type Section =
  | HeroSection
  | VideoDemoSection  // ← Nueva section
  | FeaturesSection
  // ...
```

### 3. Registrar

```typescript
// src/lib/componentRegistry.ts

import VideoDemoSection from '@/components/sections/VideoDemo.astro';

export const componentRegistry = {
  'sections.hero-section': HeroSection,
  'sections.video-demo-section': VideoDemoSection,  // ← Registrar
  // ...
} as const;
```

### 4. Crear en Strapi

Content-Type Builder:
```yaml
Component: sections.video-demo-section
Fields:
  - title: Text (required)
  - videoUrl: Text (required, format: URL)
  - thumbnail: Media (single image)
  - ctaText: Text
  - ctaLink: Text
```

### 5. Usar en Página

```yaml
Sections:
  - Component: sections.video-demo-section
    Title: "Ve AkdemiApp en Acción"
    Video URL: "https://youtube.com/watch?v=..."
    CTA Text: "Probar Gratis"
    CTA Link: "#callback"
```

## Ejemplo 8: Página con Datos Externos

### FAQ Section con API

```astro
<!-- src/components/sections/FAQ.astro -->
---
import type { FAQSection } from '@/types';
import { getFAQs } from '@/services';

interface Props extends FAQSection {}

const { categoryId, showPopular } = Astro.props;

// Fetch FAQs at build time
const faqs = await getFAQs(categoryId, showPopular);
---

<section class="py-16">
  <div class="container mx-auto px-4">
    <h2 class="text-3xl font-bold mb-8">Preguntas Frecuentes</h2>

    <div class="space-y-4 max-w-3xl mx-auto">
      {faqs.map((faq) => (
        <details class="bg-white rounded-lg shadow p-6">
          <summary class="font-semibold cursor-pointer">
            {faq.question}
          </summary>
          <p class="mt-4 text-gray-600">
            {faq.answer}
          </p>
        </details>
      ))}
    </div>
  </div>
</section>
```

### Service

```typescript
// src/services/faqs.ts

import { fetchAPI } from '@/lib/api';
import type { FAQ, StrapiFAQ } from '@/types';

export async function getFAQs(
  categoryId?: number,
  showPopular: boolean = false
): Promise<FAQ[]> {
  try {
    const filters: any = {};

    if (categoryId) {
      filters.category = { id: { $eq: categoryId } };
    }

    if (showPopular) {
      filters.isPopular = { $eq: true };
    }

    const query = buildStrapiQuery({
      filters,
      sort: ['order:asc'],
    });

    const response = await fetchAPI<StrapiFAQ[]>(`/faqs${query}`);

    return response.data.map(transformFAQ);
  } catch (error) {
    console.error('Error fetching FAQs:', error);
    return [];
  }
}
```

## Ejemplo 9: Preview Mode (Próximamente)

### Backend: Preview Token

```typescript
// strapi/src/api/page/controllers/page.ts

export default {
  async preview(ctx) {
    const { slug, token } = ctx.query;

    // Validate preview token
    if (token !== process.env.PREVIEW_TOKEN) {
      return ctx.unauthorized();
    }

    // Return unpublished page
    const page = await strapi.db.query('api::page.page').findOne({
      where: { slug },
      populate: { sections: true, seo: true },
    });

    return page;
  }
};
```

### Frontend: Preview Route

```astro
<!-- src/pages/preview/[...slug].astro -->
---
import { getPageBySlug } from '@/services';

// Validate preview token
const token = Astro.url.searchParams.get('token');
const validToken = import.meta.env.PREVIEW_TOKEN;

if (token !== validToken) {
  return Astro.redirect('/404');
}

// Fetch draft page
const { slug } = Astro.params;
const page = await getPageBySlug(slug, { draft: true });

if (!page) {
  return Astro.redirect('/404');
}
---

<!-- Preview banner -->
<div class="bg-yellow-400 text-black px-4 py-2 text-center font-semibold">
  🔍 Preview Mode - Esta página no está publicada
</div>

<!-- Render page normally -->
<DynamicPageRenderer sections={page.sections} />
```

## Ejemplo 10: Webhook para Auto-Deploy

### Strapi: Lifecycle Hook

```typescript
// backend/src/api/page/content-types/page/lifecycles.ts

export default {
  async afterUpdate(event) {
    const { result } = event;

    // Si la página se publicó, trigger rebuild
    if (result.publishedAt) {
      await fetch(process.env.DEPLOY_WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          event: 'page.published',
          slug: result.slug,
        }),
      });

      console.log(`Deploy triggered for page: ${result.slug}`);
    }
  },
};
```

### CI/CD: GitHub Actions

```yaml
# .github/workflows/deploy-on-webhook.yml

name: Deploy on Content Update

on:
  repository_dispatch:
    types: [page-published]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: 18
      - run: cd frontend && npm ci
      - run: cd frontend && npm run build
      - uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./frontend/dist
```

## Recursos

- Ver `DYNAMIC_ROUTING.md` para documentación completa
- Ver `TESTING_GUIDE.md` para guías de testing
- [Strapi Dynamic Zones](https://docs.strapi.io/dev-docs/backend-customization/components)
- [Astro getStaticPaths](https://docs.astro.build/en/reference/api-reference/#getstaticpaths)
