# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Astro 5 landing page for AkdemiApp using Tailwind CSS v4, integrated with Strapi 5 headless CMS for dynamic content.

## Commands

| Command | Action |
|---------|--------|
| `npm run dev` | Start dev server at localhost:4321 |
| `npm run build` | Build production site to ./dist/ |
| `npm run build:docker` | Docker-optimized build |
| `npm run preview` | Preview build locally |

## Architecture

**Framework Stack:**
- Astro 5.x with TypeScript (strict mode)
- Tailwind CSS v4 via `@tailwindcss/vite` plugin
- Vite-based build system
- Static Site Generation (SSG) with build-time data fetching

**Tailwind Integration:**
- Configured as Vite plugin in `astro.config.mjs` (not as Astro integration)
- Global import in `src/styles/global.css` (`@import "tailwindcss"`)
- Layout component imports global CSS
- Custom theme defined with `@theme` directive in global.css

**File Structure:**
- `src/pages/` - File-based routing
- `src/layouts/` - Page layout wrappers
- `src/components/` - Reusable components
  - `layout/` - Navbar, Footer
  - `sections/` - Hero, Features, Pricing, CTA, etc.
  - `ui/` - Badge, Button, Card, Input, Select
- `src/services/` - API service layer for Strapi integration
- `src/types/` - TypeScript interfaces and types
- `src/lib/` - Utility functions (API client)
- `src/assets/` - Images/SVGs (optimized imports)
- `src/styles/` - Global styles
- Always use context7 when I need code generation, setup or configuration steps, or library/API documentation. This means you should automatically use the Context7 MCP tools to resolve library id and get library docs without me having to explicitly ask.

## Component Structure

**Integrated Components (with API):**
- `Hero.astro` - Fetches stats via `getSiteStats()`
- `Features.astro` - Fetches features via `getFeatures()`
- `Pricing.astro` - Fetches plans via `getPricingPlans()`
- `CTA.astro` - Fetches stats via `getSiteStats()`
- `LogoCarousel.astro` - Fetches client logos via `getClientLogos()`

**Static Components:**
- `Navbar.astro`, `Footer.astro` - Layout components
- `CallbackForm.astro` - Form component (uses `createCallbackRequest()` service)
- `ui/*` - Reusable UI components (Badge, Button, Card, etc.)

**Fallback System:**
All integrated components implement fallback mechanisms:
- Return empty arrays on fetch failures
- Components render gracefully with no data
- Errors logged to console for debugging

## API Integration

**Overview:**
The frontend integrates with Strapi 5 CMS via REST API. Data is fetched at build time (SSG) for optimal performance and SEO.

**Service Layer Structure:**
```
src/
├── lib/
│   └── api.ts              # Base API client (fetchAPI, getStrapiURL, getStrapiMedia)
├── services/
│   ├── index.ts            # Service exports
│   ├── plans.ts            # Pricing plans service
│   ├── features.ts         # Features service
│   ├── testimonials.ts     # Testimonials service
│   ├── stats.ts            # Site statistics service
│   ├── callbacks.ts        # Callback requests service
│   ├── clients.ts          # Client logos service
│   └── useCaseBenefits.ts  # Use case benefits service
└── types/
    ├── index.ts            # Type exports
    ├── Plan.ts             # Plan & StrapiPlan interfaces
    ├── Feature.ts          # Feature & StrapiFeature interfaces
    ├── Testimonial.ts      # Testimonial & StrapiTestimonial interfaces
    ├── SiteStats.ts        # SiteStats & StrapiSiteStats interfaces
    ├── CallbackRequest.ts  # CallbackRequest & StrapiCallbackRequest interfaces
    ├── ClientLogo.ts       # ClientLogo & StrapiClientLogo interfaces
    └── UseCaseBenefit.ts   # UseCaseBenefit & StrapiUseCaseBenefit interfaces
```

**Path Aliases (tsconfig.json):**
- `@/services` - Access to services barrel export
- `@/services/*` - Individual service files
- `@/types` - Access to types barrel export
- `@/types/*` - Individual type files
- `@/lib/*` - Utility functions
- `@/components/*` - Components
- `@/layouts/*` - Layouts

**Using Services in Components:**
```astro
---
// Import services using path aliases
import { getPricingPlans } from '@/services';
import type { Plan } from '@/types';

// Fetch data at build time
const plans: Plan[] = await getPricingPlans();
---

<!-- Use data in template -->
{plans.map((plan) => (
  <div>{plan.name}: ${plan.price}</div>
))}
```

**Available Services:**
- `getPricingPlans()` - Fetch all active pricing plans
- `getPricingPlanBySlug(slug)` - Fetch specific plan by slug
- `getFeatures()` - Fetch all active features
- `getTestimonials()` - Fetch all published testimonials
- `getFeaturedTestimonials()` - Fetch only featured testimonials
- `getSiteStats()` - Fetch site-wide statistics
- `createCallbackRequest(data)` - Submit callback request
- `getClientLogos()` - Fetch client logo gallery
- `getUseCaseBenefits()` - Fetch all use case benefits
- `getUseCaseBenefitsByTypes(types)` - Fetch benefits by academy types

**Environment Variables:**
```env
# Required for API integration
PUBLIC_API_URL=http://localhost:1337/api
PUBLIC_STRAPI_URL=http://localhost:1337
```

Copy `.env.example` to `.env` and update values for your environment.

## Data Fetching Patterns

**Build-Time Fetching (SSG):**
Astro fetches data during the build process, generating static HTML with pre-rendered content.

```astro
---
import { getFeatures } from '@/services';

// This runs at BUILD TIME, not on every request
const features = await getFeatures();
---
```

**Benefits:**
- Fast page loads (static HTML)
- SEO-friendly (content in initial HTML)
- No client-side JavaScript for data fetching
- Works offline once built

**Environment Access:**
Use `import.meta.env.PUBLIC_*` for runtime-accessible environment variables:
```typescript
const apiUrl = import.meta.env.PUBLIC_API_URL;
const strapiUrl = import.meta.env.PUBLIC_STRAPI_URL;
```

**Error Handling Best Practices:**
```typescript
export async function getFeatures(): Promise<Feature[]> {
  try {
    const response = await fetchAPI<StrapiFeature[]>('/features');

    if (!response?.data) {
      return []; // Return empty array, not null
    }

    return response.data.map(transformFeature);
  } catch (error) {
    console.error('Error fetching features:', error);
    return []; // Always return fallback
  }
}
```

**Fallback Patterns:**
1. Always return safe defaults (empty arrays, null for optional data)
2. Log errors for debugging but don't throw
3. Components should handle empty data gracefully
4. Consider static fallback data for critical content

**Rebuilding:**
Content changes in Strapi require rebuilding the frontend:
```bash
npm run build
```

For development with frequent content updates, consider:
- Using `npm run dev` with Astro's dev server
- Implementing on-demand ISR (future enhancement)
- Setting up webhooks to trigger rebuilds