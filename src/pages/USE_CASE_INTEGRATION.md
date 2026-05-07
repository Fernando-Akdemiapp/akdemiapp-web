# Use Case Benefits - Dynamic Integration Guide

## Overview

This guide documents the integration of dynamic use case benefits from Strapi CMS into the academy landing pages. The `danzas.astro` page has been updated as a proof of concept, demonstrating how to fetch and display academy-specific benefits dynamically.

## What Was Implemented

### 1. Type Definition (`src/types/UseCaseBenefit.ts`)

```typescript
export interface StrapiUseCaseBenefit {
  id: number;
  documentId: string;
  icon: string;
  title: string;
  description: string;
  academyType: 'danzas' | 'artes-escenicas' | 'artes-marciales' | 'artes-plasticas' | 'deportiva' | 'musica' | 'pre-escolar' | 'general';
  order: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  publishedAt: string | null;
}

export interface UseCaseBenefit {
  id: number;
  icon: string;
  title: string;
  description: string;
  academyType: string;
  order: number;
  isActive: boolean;
}
```

### 2. Service Layer (`src/services/useCaseBenefits.ts`)

The service provides two main functions:

- **`getUseCaseBenefits(academyType?: string)`**: Fetches benefits filtered by academy type
- **`getUseCaseBenefitsByTypes(academyTypes: string[])`**: Fetches benefits for multiple academy types (useful for "general" benefits)

Both functions:
- Filter by `isActive: true`
- Sort by `order` field (ascending)
- Return an empty array on error (graceful degradation)
- Transform Strapi response to clean `UseCaseBenefit` interface

### 3. Updated Exports

Added exports to:
- `src/types/index.ts`: `export type { UseCaseBenefit, StrapiUseCaseBenefit } from './UseCaseBenefit';`
- `src/services/index.ts`: `export { getUseCaseBenefits, getUseCaseBenefitsByTypes } from './useCaseBenefits';`

## How danzas.astro Was Modified

### Before:
```astro
---
import Layout from "../layouts/Layout.astro";
// ... other imports

const benefits = [
  {
    icon: "💃",
    title: "Gestión de Coreografías",
    description: "Organiza y planifica coreografías...",
  },
  // ... 3 more hardcoded benefits
];
---
```

### After:
```astro
---
import Layout from "../layouts/Layout.astro";
// ... other imports
import { getUseCaseBenefits } from "../services";

// Fetch benefits for danzas academy type from Strapi
const apiBenefits = await getUseCaseBenefits('danzas');

// Fallback to hardcoded benefits if API returns no data
const hardcodedBenefits = [
  {
    icon: "💃",
    title: "Gestión de Coreografías",
    description: "Organiza y planifica coreografías...",
  },
  // ... 3 more hardcoded benefits
];

// Use API benefits if available, otherwise fallback to hardcoded
const benefits = apiBenefits.length > 0 ? apiBenefits : hardcodedBenefits;
---
```

### Key Changes:
1. **Import service**: `import { getUseCaseBenefits } from "../services";`
2. **Fetch from API**: `const apiBenefits = await getUseCaseBenefits('danzas');`
3. **Maintain fallback**: Original hardcoded benefits preserved as `hardcodedBenefits`
4. **Conditional logic**: Use API data if available, otherwise use hardcoded
5. **No HTML changes**: The rest of the page remains identical

## How to Replicate on Other Pages

To integrate dynamic benefits on the remaining 6 pages, follow these steps:

### Step 1: Identify Academy Type

Map each page to its academy type:
- `artes-escenicas.astro` → `'artes-escenicas'`
- `artes-marciales.astro` → `'artes-marciales'`
- `artes-plasticas.astro` → `'artes-plasticas'`
- `deportiva.astro` → `'deportiva'`
- `musica.astro` → `'musica'`
- `pre-escolar.astro` → `'pre-escolar'`

### Step 2: Modify Each Page

For each page (e.g., `artes-escenicas.astro`):

```astro
---
// Existing imports...
import { getUseCaseBenefits } from "../services";

// Fetch benefits for this academy type
const apiBenefits = await getUseCaseBenefits('artes-escenicas'); // Change academy type

// Move existing benefits array to hardcodedBenefits
const hardcodedBenefits = [
  // ... existing benefits
];

// Use API benefits if available, otherwise fallback
const benefits = apiBenefits.length > 0 ? apiBenefits : hardcodedBenefits;
---

<!-- Rest of the page remains unchanged -->
```

### Step 3: Test Each Page

1. Start the dev server: `npm run dev`
2. Visit each page: `http://localhost:4321/[academy-type]`
3. Verify benefits display correctly
4. Check browser console for any errors

## Strapi Configuration

### Content Type: `use-case-benefits`

To enable dynamic benefits in Strapi, create a new content type with the following schema:

#### Collection Type Name
- Display name: `Use Case Benefit`
- API ID: `use-case-benefit`
- Plural: `use-case-benefits`

#### Fields

| Field Name | Type | Options | Description |
|------------|------|---------|-------------|
| `icon` | Text (Short text) | Required | Emoji or icon representation (e.g., "💃", "🎨") |
| `title` | Text (Short text) | Required | Benefit title (e.g., "Gestión de Coreografías") |
| `description` | Text (Long text) | Required | Detailed benefit description |
| `academyType` | Enumeration | Required | Values: `danzas`, `artes-escenicas`, `artes-marciales`, `artes-plasticas`, `deportiva`, `musica`, `pre-escolar`, `general` |
| `order` | Number (integer) | Required, Default: 0 | Display order (lower numbers appear first) |
| `isActive` | Boolean | Required, Default: true | Whether this benefit is active and should be displayed |

#### Advanced Settings

**Permissions (Public role):**
- Enable `find` and `findOne` operations for public access
- No authentication required for GET requests

**API Configuration:**
```json
{
  "defaultSort": "order:asc",
  "defaultLimit": 25,
  "maxLimit": 100
}
```

### Sample Data

Here's example data for `danzas` academy type:

```json
[
  {
    "icon": "💃",
    "title": "Gestión de Coreografías",
    "description": "Organiza y planifica coreografías, ensayos y presentaciones de forma eficiente.",
    "academyType": "danzas",
    "order": 1,
    "isActive": true
  },
  {
    "icon": "👗",
    "title": "Control de Vestuario",
    "description": "Administra inventario de vestuario y accesorios para cada presentación.",
    "academyType": "danzas",
    "order": 2,
    "isActive": true
  },
  {
    "icon": "🎭",
    "title": "Calendario de Shows",
    "description": "Programa presentaciones, ensayos y eventos especiales con facilidad.",
    "academyType": "danzas",
    "order": 3,
    "isActive": true
  },
  {
    "icon": "📊",
    "title": "Seguimiento de Progreso",
    "description": "Evalúa el desarrollo técnico de cada bailarín y comparte reportes con padres.",
    "academyType": "danzas",
    "order": 4,
    "isActive": true
  }
]
```

### Creating Content in Strapi

1. Navigate to `http://localhost:1337/admin`
2. Go to **Content Manager** → **Use Case Benefits**
3. Click **Create new entry**
4. Fill in all required fields:
   - Icon: Use emojis (e.g., 💃, 🎨, 🥋)
   - Title: Clear, concise benefit name
   - Description: 1-2 sentences explaining the benefit
   - Academy Type: Select from dropdown
   - Order: Integer for sorting (1, 2, 3, 4...)
   - Is Active: Toggle on
5. Click **Save** and **Publish**
6. Repeat for all academy types

### API Endpoints

Once configured, Strapi will expose:

- **Get all benefits**: `GET /api/use-case-benefits`
- **Get filtered benefits**: `GET /api/use-case-benefits?filters[academyType][$eq]=danzas&filters[isActive][$eq]=true&sort=order:asc`
- **Get single benefit**: `GET /api/use-case-benefits/:id`

Example response:
```json
{
  "data": [
    {
      "id": 1,
      "documentId": "abc123",
      "icon": "💃",
      "title": "Gestión de Coreografías",
      "description": "Organiza y planifica coreografías...",
      "academyType": "danzas",
      "order": 1,
      "isActive": true,
      "createdAt": "2025-01-15T10:00:00.000Z",
      "updatedAt": "2025-01-15T10:00:00.000Z",
      "publishedAt": "2025-01-15T10:00:00.000Z"
    }
  ],
  "meta": {
    "pagination": {
      "page": 1,
      "pageSize": 25,
      "pageCount": 1,
      "total": 4
    }
  }
}
```

## Benefits of This Approach

### 1. Graceful Degradation
- If Strapi is unavailable, pages show hardcoded benefits
- No broken pages or error states
- Seamless user experience

### 2. Dynamic Content Management
- Non-technical users can update benefits via Strapi admin
- No code deployments needed for content changes
- A/B testing benefits by toggling `isActive`

### 3. Academy-Specific Customization
- Each academy type can have unique benefits
- Shared benefits using `academyType: 'general'`
- Easy to reorder benefits using the `order` field

### 4. Type Safety
- Full TypeScript support
- IDE autocomplete for benefit fields
- Compile-time error checking

### 5. Consistent Architecture
- Follows existing patterns (features, testimonials, etc.)
- Centralized service layer
- Clean separation of concerns

## Advanced Use Cases

### Including General Benefits

To show both academy-specific AND general benefits:

```astro
---
import { getUseCaseBenefitsByTypes } from "../services";

// Fetch benefits for both danzas and general
const apiBenefits = await getUseCaseBenefitsByTypes(['danzas', 'general']);

// Fallback logic...
const benefits = apiBenefits.length > 0 ? apiBenefits : hardcodedBenefits;
---
```

### Limiting Number of Benefits

```astro
---
const apiBenefits = await getUseCaseBenefits('danzas');
const benefits = apiBenefits.length > 0
  ? apiBenefits.slice(0, 4) // Show only first 4
  : hardcodedBenefits;
---
```

### Combining API and Hardcoded

```astro
---
const apiBenefits = await getUseCaseBenefits('danzas');

// Always show at least 4 benefits, pad with hardcoded if needed
let benefits = [...apiBenefits];
if (benefits.length < 4) {
  const remaining = hardcodedBenefits.slice(benefits.length);
  benefits = [...benefits, ...remaining];
}
---
```

## Testing Checklist

Before deploying to production:

- [ ] Strapi content type created with correct schema
- [ ] Sample data created for all academy types
- [ ] Permissions configured for public read access
- [ ] All 7 pages updated (danzas + 6 others)
- [ ] Dev server tested: benefits load from Strapi
- [ ] Fallback tested: benefits show when Strapi unavailable
- [ ] Production build succeeds: `npm run build`
- [ ] Preview build tested: `npm run preview`
- [ ] SEO unchanged: structured data intact
- [ ] Accessibility maintained: ARIA labels, semantic HTML

## Troubleshooting

### Benefits Not Showing

1. Check browser console for API errors
2. Verify Strapi is running: `http://localhost:1337/admin`
3. Test API endpoint directly: `http://localhost:1337/api/use-case-benefits?filters[academyType][$eq]=danzas`
4. Check `isActive` is `true` in Strapi
5. Verify content is **published** (not just saved)

### Empty Array Returned

- Check `filters[academyType][$eq]=` matches exactly (case-sensitive)
- Ensure at least one entry exists for that academy type
- Verify public permissions are enabled in Strapi

### Build Errors

- Run `npm run build` and check for TypeScript errors
- Ensure all imports are correct
- Verify `src/services/index.ts` exports are present

## Future Enhancements

- **CMS Preview**: Add draft/preview mode for content editors
- **Analytics**: Track which benefits drive the most conversions
- **Multilingual**: Add i18n support for Spanish/English benefits
- **Rich Content**: Support Markdown or HTML in descriptions
- **Images**: Replace emoji icons with uploaded images
- **A/B Testing**: Randomize benefit order to optimize engagement

## Questions or Issues?

If you encounter any problems implementing this on other pages:

1. Check this documentation first
2. Review the `danzas.astro` implementation
3. Verify Strapi content type matches the schema exactly
4. Test API endpoints manually using Postman or browser

---

**Last Updated**: 2025-01-15
**Status**: Proof of concept implemented on `danzas.astro`
**Remaining Work**: Replicate on 6 other academy pages
