# Testing Guide - Dynamic Routing System

Guía completa para probar el sistema de routing dinámico de AkdemiApp.

## Prerequisitos

Antes de probar el sistema, asegúrate de que:

1. **Backend Strapi está corriendo:**
   ```bash
   cd backend
   npm run develop
   # Debe estar accesible en http://localhost:1337
   ```

2. **Base de datos PostgreSQL está activa:**
   ```bash
   cd backend
   docker-compose up -d
   ```

3. **Variables de entorno configuradas:**
   ```env
   # frontend/.env
   PUBLIC_API_URL=http://localhost:1337/api
   PUBLIC_STRAPI_URL=http://localhost:1337
   ```

## Test 1: Verificar Servicios

### 1.1 Test del servicio getPages()

```bash
cd frontend
npm run dev
```

Verifica en la consola del servidor que se pueden obtener páginas:

```
[...slug].astro: Generating X static page(s)
  → Generating page: /academia-musica (Academia de Música)
```

### 1.2 Test manual con curl

```bash
# Obtener todas las páginas
curl "http://localhost:1337/api/pages?populate[sections][populate]=*&populate[seo][populate]=*&filters[isActive][\$eq]=true&sort[0]=order:asc"
```

Respuesta esperada:
```json
{
  "data": [
    {
      "id": 1,
      "attributes": {
        "slug": "academia-musica",
        "title": "Academia de Música",
        "sections": [...],
        "seo": {...}
      }
    }
  ]
}
```

## Test 2: Build Estático

### 2.1 Build completo

```bash
cd frontend
npm run build
```

Verificar salida:
```
✓ 17 modules transformed
generating static routes
▶ src/pages/[...slug].astro
  └─ /academia-musica/index.html (139 kB)
  └─ /academia-danzas/index.html (142 kB)
✓ Completed in 2.5s
```

### 2.2 Verificar archivos generados

```bash
ls -la dist/academia-musica/index.html
ls -la dist/academia-danzas/index.html
```

Cada archivo debe existir y tener contenido (> 100 KB).

### 2.3 Preview del build

```bash
npm run preview
```

Navegar a http://localhost:4321/academia-musica

## Test 3: Validación de Componentes

### 3.1 Test del Component Registry

Crear archivo temporal para testing:

```typescript
// frontend/test-registry.ts
import {
  getComponentForSection,
  validateSections,
  isComponentRegistered
} from './src/lib/componentRegistry';

const testSection = {
  __component: 'sections.hero-section',
  id: 1,
  title: 'Test Hero'
};

// Test 1: Obtener componente
const component = getComponentForSection(testSection);
console.log('Component found:', component !== null); // true

// Test 2: Validar sections
const sections = [testSection];
const isValid = validateSections(sections);
console.log('Sections valid:', isValid); // true

// Test 3: Verificar registro
console.log('Hero registered:', isComponentRegistered('sections.hero-section')); // true
console.log('Unknown registered:', isComponentRegistered('sections.fake')); // false
```

Ejecutar:
```bash
npx tsx test-registry.ts
```

### 3.2 Test de componente desconocido

Crear página en Strapi con un section type que no existe:
- __component: `sections.fake-section`

Build y verificar que muestra el error UI:
```html
<div class="bg-red-50 border border-red-200">
  <p>Component Not Found</p>
  <code>sections.fake-section</code>
</div>
```

## Test 4: SEO y Metadata

### 4.1 Verificar meta tags

Build y abrir archivo HTML generado:

```bash
cat dist/academia-musica/index.html | grep -A 5 "<head>"
```

Verificar presencia de:
- `<title>` tag
- `<meta name="description">`
- `<link rel="canonical">`
- `<meta property="og:title">`
- `<meta property="og:image">`

### 4.2 Test de structured data

```bash
cat dist/academia-musica/index.html | grep "application/ld+json"
```

Debe mostrar JSON-LD schema si está configurado en Strapi.

### 4.3 Lighthouse Score

```bash
npm install -g @lhci/cli
lhci autorun --collect.url=http://localhost:4321/academia-musica
```

Objetivos:
- SEO: 100
- Performance: > 90
- Accessibility: > 90

## Test 5: Dynamic Page Renderer

### 5.1 Test de renderizado vacío

Crear página en Strapi sin sections.

Build y verificar que muestra empty state:
```html
<div class="text-center">
  <h2>No Content Available</h2>
  <p>This page doesn't have any content sections yet.</p>
</div>
```

### 5.2 Test de múltiples sections

Crear página con 5+ sections diferentes.

Build y verificar que:
1. Todas las sections renderizan en orden
2. No hay errores en consola
3. Props se pasan correctamente a cada componente

### 5.3 Test de props dinámicos

Verificar que cada section recibe sus props:

```astro
<!-- En cualquier section component -->
---
console.log('Section props:', Astro.props);
---
```

## Test 6: Errores y Edge Cases

### 6.1 Test: Backend no disponible

Detener Strapi backend:
```bash
cd backend
# Ctrl+C para detener
```

Build frontend:
```bash
cd frontend
npm run build
```

Resultado esperado:
- Build completa sin errores
- Páginas estáticas existentes siguen disponibles
- Console warnings sobre API errors

### 6.2 Test: Página inactiva

En Strapi, marcar una página como `isActive: false`.

Build y verificar que:
- La página NO se genera
- No existe archivo HTML en dist/

### 6.3 Test: Slug duplicado

Crear dos páginas con el mismo slug en Strapi.

Build y verificar comportamiento:
- Solo una se genera
- Console warning sobre duplicados

### 6.4 Test: Section sin __component

Modificar datos de Strapi para incluir section sin `__component`.

Resultado esperado:
- Error UI con mensaje claro
- No crashea el build
- Otras sections renderizan correctamente

## Test 7: Performance

### 7.1 Bundle Size Analysis

```bash
npm run build
npx vite-bundle-visualizer
```

Verificar que:
- No hay duplicación de código
- Chunks están optimizados
- Tree-shaking funcionó correctamente

### 7.2 Build Time

Medir tiempo de build con varias páginas:

```bash
time npm run build
```

Benchmarks:
- 1-10 páginas: < 5s
- 10-50 páginas: < 15s
- 50-100 páginas: < 30s

### 7.3 Lighthouse Performance

```bash
npm run preview
# En otra terminal:
lighthouse http://localhost:4321/academia-musica --view
```

Objetivos:
- First Contentful Paint: < 1s
- Largest Contentful Paint: < 2.5s
- Time to Interactive: < 3s

## Test 8: Developer Experience

### 8.1 Type Safety

Intentar pasar props incorrectos a un componente:

```astro
<!-- Debe fallar TypeScript check -->
<DynamicPageRenderer sections="invalid" />
```

### 8.2 IntelliSense

Verificar autocompletado en VS Code:
- Import de tipos
- Props de sections
- API de servicios

### 8.3 Error Messages

Verificar que los errores son claros:
```
✗ Component "sections.unknown" not found in registry.
  Available components: sections.hero-section, sections.features-section, ...
```

## Test 9: Integration Testing

### 9.1 Full E2E Flow

```bash
# 1. Crear página en Strapi
# 2. Agregar sections
# 3. Configurar SEO
# 4. Publish

# 5. Build frontend
cd frontend
npm run build

# 6. Preview
npm run preview

# 7. Verificar página
curl http://localhost:4321/nueva-pagina
```

### 9.2 Hot Reload (Dev Mode)

```bash
npm run dev
```

Modificar contenido en Strapi y verificar que:
- Los cambios se reflejan en hot reload
- No hay errores de hidratación

## Test 10: Production Simulation

### 10.1 Docker Build

```bash
cd frontend
docker build -t akdemiapp-frontend .
docker run -p 3000:3000 akdemiapp-frontend
```

Verificar acceso a http://localhost:3000

### 10.2 Production Environment

```bash
NODE_ENV=production npm run build
NODE_ENV=production npm run preview
```

Verificar:
- Minificación correcta
- No hay logs de desarrollo
- Assets optimizados

## Checklist Final

Antes de desplegar a producción:

- [ ] Todos los tests pasan
- [ ] Build sin errores ni warnings
- [ ] SEO score > 95 en Lighthouse
- [ ] Performance score > 90 en Lighthouse
- [ ] Accessibility score > 90 en Lighthouse
- [ ] Todas las páginas se generan correctamente
- [ ] Meta tags presentes en todas las páginas
- [ ] Structured data válido (schema.org)
- [ ] Images optimizadas
- [ ] No hay console errors en browser
- [ ] Links funcionan correctamente
- [ ] Formularios submiten correctamente
- [ ] Responsive en mobile/tablet/desktop
- [ ] Cross-browser testing (Chrome, Firefox, Safari)

## Troubleshooting

### Problema: "Cannot find module '@/services'"

**Solución:**
```bash
# Verificar tsconfig.json paths
cat tsconfig.json | grep "@/services"

# Restart TS server en VS Code
Cmd/Ctrl + Shift + P → "TypeScript: Restart TS Server"
```

### Problema: "Component not found in registry"

**Solución:**
1. Verificar que el componente está importado en `componentRegistry.ts`
2. Verificar que el key coincide exactamente con `__component`
3. Verificar que el componente existe en `src/components/sections/`

### Problema: "Page not generating"

**Solución:**
1. Verificar `isActive: true` en Strapi
2. Verificar que la página está published
3. Check console logs: `[...slug].astro: Generating...`
4. Verificar que backend está corriendo

### Problema: Build lento

**Solución:**
1. Verificar número de páginas: `npm run build | grep "Generating"`
2. Optimizar queries de Strapi (usar `fields` parameter)
3. Implementar caching de API responses
4. Consider incremental builds

## Scripts Útiles

### Limpiar y rebuild

```bash
rm -rf dist .astro
npm run build
```

### Watch mode para desarrollo

```bash
npm run dev -- --host 0.0.0.0
```

### Analizar bundle

```bash
npm run build
npx vite-bundle-visualizer dist/stats.html
```

### Verificar links rotos

```bash
npm install -g broken-link-checker
blc http://localhost:4321 -ro
```

## Recursos Adicionales

- [Astro Documentation](https://docs.astro.build)
- [Strapi Documentation](https://docs.strapi.io)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Lighthouse CI](https://github.com/GoogleChrome/lighthouse-ci)
