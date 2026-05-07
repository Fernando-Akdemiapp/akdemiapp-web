# Dynamic Layout System Guide

## Overview

El **Dynamic Layout System** permite que el Navbar y Footer del sitio sean completamente configurables desde Strapi CMS, sin necesidad de modificar código. Los cambios en Strapi se reflejan automáticamente en el sitio después de un rebuild.

### Key Features

- **CMS-Driven:** Todo el contenido del layout viene de Strapi Settings
- **Type-Safe:** TypeScript completo con interfaces estrictas
- **Fallback System:** Datos hardcodeados si Strapi no está disponible
- **Build-Time Fetching:** Datos se obtienen en build time para mejor performance
- **Zero Client JS:** Los datos se renderizan en HTML estático (SSG)

---

## Architecture

### Data Flow Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                        STRAPI CMS                           │
│  Single Type: Setting                                       │
│  ├── navbar (component)                                     │
│  └── footer (component)                                     │
└────────────────┬────────────────────────────────────────────┘
                 │
                 │ HTTP GET /api/setting
                 │
                 ▼
┌─────────────────────────────────────────────────────────────┐
│              FRONTEND SERVICE LAYER                         │
│  src/services/settings.ts                                   │
│  ├── getSettings()                                          │
│  ├── transformNavbar()                                      │
│  └── transformFooter()                                      │
└────────────────┬────────────────────────────────────────────┘
                 │
                 │ Returns typed Settings object
                 │
                 ▼
┌─────────────────────────────────────────────────────────────┐
│                  ASTRO COMPONENTS                           │
│  ├── Navbar.astro  ← uses settings.navbar                  │
│  └── Footer.astro  ← uses settings.footer                  │
└────────────────┬────────────────────────────────────────────┘
                 │
                 │ Renders at BUILD TIME
                 │
                 ▼
┌─────────────────────────────────────────────────────────────┐
│                    STATIC HTML                              │
│  Deployed to CDN with pre-rendered content                 │
└─────────────────────────────────────────────────────────────┘
```

### File Structure

```
frontend/src/
├── lib/
│   └── api.ts                    # Base API client
│       ├── fetchAPI()            # Fetch wrapper with error handling
│       ├── getStrapiURL()        # Build API URLs
│       ├── getStrapiMedia()      # Build media URLs
│       └── buildQueryString()    # Strapi populate queries
│
├── types/
│   └── Settings.ts               # TypeScript type definitions
│       ├── NavbarConfig          # Navbar structure
│       ├── FooterConfig          # Footer structure
│       ├── NavItem               # Navigation item (with children)
│       ├── LinkItem              # Simple link
│       ├── SocialLink            # Social media link
│       ├── ButtonConfig          # CTA button
│       └── Settings              # Main settings interface
│
├── services/
│   └── settings.ts               # Settings service
│       ├── getSettings()         # Main fetch function
│       ├── transformNavbar()     # Transform Strapi navbar data
│       ├── transformFooter()     # Transform Strapi footer data
│       ├── transformNavItem()    # Transform nav item recursively
│       ├── transformLinkItem()   # Transform link item
│       ├── transformSocialLink() # Transform social link
│       └── transformButtonConfig() # Transform button config
│
└── components/
    └── layout/
        ├── Navbar.astro          # Navigation component
        └── Footer.astro          # Footer component
```

---

## How It Works

### 1. Service Layer (`services/settings.ts`)

#### Main Function: `getSettings()`

```typescript
export async function getSettings(): Promise<Settings | null> {
  try {
    // Build complex populate query
    const queryString = buildQueryString({
      populate: {
        navbar: {
          populate: {
            logo: true,
            items: {
              populate: {
                children: true, // Recursive for dropdowns
              },
            },
            ctaButton: true,
          },
        },
        footer: {
          populate: {
            logo: true,
            productLinks: true,
            companyLinks: true,
            legalLinks: true,
            socialLinks: true,
          },
        },
      },
    });

    // Fetch from Strapi
    const response = await fetchAPI<any>(`/setting${queryString}`, {
      method: 'GET',
    });

    // Handle empty response
    if (!response?.data) {
      console.warn('No settings data found in Strapi');
      return null;
    }

    // Transform and return
    return transformSettings(response.data);

  } catch (error) {
    console.error('Error fetching settings:', error);
    return null;
  }
}
```

**What it does:**
1. Builds Strapi populate query (deeply nested)
2. Fetches settings from `/api/setting`
3. Transforms Strapi response to clean TypeScript interfaces
4. Returns `null` on error (triggers fallback in components)

#### Transform Functions

**Purpose:** Convert Strapi's nested response format to clean, flat interfaces.

**Example: Transform Navbar**

```typescript
function transformNavbar(navbar: any): NavbarConfig {
  return {
    id: navbar.id,
    logo: navbar.logo,
    items: navbar.items ? navbar.items.map(transformNavItem) : [],
    ctaButton: transformButtonConfig(navbar.ctaButton),
  };
}

function transformNavItem(item: any): NavItem {
  return {
    id: item.id,
    label: item.label,
    href: item.href,
    icon: item.icon || null,
    badge: item.badge || null,
    children: item.children ? item.children.map(transformNavItem) : undefined,
  };
}
```

**Why transform?**
- Remove Strapi's `attributes` wrapper
- Normalize null/undefined values
- Ensure type safety
- Simplify component usage

### 2. Type Definitions (`types/Settings.ts`)

#### Type Hierarchy

```typescript
// Main Settings interface
interface Settings {
  id: number;
  navbar: NavbarConfig;
  footer: FooterConfig;
  createdAt: string;
  updatedAt: string;
  publishedAt: string | null;
}

// Navbar configuration
interface NavbarConfig {
  id: number;
  logo: StrapiMedia;
  items: NavItem[];
  ctaButton: ButtonConfig;
}

// Navigation item with optional dropdown
interface NavItem {
  id: number;
  label: string;
  href: string;
  icon?: string | null;
  badge?: string | null;
  children?: NavItem[]; // Recursive for dropdowns
}

// Footer configuration
interface FooterConfig {
  id: number;
  logo: StrapiMedia;
  description: string;
  productLinks: LinkItem[];
  companyLinks: LinkItem[];
  legalLinks: LinkItem[];
  socialLinks: SocialLink[];
  contactLocation: string;
  contactPhone: string;
}

// Simple link
interface LinkItem {
  id: number;
  label: string;
  href: string;
}

// Social media link
interface SocialLink {
  id: number;
  label: string;
  href: string;
  icon: SocialIcon; // 'whatsapp' | 'facebook' | 'instagram' | etc.
}

// Button configuration
interface ButtonConfig {
  id: number;
  text: string;
  link: string;
  variant: ButtonVariant; // 'primary' | 'secondary'
}
```

**Benefits:**
- Full TypeScript autocomplete
- Compile-time error checking
- Self-documenting code
- Refactoring safety

### 3. Component Integration

#### Navbar Component (`components/layout/Navbar.astro`)

**Frontmatter (Data Fetching):**

```astro
---
import { getSettings } from '@/services/settings';
import { getStrapiMedia } from '@/lib/api';
import type { NavItem } from '@/types/Settings';

// Fetch settings at BUILD TIME
const settings = await getSettings();

// Fallback: use hardcoded data if Strapi unavailable
const navItems: NavItem[] = settings?.navbar.items || [
  { id: 1, label: "Inicio", href: "/" },
  {
    id: 2,
    label: "Casos de Uso",
    href: "#",
    children: [
      { id: 21, label: "Academia de Danzas", href: "/danzas" },
      // ... more items
    ],
  },
  { id: 3, label: "Precios", href: "/#pricing" },
];

// Logo with fallback
const logoUrl = settings?.navbar.logo
  ? getStrapiMedia(settings.navbar.logo.url)
  : "/AKDEMIApp-Logo.png";

// CTA button with fallback
const ctaButton = settings?.navbar.ctaButton || {
  text: "Prueba Gratis 14 Días",
  link: "/#contact",
  variant: "primary"
};
---
```

**Template (Rendering):**

```astro
<nav id="navbar" class="...">
  <!-- Logo -->
  <a href="/">
    <img src={logoUrl} alt={logoAlt} />
  </a>

  <!-- Navigation Items -->
  <div class="hidden md:flex items-center space-x-8">
    {navItems.map((item) => (
      <div class="relative group">
        {item.children && item.children.length > 0 ? (
          // Dropdown menu
          <>
            <button class="...">{item.label}</button>
            <div class="dropdown-menu">
              {item.children.map((subItem) => (
                <a href={subItem.href}>{subItem.label}</a>
              ))}
            </div>
          </>
        ) : (
          // Simple link
          <a href={item.href}>{item.label}</a>
        )}
      </div>
    ))}
  </div>

  <!-- CTA Button -->
  <CTAButton
    href={ctaButton.link}
    label={ctaButton.text}
    variant={ctaButton.variant}
  />
</nav>
```

**Key Points:**
- `await getSettings()` runs at BUILD time, not runtime
- Fallback data ensures component always renders
- TypeScript ensures `navItems` matches `NavItem[]` type
- Logo URL transformed via `getStrapiMedia()`

#### Footer Component (`components/layout/Footer.astro`)

Similar pattern:

```astro
---
import { getSettings } from '@/services/settings';
import type { LinkItem, SocialLink } from '@/types/Settings';

const settings = await getSettings();

// Multiple fallback arrays
const productLinks: LinkItem[] = settings?.footer.productLinks || [ /* ... */ ];
const companyLinks: LinkItem[] = settings?.footer.companyLinks || [ /* ... */ ];
const legalLinks: LinkItem[] = settings?.footer.legalLinks || [ /* ... */ ];
const socialLinks: SocialLink[] = settings?.footer.socialLinks || [ /* ... */ ];
---

<footer>
  <!-- Product Links Section -->
  <div>
    <h3>Producto</h3>
    <ul>
      {productLinks.map((link) => (
        <li><a href={link.href}>{link.label}</a></li>
      ))}
    </ul>
  </div>

  <!-- Social Links -->
  <div class="flex space-x-4">
    {socialLinks.map((social) => (
      <a href={social.href} aria-label={social.label}>
        <Fragment set:html={socialIcons[social.icon]} />
      </a>
    ))}
  </div>
</footer>
```

**Social Icons Mapping:**

```astro
---
const socialIcons: Record<string, string> = {
  whatsapp: '<svg>...</svg>',
  facebook: '<svg>...</svg>',
  instagram: '<svg>...</svg>',
  // ... more icons
};
---
```

---

## Fallback System

### How It Works

**1. Service Layer Returns `null`:**

```typescript
export async function getSettings(): Promise<Settings | null> {
  try {
    const response = await fetchAPI<any>('/setting...');
    if (!response?.data) return null; // ← Fallback triggered
    return transformSettings(response.data);
  } catch (error) {
    console.error('Error:', error);
    return null; // ← Fallback triggered
  }
}
```

**2. Component Uses Fallback Data:**

```astro
---
const settings = await getSettings(); // null if Strapi unavailable

const navItems = settings?.navbar.items || FALLBACK_NAV_ITEMS;
//                                        ↑ Uses fallback if null
---
```

### When Fallback Activates

1. **Strapi Backend Down:**
   - Backend not running
   - Database connection error
   - Network timeout

2. **No Settings Created:**
   - Fresh Strapi install
   - Settings deleted
   - Empty database

3. **API Permission Denied:**
   - Public role not configured
   - 403 Forbidden response

4. **CORS Issues:**
   - Frontend origin not whitelisted
   - Preflight request fails

### Fallback Data Example

**Navbar Fallback:**

```typescript
const navItems: NavItem[] = settings?.navbar.items || [
  { id: 1, label: "Inicio", href: "/" },
  {
    id: 2,
    label: "Casos de Uso",
    href: "#",
    children: [
      { id: 21, label: "Academia de Danzas", href: "/danzas" },
      { id: 22, label: "Artes Escénicas", href: "/artes-escenicas" },
      { id: 23, label: "Artes Marciales", href: "/artes-marciales" },
    ],
  },
  { id: 3, label: "Precios", href: "/#pricing" },
  { id: 4, label: "Contacto", href: "/#contact" },
];
```

**Footer Fallback:**

```typescript
const productLinks: LinkItem[] = settings?.footer.productLinks || [
  { id: 1, label: "Características", href: "/#features" },
  { id: 2, label: "Precios", href: "/#pricing" },
  { id: 3, label: "Casos de Uso", href: "#casos-uso" },
];
```

### Advantages

1. **Development Without Strapi:**
   - Frontend developers can work without backend running
   - Faster iteration during UI development
   - No dependency on backend team

2. **Graceful Degradation:**
   - Site always renders (never blank page)
   - User experience maintained
   - SEO not affected (content still indexed)

3. **Resilience:**
   - Temporary backend outages don't break site
   - Database issues contained
   - Build process always succeeds

4. **Testing:**
   - Easy to test with different data sets
   - Fallback data serves as default/example
   - Can simulate backend failure scenarios

---

## Customization

### Adding New Navbar Items

**Option 1: Via Strapi (Recommended)**

1. Go to `http://localhost:1337/admin`
2. Content Manager → Settings
3. Add new item in `navbar.items`
4. Save
5. Rebuild frontend

**Option 2: Update Fallback Data**

Edit `frontend/src/components/layout/Navbar.astro`:

```astro
---
const navItems: NavItem[] = settings?.navbar.items || [
  { id: 1, label: "Inicio", href: "/" },
  { id: 5, label: "Blog", href: "/blog" }, // NEW
  // ... existing items
];
---
```

### Changing Navbar Styles

**Typography:**

```astro
<a
  href={item.href}
  class="text-gray-700 hover:text-primary-600 font-medium" // ← Modify here
>
  {item.label}
</a>
```

**Dropdown Styling:**

```astro
<div class="absolute top-full left-0 mt-2 w-56 bg-white rounded-lg shadow-xl">
  <!-- Change: width, background, shadow, border-radius -->
</div>
```

**Mobile Menu:**

```astro
<div id="mobile-menu" class="md:hidden bg-white border-t shadow-lg">
  <!-- Modify mobile-specific styles -->
</div>
```

### Extending Settings with New Fields

**Example: Add "Announcement Bar" to Navbar**

**1. Update Backend Schema:**

Edit `backend/src/components/layout/navbar.json`:

```json
{
  "attributes": {
    "logo": { "..." },
    "items": { "..." },
    "ctaButton": { "..." },
    "announcement": {
      "type": "text",
      "maxLength": 200
    }
  }
}
```

**2. Update TypeScript Types:**

Edit `frontend/src/types/Settings.ts`:

```typescript
export interface NavbarConfig {
  id: number;
  logo: StrapiMedia;
  items: NavItem[];
  ctaButton: ButtonConfig;
  announcement?: string; // NEW
}
```

**3. Update Transform Function:**

Edit `frontend/src/services/settings.ts`:

```typescript
function transformNavbar(navbar: any): NavbarConfig {
  return {
    id: navbar.id,
    logo: navbar.logo,
    items: navbar.items ? navbar.items.map(transformNavItem) : [],
    ctaButton: transformButtonConfig(navbar.ctaButton),
    announcement: navbar.announcement || null, // NEW
  };
}
```

**4. Update Component:**

Edit `frontend/src/components/layout/Navbar.astro`:

```astro
---
const announcement = settings?.navbar.announcement || null;
---

{announcement && (
  <div class="bg-primary-600 text-white text-center py-2 text-sm">
    {announcement}
  </div>
)}

<nav id="navbar">
  <!-- ... rest of navbar -->
</nav>
```

**5. Update Strapi:**

1. Restart Strapi: `npm run develop`
2. Go to Settings in Content Manager
3. Fill in new "Announcement" field
4. Save

**6. Rebuild Frontend:**

```bash
cd frontend
npm run dev
```

---

## Development Workflow

### Development Without Strapi (Fallback Mode)

**Scenario:** Frontend developer wants to work on UI without backend.

```bash
# Only start frontend
cd frontend
npm run dev
```

**What happens:**
1. `getSettings()` fails (backend not running)
2. Components use fallback data
3. Site renders normally with hardcoded content
4. No errors, just console warning

**Advantages:**
- Fast iteration on UI/styles
- No backend dependencies
- Can share frontend-only dev environment

### Development With Strapi (Full Mode)

**Scenario:** Testing dynamic content changes.

```bash
# Terminal 1: Start backend
cd backend
docker-compose up -d
npm run develop

# Terminal 2: Start frontend
cd frontend
npm run dev
```

**Workflow:**
1. Make changes in Strapi admin
2. Save settings
3. Refresh frontend (dev server auto-reloads)
4. See changes reflected immediately

**Note:** Astro dev server does NOT hot-reload on external API changes. You must refresh the page manually.

### Build for Production

**Static Site Generation (SSG):**

```bash
cd frontend
npm run build
```

**What happens:**
1. Astro fetches settings from Strapi during build
2. Data is baked into static HTML files
3. Output in `dist/` folder is 100% static
4. No runtime API calls needed

**Preview Production Build:**

```bash
npm run preview
```

Opens `http://localhost:4321` with production build.

### Handling Content Updates

**Scenario:** Content editor updates navbar in Strapi.

**Required Steps:**
1. Edit content in Strapi admin
2. Save changes
3. **Rebuild frontend** (critical!)
   ```bash
   cd frontend
   npm run build
   ```
4. Redeploy to production

**Important:** SSG sites require rebuilds for content changes. Consider:
- **CI/CD Pipeline:** Auto-rebuild on content changes
- **Webhooks:** Strapi triggers build on save
- **Incremental Static Regeneration (ISR):** Future enhancement

---

## Best Practices

### 1. Type Safety

**DO:**
```typescript
const navItems: NavItem[] = settings?.navbar.items || fallbackItems;
```

**DON'T:**
```typescript
const navItems = settings?.navbar.items || fallbackItems; // Type inferred, not explicit
```

### 2. Null Checks

**DO:**
```astro
{settings?.navbar.logo && (
  <img src={getStrapiMedia(settings.navbar.logo.url)} />
)}
```

**DON'T:**
```astro
<img src={getStrapiMedia(settings.navbar.logo.url)} />
<!-- Will crash if settings is null -->
```

### 3. Fallback Data Quality

**DO:**
- Keep fallback data up-to-date
- Use real links, not `#` placeholders
- Match production content structure

**DON'T:**
- Use placeholder text like "Lorem ipsum"
- Leave fallback data outdated
- Have different structure than Strapi data

### 4. Error Logging

**DO:**
```typescript
if (!response?.data) {
  console.warn('No settings data found in Strapi');
  return null;
}
```

**DON'T:**
- Silently fail without logs
- Throw errors that break build
- Use `console.error` for expected scenarios

### 5. Media URLs

**DO:**
```typescript
const logoUrl = settings?.navbar.logo
  ? getStrapiMedia(settings.navbar.logo.url)
  : "/AKDEMIApp-Logo.png";
```

**DON'T:**
```typescript
const logoUrl = settings?.navbar.logo.url; // Missing getStrapiMedia(), wrong URL
```

### 6. Component Reusability

**DO:**
- Extract reusable parts into separate components
- Keep Navbar/Footer focused on layout
- Use consistent naming conventions

**DON'T:**
- Mix business logic into layout components
- Duplicate code across components
- Hardcode values that could be dynamic

---

## Performance Considerations

### Build-Time Fetching

**Pros:**
- Zero runtime overhead
- Fast page loads (no API calls)
- SEO-friendly (content in HTML)
- Works offline once built

**Cons:**
- Requires rebuild for content updates
- Build time increases with more content
- Can't show real-time data

### Caching Strategy

**Current:** No caching (fetch on every build)

**Future Enhancement:** Add caching layer

```typescript
// Cache settings for 1 hour during development
const CACHE_DURATION = 60 * 60 * 1000; // 1 hour
let cachedSettings: Settings | null = null;
let cacheTime = 0;

export async function getSettings(): Promise<Settings | null> {
  const now = Date.now();

  if (cachedSettings && (now - cacheTime) < CACHE_DURATION) {
    return cachedSettings; // Return cached
  }

  // Fetch fresh data
  const settings = await fetchSettingsFromAPI();

  cachedSettings = settings;
  cacheTime = now;

  return settings;
}
```

### Optimization Tips

1. **Image Optimization:**
   - Use WebP format for logos
   - Optimize images before upload to Strapi
   - Consider using Astro's `<Image>` component

2. **Minimize API Calls:**
   - Fetch settings once per build
   - Reuse settings object across components
   - Don't fetch in loops

3. **Bundle Size:**
   - Fallback data adds to bundle size
   - Keep fallback data minimal but functional
   - Use tree-shaking for unused code

---

## Troubleshooting

### Settings Not Loading

**Symptom:** Fallback data always shows, never Strapi data

**Debug Steps:**

1. Check Strapi is running:
   ```bash
   curl http://localhost:1337/api/setting
   ```

2. Check frontend .env:
   ```env
   PUBLIC_API_URL=http://localhost:1337/api
   PUBLIC_STRAPI_URL=http://localhost:1337
   ```

3. Check browser console for errors

4. Verify permissions in Strapi (Settings → Roles → Public → Setting → find)

### TypeScript Errors

**Symptom:** Type errors in components

**Solutions:**

1. Regenerate types:
   ```bash
   cd frontend
   npm run dev # Restart dev server
   ```

2. Check `Settings.ts` matches backend schema

3. Clear TypeScript cache:
   ```bash
   rm -rf .astro
   ```

### Images Not Displaying

**Symptom:** Broken image icons

**Solutions:**

1. Check `getStrapiMedia()` is used:
   ```typescript
   const logoUrl = getStrapiMedia(settings.navbar.logo.url);
   ```

2. Verify Strapi URL is correct:
   ```typescript
   console.log(import.meta.env.PUBLIC_STRAPI_URL);
   ```

3. Check CORS settings in Strapi

### Dropdown Not Working

**Symptom:** Dropdown menus don't open

**Solutions:**

1. Check JavaScript is loaded:
   ```astro
   <script>
     // Navbar script should be here
   </script>
   ```

2. Verify `children` array exists:
   ```typescript
   {item.children && item.children.length > 0 ? (
     // Dropdown code
   ) : (
     // Regular link
   )}
   ```

3. Check CSS classes are correct

---

## Related Documentation

- **Backend Configuration:** `backend/SETTINGS_CONFIGURATION.md`
- **API Client:** `frontend/src/lib/api.ts`
- **Type Definitions:** `frontend/src/types/Settings.ts`
- **Service Implementation:** `frontend/src/services/settings.ts`

---

## Future Enhancements

### Planned Features

1. **Webhook Integration:**
   - Strapi sends webhook on settings update
   - Triggers automatic frontend rebuild
   - Zero manual intervention

2. **Settings Versioning:**
   - Track settings history
   - Rollback to previous versions
   - Preview before publish

3. **A/B Testing:**
   - Multiple navbar/footer variants
   - Serve different versions to users
   - Track performance metrics

4. **Multi-Language Support:**
   - Internationalization (i18n)
   - Language switcher in navbar
   - Localized content from Strapi

5. **Advanced Navigation:**
   - Mega menus (multi-column dropdowns)
   - Nested navigation (3+ levels)
   - Contextual navigation based on page

6. **Real-Time Preview:**
   - Live preview in Strapi admin
   - See changes before saving
   - Visual editing interface

---

## Summary

**Key Takeaways:**

✅ **Settings are centralized** in Strapi Single Type
✅ **Service layer** handles API integration and transformation
✅ **TypeScript types** ensure type safety throughout
✅ **Fallback system** provides resilience and dev flexibility
✅ **Build-time fetching** maximizes performance
✅ **Components are clean** and focused on presentation

**Remember:**
- Content changes require frontend rebuild
- Fallback data should match Strapi structure
- Always use `getStrapiMedia()` for media URLs
- Test with both Strapi running and stopped
