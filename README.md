# AkdemiApp Frontend

Modern landing page for AkdemiApp built with Astro 5, Tailwind CSS v4, and integrated with Strapi 5 CMS.

## Overview

This is the frontend component of the AkdemiApp monorepo, featuring:

- **Framework**: Astro 5.x with TypeScript (strict mode)
- **Styling**: Tailwind CSS v4 via Vite plugin
- **Content**: Integrated with Strapi 5 headless CMS
- **Rendering**: Static Site Generation (SSG) with build-time data fetching
- **Deployment**: Docker multi-stage build optimized for production

## Quick Start

```bash
# Install dependencies
npm install

# Copy environment variables
cp .env.example .env

# Start development server
npm run dev
```

Visit [http://localhost:4321](http://localhost:4321) to view the app.

## Commands

| Command | Action |
|---------|--------|
| `npm install` | Install dependencies |
| `npm run dev` | Start dev server at localhost:4321 |
| `npm run build` | Build production site to ./dist/ |
| `npm run build:docker` | Docker-optimized production build |
| `npm run preview` | Preview build locally before deploying |
| `npm run astro ...` | Run Astro CLI commands |

## Project Structure

```
frontend/
├── src/
│   ├── pages/              # File-based routing
│   │   ├── index.astro              # Homepage
│   │   ├── artes-escenicas.astro    # Scenic arts landing
│   │   ├── artes-marciales.astro    # Martial arts landing
│   │   ├── artes-plasticas.astro    # Plastic arts landing
│   │   ├── danzas.astro             # Dance landing
│   │   ├── deportiva.astro          # Sports landing
│   │   ├── musica.astro             # Music landing
│   │   └── pre-escolar.astro        # Preschool landing
│   │
│   ├── components/         # Reusable components
│   │   ├── layout/         # Navbar, Footer
│   │   ├── sections/       # Hero, Features, Pricing, CTA, etc.
│   │   └── ui/             # Badge, Button, Card, Input, Select
│   │
│   ├── layouts/            # Page layout wrappers
│   │   └── Layout.astro    # Main layout with global CSS
│   │
│   ├── services/           # API service layer
│   │   ├── index.ts               # Service exports
│   │   ├── plans.ts               # Pricing plans
│   │   ├── features.ts            # Features
│   │   ├── testimonials.ts        # Testimonials
│   │   ├── stats.ts               # Site statistics
│   │   ├── callbacks.ts           # Callback requests
│   │   ├── clients.ts             # Client logos
│   │   └── useCaseBenefits.ts     # Use case benefits
│   │
│   ├── types/              # TypeScript interfaces
│   │   ├── index.ts               # Type exports
│   │   ├── Plan.ts                # Plan & StrapiPlan
│   │   ├── Feature.ts             # Feature & StrapiFeature
│   │   ├── Testimonial.ts         # Testimonial types
│   │   ├── SiteStats.ts           # Site statistics
│   │   ├── CallbackRequest.ts     # Callback requests
│   │   ├── ClientLogo.ts          # Client logos
│   │   └── UseCaseBenefit.ts      # Use case benefits
│   │
│   ├── lib/                # Utility functions
│   │   └── api.ts          # Base API client for Strapi
│   │
│   ├── assets/             # Optimized images/SVGs
│   └── styles/             # Global styles
│       └── global.css      # Tailwind imports and custom theme
│
├── public/                 # Static assets
├── Dockerfile             # Multi-stage production build
├── astro.config.mjs       # Astro configuration
├── tailwind.config.mjs    # Tailwind CSS v4 configuration
├── tsconfig.json          # TypeScript configuration
└── .env.example           # Environment variables template
```

## Path Aliases

Configured in `tsconfig.json`:

```typescript
import { getPricingPlans } from '@/services';
import type { Plan } from '@/types';
import { fetchAPI } from '@/lib/api';
import Hero from '@/components/sections/Hero.astro';
```

- `@/services` - API services
- `@/types` - TypeScript types
- `@/lib/*` - Utilities
- `@/components/*` - Components
- `@/layouts/*` - Layouts

## Strapi Integration

### Environment Variables

Create `.env` file from template:

```env
PUBLIC_API_URL=http://localhost:1337/api
PUBLIC_STRAPI_URL=http://localhost:1337
```

### Service Layer

All API interactions happen through the service layer:

```typescript
// Import services
import { getPricingPlans, getFeatures, getSiteStats } from '@/services';

// Fetch data at build time
const plans = await getPricingPlans();
const features = await getFeatures();
const stats = await getSiteStats();
```

### Available Services

| Service | Description |
|---------|-------------|
| `getPricingPlans()` | Fetch all active pricing plans |
| `getPricingPlanBySlug(slug)` | Fetch specific plan by slug |
| `getFeatures()` | Fetch all active features |
| `getTestimonials()` | Fetch all published testimonials |
| `getFeaturedTestimonials()` | Fetch featured testimonials only |
| `getSiteStats()` | Fetch site-wide statistics |
| `createCallbackRequest(data)` | Submit callback request |
| `getClientLogos()` | Fetch client logo gallery |
| `getUseCaseBenefits()` | Fetch all use case benefits |
| `getUseCaseBenefitsByTypes(types)` | Fetch benefits by academy types |

### Data Flow

```
Build Time → Services → API Client → Strapi CMS → PostgreSQL
    ↓
Transform to clean interfaces
    ↓
Static HTML with pre-rendered content
    ↓
Fast, SEO-friendly pages
```

### Integrated Components

Components that fetch data from Strapi:

- `Hero.astro` - Site statistics
- `Features.astro` - Feature list
- `Pricing.astro` - Pricing plans
- `CTA.astro` - Statistics
- `LogoCarousel.astro` - Client logos
- `CallbackForm.astro` - Form submission

All components implement fallback mechanisms for graceful degradation.

## Styling with Tailwind CSS v4

### Configuration

Tailwind is configured as a Vite plugin (not as Astro integration):

```javascript
// astro.config.mjs
export default defineConfig({
  vite: {
    plugins: [tailwindcss()]
  }
});
```

### Global Styles

Imported in `src/styles/global.css`:

```css
@import "tailwindcss";

@theme {
  /* Custom theme configuration */
}
```

### Custom Theme

- **Colors**: primary, secondary, accent
- **Animations**: fadeIn, slideUp, slideDown, scaleIn
- **Responsive**: Mobile-first approach

### Usage

```astro
<div class="bg-primary text-white hover:bg-primary/90 transition-colors">
  <h1 class="text-4xl font-bold animate-fadeIn">
    Welcome to AkdemiApp
  </h1>
</div>
```

## Development Workflow

### Adding New Pages

1. Create `.astro` file in `src/pages/`
2. File name becomes route (e.g., `about.astro` → `/about`)
3. Use Layout component for consistent structure
4. Import and use components

```astro
---
import Layout from '@/layouts/Layout.astro';
import Hero from '@/components/sections/Hero.astro';
---

<Layout title="About Us">
  <Hero />
  <!-- Your content -->
</Layout>
```

### Creating Components

1. Add component to appropriate directory
2. Use TypeScript for type safety
3. Implement props interface
4. Handle empty states gracefully

```astro
---
interface Props {
  title: string;
  description?: string;
}

const { title, description } = Astro.props;
---

<div class="component">
  <h2>{title}</h2>
  {description && <p>{description}</p>}
</div>
```

### Integrating with Strapi

1. Define TypeScript interfaces in `src/types/`
2. Create transformation functions
3. Implement service in `src/services/`
4. Use service in components
5. Handle errors and empty states

Example:

```typescript
// src/types/MyContent.ts
export interface MyContent {
  id: number;
  title: string;
  description: string;
}

export interface StrapiMyContent {
  id: number;
  attributes: {
    title: string;
    description: string;
  };
}

// src/services/myContent.ts
import { fetchAPI } from '@/lib/api';
import type { MyContent, StrapiMyContent } from '@/types';

export async function getMyContent(): Promise<MyContent[]> {
  try {
    const response = await fetchAPI<StrapiMyContent[]>('/my-contents');
    if (!response?.data) return [];

    return response.data.map(item => ({
      id: item.id,
      title: item.attributes.title,
      description: item.attributes.description,
    }));
  } catch (error) {
    console.error('Error fetching my content:', error);
    return [];
  }
}
```

## Building for Production

### Local Build

```bash
# Build with type checking
npm run build

# Build for Docker (with verbose output)
npm run build:docker

# Clean build artifacts
npm run clean
```

Generates static files in `./dist/` directory.

### Docker Build

```bash
# Build image
docker build -t akdemiapp-frontend .

# Build with build-time environment variables
docker build \
  --build-arg PUBLIC_API_URL=https://api.akdemiapp.com/api \
  --build-arg PUBLIC_STRAPI_URL=https://api.akdemiapp.com \
  -t akdemiapp-frontend .

# Run container
docker run -p 3000:3000 \
  -e PUBLIC_API_URL=https://api.akdemiapp.com/api \
  -e PUBLIC_STRAPI_URL=https://api.akdemiapp.com \
  akdemiapp-frontend
```

The Dockerfile uses multi-stage builds:
1. **Build stage**: Installs dependencies and builds Astro
2. **Runtime stage**: Serves static files with `serve`

**Security Features:**
- Non-root user (nodejs:1001)
- Minimal Alpine Linux base
- Only production dependencies
- Health checks included

### Environment Variables

**Required variables:**

| Variable | Development | Production |
|----------|------------|------------|
| `PUBLIC_API_URL` | `http://localhost:1337/api` | `https://api.akdemiapp.com/api` |
| `PUBLIC_STRAPI_URL` | `http://localhost:1337` | `https://api.akdemiapp.com` |
| `NODE_ENV` | `development` | `production` |

Set these in your deployment platform (Coolify, Vercel, Netlify, etc.).

### Deployment to Coolify

**Quick Start:**

1. **Connect Repository** in Coolify Dashboard
2. **Set Base Directory** to `frontend` (for monorepo)
3. **Configure Environment Variables** (see above)
4. **Deploy** - Coolify builds and serves automatically

**Automated Updates with Webhooks:**

Enable automatic rebuilds when Strapi content changes:

1. Get webhook URL from Coolify Dashboard
2. Configure webhook in Strapi Admin (Settings → Webhooks)
3. Select events: publish, unpublish, update, delete
4. Every content change triggers automatic rebuild (2-5 min lag)

**Detailed Instructions:**

See [DEPLOYMENT.md](./DEPLOYMENT.md) for complete Coolify setup guide including:
- Step-by-step configuration
- Webhook setup
- Environment variables
- Domain configuration
- Troubleshooting
- Monitoring

### Rebuild Requirements

Changes in Strapi content require rebuilding the frontend:

- **Manual:** Run `npm run build` locally or trigger in Coolify
- **Automated:** Set up webhooks (recommended) - see [DEPLOYMENT.md](./DEPLOYMENT.md)
- **Development:** Use `npm run dev` for hot reload

## Best Practices

### Performance

- Use Astro's Image component for optimized images
- Leverage SSG for fast page loads
- Minimize client-side JavaScript
- Implement proper caching headers

### SEO

- Use semantic HTML
- Add proper meta tags in Layout
- Generate sitemaps
- Implement structured data

### Accessibility

- Use ARIA labels where needed
- Ensure keyboard navigation
- Maintain proper heading hierarchy
- Test with screen readers

### Type Safety

- Enable strict mode in TypeScript
- Define interfaces for all data structures
- Use type guards for runtime checks
- Avoid `any` types

### Error Handling

- Always return safe defaults
- Log errors for debugging
- Implement fallback UI
- Test with missing data

## Integration with Backend

This frontend integrates with the AkdemiApp backend (Strapi 5 CMS). See the [main project README](../README.md) for:

- Complete setup instructions
- Backend configuration
- Database setup
- Content type creation
- API permissions

### Prerequisites

1. Backend must be running at `http://localhost:1337`
2. PostgreSQL database must be active
3. Content types must be created in Strapi
4. Public permissions must be configured
5. Test data should be added

### Testing Integration

```bash
# Start backend (in separate terminal)
cd ../backend
docker-compose up -d
npm run develop

# Start frontend
npm run dev

# Check browser console for API errors
# Verify components render data from Strapi
```

## Troubleshooting

### CORS Errors

Verify `backend/config/middlewares.ts` includes `http://localhost:4321` in CORS origins.

### 403 Forbidden

Check Content Type permissions in Strapi admin:
- Settings → Roles → Public
- Enable `find` and `findOne` for all content types

### Empty Data

Ensure:
- Content types are created in Strapi
- Content is published (not draft)
- API endpoints are accessible
- Environment variables are correct

### Build Errors

- Verify `.env` file exists
- Check `PUBLIC_*` variables are set
- Ensure backend is accessible during build
- Review service error logs

## Resources

- [Astro Documentation](https://docs.astro.build)
- [Tailwind CSS v4 Documentation](https://tailwindcss.com/docs)
- [Strapi Documentation](https://docs.strapi.io)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

## License

[Your License Here]

## Contributing

[Contributing Guidelines Here]
