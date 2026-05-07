# Page Builder Usage Examples

## Overview

The Page Builder system consists of:
1. **Page Types** (`src/types/Page.ts`) - TypeScript interfaces for pages, sections, and SEO
2. **Pages Service** (`src/services/pages.ts`) - Functions to fetch page data from Strapi
3. **Component Registry** (`src/lib/componentRegistry.ts`) - Maps Strapi components to Astro components

## Basic Usage

### 1. Fetch a Single Page by Slug

```astro
---
// src/pages/[slug].astro
import { getPageBySlug } from '@/services';
import { getComponentForSection } from '@/lib/componentRegistry';
import Layout from '@/layouts/Layout.astro';

export async function getStaticPaths() {
  const { getPageSlugs } = await import('@/services');
  const slugs = await getPageSlugs();

  return slugs.map((slug) => ({
    params: { slug },
  }));
}

const { slug } = Astro.params;
const page = await getPageBySlug(slug);

if (!page) {
  return Astro.redirect('/404');
}
---

<Layout
  title={page.seo?.metaTitle || page.title}
  description={page.seo?.metaDescription || page.description}
>
  {page.sections.map((section) => {
    const Component = getComponentForSection(section);

    if (!Component) {
      return null;
    }

    return <Component {...section} />;
  })}
</Layout>
```

### 2. Fetch All Pages

```astro
---
// src/pages/pages-list.astro
import { getPages } from '@/services';
import Layout from '@/layouts/Layout.astro';

const pages = await getPages();
---

<Layout title="All Pages">
  <h1>Available Pages</h1>
  <ul>
    {pages.map((page) => (
      <li>
        <a href={`/${page.slug}`}>
          {page.title}
          {page.academyType !== 'generic' && (
            <span class="badge">{page.academyType}</span>
          )}
        </a>
      </li>
    ))}
  </ul>
</Layout>
```

### 3. Using getStaticPaths for Dynamic Routes

```astro
---
// src/pages/academy/[type]/[slug].astro
import { getPages } from '@/services';
import type { AcademyType } from '@/types';

export async function getStaticPaths() {
  const pages = await getPages();

  return pages
    .filter((page) => page.academyType !== 'generic')
    .map((page) => ({
      params: {
        type: page.academyType,
        slug: page.slug,
      },
      props: { page },
    }));
}

const { page } = Astro.props;
---

<h1>{page.title}</h1>
<p>Academy Type: {page.academyType}</p>
```

## Component Registry

### Available Sections

The component registry maps these Strapi component names to Astro components:

| Strapi Component Name | Astro Component | Description |
|-----------------------|-----------------|-------------|
| `sections.hero-section` | `Hero.astro` | Main hero with stats and CTA |
| `sections.use-case-hero-section` | `UseCaseHero.astro` | Academy-specific hero |
| `sections.features-section` | `Features.astro` | Features grid |
| `sections.use-case-features-section` | `UseCaseFeatures.astro` | Academy-specific features |
| `sections.pricing-section` | `Pricing.astro` | Pricing plans |
| `sections.cta-section` | `CTA.astro` | Call-to-action section |
| `sections.callback-form-section` | `CallbackForm.astro` | Callback form |
| `sections.testimonials-section` | `TestimonialsSection.astro` | Testimonials (to be created) |
| `sections.logo-carousel-section` | `LogoCarousel.astro` | Client logos carousel |
| `sections.testimonial-feature-section` | `TestimonialFeature.astro` | Feature with testimonial |

### Validate Sections

```typescript
import { validateSections } from '@/lib/componentRegistry';
import type { Section } from '@/types';

const sections: Section[] = [
  {
    id: 1,
    __component: 'sections.hero-section',
    title: 'Welcome',
    // ... other fields
  },
];

const isValid = validateSections(sections);
// Returns true if all sections have registered components
```

### Check if Component is Registered

```typescript
import { isComponentRegistered } from '@/lib/componentRegistry';

if (isComponentRegistered('sections.hero-section')) {
  console.log('Component is registered');
}
```

### Get All Registered Components

```typescript
import { getRegisteredComponents } from '@/lib/componentRegistry';

const components = getRegisteredComponents();
console.log(components);
// ['sections.hero-section', 'sections.features-section', ...]
```

## Type Safety

### Section Types

All section types are strongly typed:

```typescript
import type {
  HeroSection,
  FeaturesSection,
  PricingSection,
  Section,
} from '@/types';

// Union type of all sections
const section: Section = {
  id: 1,
  __component: 'sections.hero-section',
  title: 'Welcome',
  subtitle: 'Get started',
  description: 'Our platform',
  ctaText: 'Sign up',
  ctaLink: '/signup',
  showStats: true,
};

// Specific section type
const heroSection: HeroSection = {
  __component: 'sections.hero-section',
  id: 1,
  title: 'Welcome',
  subtitle: 'Get started',
  description: 'Our platform',
  ctaText: 'Sign up',
  ctaLink: '/signup',
  showStats: true,
};
```

### SEO Metadata

```typescript
import type { SEO } from '@/types';

const seo: SEO = {
  metaTitle: 'AkdemiApp - Manage Your Academy',
  metaDescription: 'The best platform for managing academies',
  keywords: 'academy, management, software',
  metaRobots: 'index, follow',
  canonicalURL: 'https://akdemiapp.com',
  metaImage: {
    id: 1,
    url: '/images/og-image.png',
    alternativeText: 'AkdemiApp Logo',
    // ... other StrapiMedia fields
  },
  metaSocial: [
    {
      socialNetwork: 'Facebook',
      title: 'AkdemiApp on Facebook',
      description: 'Follow us',
    },
  ],
};
```

## Error Handling

All service functions return safe defaults:

```typescript
// Returns empty array if fetch fails
const pages = await getPages(); // Page[]

// Returns null if not found
const page = await getPageBySlug('invalid-slug'); // Page | null

// Returns empty array if fetch fails
const slugs = await getPageSlugs(); // string[]

// Component registry returns null if component not found
const Component = getComponentForSection(section); // ComponentValue | null
```

## Best Practices

1. **Always check for null/empty results:**
   ```astro
   const page = await getPageBySlug(slug);
   if (!page) {
     return Astro.redirect('/404');
   }
   ```

2. **Validate sections before rendering:**
   ```typescript
   import { validateSections } from '@/lib/componentRegistry';

   if (!validateSections(page.sections)) {
     console.error('Invalid sections detected');
   }
   ```

3. **Use TypeScript for type safety:**
   ```typescript
   import type { Page, Section } from '@/types';

   function processPage(page: Page) {
     page.sections.forEach((section: Section) => {
       // TypeScript will help you here
     });
   }
   ```

4. **Handle missing components gracefully:**
   ```astro
   {page.sections.map((section) => {
     const Component = getComponentForSection(section);

     if (!Component) {
       console.warn(`Unknown section type: ${section.__component}`);
       return null;
     }

     return <Component {...section} />;
   })}
   ```

## Next Steps

1. **Create the Page content type in Strapi:**
   - Add fields: `slug`, `title`, `description`, `academyType`, `isActive`, `order`
   - Add dynamic zone: `sections` with all section components
   - Add SEO component with shared SEO fields

2. **Test the endpoints:**
   ```bash
   # Get all pages
   curl http://localhost:1337/api/pages?populate[sections][populate]=*&populate[seo][populate]=*

   # Get by slug
   curl http://localhost:1337/api/pages?filters[slug][$eq]=danzas&populate[sections][populate]=*
   ```

3. **Create a dynamic page template:**
   - Use `src/pages/[slug].astro` for dynamic routing
   - Fetch page data with `getPageBySlug`
   - Render sections with component registry

4. **Add SEO metadata:**
   - Use `page.seo` for meta tags
   - Add Open Graph and Twitter Card support
   - Implement structured data from `seo.structuredData`
