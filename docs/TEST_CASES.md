# Test Cases - Integración Frontend-Backend

## Overview

Este documento contiene todos los casos de prueba para validar la integración entre el frontend de Astro 5 y el backend de Strapi 5.

**Proyecto:** AkdemiApp
**Alcance:** Integración Frontend-Backend
**Última actualización:** 2025-11-12

---

## Leyenda

**Prioridad:**
- **Alta (P0):** Funcionalidad crítica, debe funcionar para deploy
- **Media (P1):** Funcionalidad importante, debería funcionar
- **Baja (P2):** Nice to have, puede fallar sin bloquear deploy

**Estado:**
- ⏳ Pendiente
- ✅ Pasado
- ❌ Fallado
- 🚫 Bloqueado

---

## Test Cases

| ID | Componente | Descripción | Prioridad | Estado |
|----|-----------|-------------|-----------|--------|
| TC-001 | Pricing Plans | Carga exitosa de planes desde API | P0 | ⏳ |
| TC-002 | Pricing Plans | Fallback cuando backend está caído | P0 | ⏳ |
| TC-003 | Pricing Plans | Manejo de plan sin features | P1 | ⏳ |
| TC-004 | Pricing Plans | Plan "popular" destacado visualmente | P1 | ⏳ |
| TC-005 | Pricing Plans | Formato de precio correcto | P1 | ⏳ |
| TC-006 | Features | Carga exitosa de características | P0 | ⏳ |
| TC-007 | Features | Iconos renderizados correctamente | P1 | ⏳ |
| TC-008 | Features | Layout responsive en mobile | P1 | ⏳ |
| TC-009 | Features | Fallback cuando backend está caído | P0 | ⏳ |
| TC-010 | Testimonials | Carga exitosa de testimonios | P0 | ⏳ |
| TC-011 | Testimonials | Avatares con imágenes optimizadas | P1 | ⏳ |
| TC-012 | Testimonials | Placeholder para avatares sin imagen | P1 | ⏳ |
| TC-013 | Testimonials | Texto largo truncado elegantemente | P2 | ⏳ |
| TC-014 | Testimonials | Carrusel funcional | P1 | ⏳ |
| TC-015 | Site Stats | Estadísticas dinámicas del backend | P0 | ⏳ |
| TC-016 | Site Stats | Formato de números con comas | P1 | ⏳ |
| TC-017 | Site Stats | Actualización tras cambios en Strapi | P0 | ⏳ |
| TC-018 | Site Stats | Manejo de valores extremos | P1 | ⏳ |
| TC-019 | Client Logos | Carrusel de logos funcional | P1 | ⏳ |
| TC-020 | Client Logos | Imágenes optimizadas | P1 | ⏳ |
| TC-021 | Client Logos | Animación de scroll infinito | P2 | ⏳ |
| TC-022 | Client Logos | Fallback sin backend | P1 | ⏳ |
| TC-023 | Use Case Benefits | Filtrado correcto por tipo de academia | P0 | ⏳ |
| TC-024 | Use Case Benefits | Beneficios únicos por página | P0 | ⏳ |
| TC-025 | Use Case Benefits | Manejo de categoría sin datos | P1 | ⏳ |
| TC-026 | Callback Form | Envío exitoso con datos válidos | P0 | ⏳ |
| TC-027 | Callback Form | Validación de campos obligatorios | P0 | ⏳ |
| TC-028 | Callback Form | Validación de formato de email | P0 | ⏳ |
| TC-029 | Callback Form | Validación de formato de teléfono | P1 | ⏳ |
| TC-030 | Callback Form | Mensaje de éxito tras envío | P0 | ⏳ |
| TC-031 | Callback Form | Registro creado en Strapi | P0 | ⏳ |
| TC-032 | Callback Form | Error del servidor manejado | P0 | ⏳ |
| TC-033 | Callback Form | Backend caído muestra error | P0 | ⏳ |
| TC-034 | Callback Form | Caracteres especiales preservados | P1 | ⏳ |
| TC-035 | Callback Form | Protección contra XSS | P0 | ⏳ |
| TC-036 | Callback Form | Prevención de envíos duplicados | P1 | ⏳ |
| TC-037 | Callback Form | Loading state durante envío | P1 | ⏳ |
| TC-038 | API Integration | CORS configurado correctamente | P0 | ⏳ |
| TC-039 | API Integration | Respuestas malformadas manejadas | P1 | ⏳ |
| TC-040 | API Integration | Timeout de red configurado | P1 | ⏳ |
| TC-041 | API Integration | Paginación para datasets grandes | P1 | ⏳ |
| TC-042 | API Integration | Imágenes faltantes con placeholder | P1 | ⏳ |
| TC-043 | Build Process | Build exitoso con backend activo | P0 | ⏳ |
| TC-044 | Build Process | Build exitoso sin backend | P0 | ⏳ |
| TC-045 | Build Process | HTML contiene datos reales | P0 | ⏳ |
| TC-046 | Build Process | Imágenes optimizadas generadas | P1 | ⏳ |
| TC-047 | Build Process | Assets hasheados para cache | P1 | ⏳ |
| TC-048 | Performance | Lighthouse Performance > 90 | P1 | ⏳ |
| TC-049 | Performance | First Contentful Paint < 2s | P1 | ⏳ |
| TC-050 | Performance | Largest Contentful Paint < 3s | P1 | ⏳ |
| TC-051 | Performance | Time to Interactive < 4s | P1 | ⏳ |
| TC-052 | Performance | Bundle size < 200KB | P1 | ⏳ |
| TC-053 | Accessibility | Alt text en todas las imágenes | P0 | ⏳ |
| TC-054 | Accessibility | Labels en campos de formulario | P0 | ⏳ |
| TC-055 | Accessibility | Focus states visibles | P0 | ⏳ |
| TC-056 | Accessibility | Contraste de colores WCAG AA | P0 | ⏳ |
| TC-057 | Accessibility | Navegación con teclado funcional | P0 | ⏳ |
| TC-058 | Responsive | Layout mobile (320px-640px) | P0 | ⏳ |
| TC-059 | Responsive | Layout tablet (641px-1024px) | P0 | ⏳ |
| TC-060 | Responsive | Layout desktop (1025px+) | P0 | ⏳ |

---

## Casos de Prueba Detallados

### TC-001: Carga Exitosa de Planes desde API

**Componente:** Pricing Plans (Pricing.astro)
**Prioridad:** Alta (P0)
**Estado:** ⏳ Pendiente

**Precondiciones:**
- Backend corriendo en `http://localhost:1337`
- Al menos 3 pricing plans creados en Strapi
- Todos los planes tienen `publishedAt` no nulo
- Permisos públicos configurados para lectura

**Pasos:**
1. Abrir navegador y navegar a `http://localhost:4321/`
2. Scroll a la sección de pricing
3. Abrir DevTools > Network tab
4. Filtrar por `pricing-plans`
5. Observar request y response

**Resultado Esperado:**
- Request HTTP 200 OK
- Response contiene array de planes en `data.data`
- Cada plan tiene: `name`, `price`, `description`, `features`
- Frontend muestra todos los planes con datos correctos
- Plan "popular" tiene badge visible
- Botones CTA funcionan

**Criterios de Aceptación:**
- Response time < 1s
- No errores en console
- Layout responsive funcional

---

### TC-002: Fallback Cuando Backend Está Caído

**Componente:** Pricing Plans (Pricing.astro)
**Prioridad:** Alta (P0)
**Estado:** ⏳ Pendiente

**Precondiciones:**
- Frontend en modo dev o preview
- Backend detenido (Strapi no corriendo)

**Pasos:**
1. Detener Strapi (`Ctrl+C` en terminal backend)
2. Navegar a `http://localhost:4321/`
3. Observar sección de pricing
4. Abrir Console en DevTools

**Resultado Esperado:**
- No se muestra error visible al usuario
- Se muestran 3 planes de fallback:
  - Plan Básico (Free)
  - Plan Profesional ($29/mes)
  - Plan Empresa ($99/mes)
- Diseño mantiene estructura visual
- Console muestra error de fetch (esperado, no crítico)
- Botones CTA funcionan (aunque sin funcionalidad real)

**Criterios de Aceptación:**
- UX no se degrada
- Usuario no ve mensaje técnico de error
- Layout no roto

---

### TC-003: Manejo de Plan sin Features

**Componente:** Pricing Plans (Pricing.astro)
**Prioridad:** Media (P1)
**Estado:** ⏳ Pendiente

**Precondiciones:**
- Backend corriendo
- Crear en Strapi un plan con:
  - Nombre: "Plan Test"
  - Precio: 19
  - Descripción completa
  - Features: [] (vacío)
  - publishedAt: fecha actual

**Pasos:**
1. Publicar el plan en Strapi
2. Recargar frontend
3. Localizar "Plan Test" en la página

**Resultado Esperado:**
- Plan se muestra sin errores
- Nombre, precio y descripción visibles
- Sección de features muestra:
  - Lista vacía, o
  - Mensaje "Características próximamente", o
  - Se oculta la sección
- No errores de JavaScript
- Botón CTA presente y funcional

**Criterios de Aceptación:**
- No crash de componente
- Layout mantiene estructura

---

### TC-004: Plan "Popular" Destacado Visualmente

**Componente:** Pricing Plans (Pricing.astro)
**Prioridad:** Media (P1)
**Estado:** ⏳ Pendiente

**Precondiciones:**
- Backend corriendo
- Al menos un plan con campo `popular: true` en Strapi

**Pasos:**
1. En Strapi, marcar un plan como popular
2. Recargar frontend
3. Observar diseño visual del plan popular

**Resultado Esperado:**
- Plan popular tiene badge "Más Popular" o similar
- Badge con color destacado (primary, accent)
- Posiblemente card con borde diferente o sombra
- Plan posicionado centralmente (si hay 3 planes)
- Botón CTA puede tener estilo diferente

**Criterios de Aceptación:**
- Diferenciación visual clara
- Badge responsive en mobile

---

### TC-005: Formato de Precio Correcto

**Componente:** Pricing Plans (Pricing.astro)
**Prioridad:** Media (P1)
**Estado:** ⏳ Pendiente

**Precondiciones:**
- Backend corriendo
- Planes con diferentes tipos de precio:
  - Precio 0 (Free)
  - Precio entero (29)
  - Precio decimal (29.99)
  - Precio alto (1999)

**Pasos:**
1. Crear planes con precios variados
2. Recargar frontend
3. Observar formato de cada precio

**Resultado Esperado:**
- Precio 0: "Gratis" o "Free"
- Precio entero: "$29" o "$29/mes"
- Precio decimal: "$29.99" o "$29,99" (según locale)
- Precio alto: "$1,999" (con separador de miles)
- Símbolo de moneda correcto ($, €, etc.)
- Frecuencia visible (/mes, /año)

**Criterios de Aceptación:**
- Formato consistente entre planes
- Localización correcta

---

### TC-006: Carga Exitosa de Características

**Componente:** Features (Features.astro)
**Prioridad:** Alta (P0)
**Estado:** ⏳ Pendiente

**Precondiciones:**
- Backend corriendo
- Al menos 6 features creadas en Strapi
- Todas con: `title`, `description`, `icon`
- Publicadas

**Pasos:**
1. Navegar a página principal
2. Localizar sección de features
3. Abrir Network tab
4. Observar request a `/api/features`

**Resultado Esperado:**
- Request HTTP 200 OK
- Response con 6+ features
- Cada feature renderizada con:
  - Icono visible (SVG o icon font)
  - Título claro
  - Descripción legible
- Grid layout (2 columnas en mobile, 3-4 en desktop)
- Animaciones de entrada (fadeIn, slideUp)

**Criterios de Aceptación:**
- Response time < 1s
- No errores en console
- Layout responsive

---

### TC-007: Iconos Renderizados Correctamente

**Componente:** Features (Features.astro)
**Prioridad:** Media (P1)
**Estado:** ⏳ Pendiente

**Precondiciones:**
- Backend corriendo
- Features con diferentes iconos:
  - "rocket" → 🚀
  - "star" → ⭐
  - "heart" → ❤️
  - etc.

**Pasos:**
1. Verificar en Strapi que features tienen iconos variados
2. Recargar frontend
3. Inspeccionar cada icono visualmente

**Resultado Esperado:**
- Cada feature muestra icono único
- Iconos con tamaño consistente (32x32 o 48x48)
- Color del tema aplicado (primary, secondary)
- Si icono no existe, mostrar icono default o placeholder

**Criterios de Aceptación:**
- No iconos rotos (missing)
- Accesibilidad: iconos decorativos con aria-hidden

---

### TC-008: Layout Responsive en Mobile

**Componente:** Features (Features.astro)
**Prioridad:** Media (P1)
**Estado:** ⏳ Pendiente

**Precondiciones:**
- Frontend corriendo
- Features cargadas

**Pasos:**
1. Abrir DevTools > Device Toolbar
2. Seleccionar iPhone SE (375x667)
3. Observar layout de features
4. Probar scroll
5. Cambiar a iPad (768x1024)
6. Cambiar a Desktop (1920x1080)

**Resultado Esperado:**
- **Mobile (< 640px):** 1 columna, features stacked
- **Tablet (640-1024px):** 2 columnas
- **Desktop (> 1024px):** 3-4 columnas
- Espaciado consistente en todos los breakpoints
- Texto legible sin zoom
- No overflow horizontal

**Criterios de Aceptación:**
- No elementos cortados
- Interactividad funcional (tap targets > 44px)

---

### TC-009: Fallback Cuando Backend Está Caído

**Componente:** Features (Features.astro)
**Prioridad:** Alta (P0)
**Estado:** ⏳ Pendiente

**Precondiciones:**
- Backend detenido

**Pasos:**
1. Detener Strapi
2. Navegar a frontend
3. Localizar sección de features

**Resultado Esperado:**
- Se muestran 6 features de fallback predefinidas
- Ejemplos:
  - "Gestión de Matrículas"
  - "Calendario Integrado"
  - "Pagos Online"
  - "Comunicación Centralizada"
  - "Reportes Automáticos"
  - "App Móvil"
- Layout idéntico a datos reales
- No errores visibles

**Criterios de Aceptación:**
- Experiencia de usuario no degradada
- No mensajes técnicos de error

---

### TC-010: Carga Exitosa de Testimonios

**Componente:** Testimonials (TestimonialFeature)
**Prioridad:** Alta (P0)
**Estado:** ⏳ Pendiente

**Precondiciones:**
- Backend corriendo
- 4-5 testimonios en Strapi con:
  - `authorName`
  - `content`
  - `authorRole`
  - `academyName`
  - `rating` (1-5)
  - `avatar` (opcional)
  - `publishedAt`

**Pasos:**
1. Navegar a sección de testimonios
2. Observar Network request a `/api/testimonials`
3. Verificar renderizado

**Resultado Esperado:**
- Request HTTP 200 OK
- Todos los testimonios visibles
- Cada testimonio muestra:
  - Avatar (imagen o placeholder)
  - Nombre del autor
  - Rol (ej: "Directora")
  - Academia (ej: "Ballet Clásico Madrid")
  - Texto del testimonio
  - Rating stars (si aplica)
- Carrusel navegable (flechas o dots)

**Criterios de Aceptación:**
- Response time < 1s
- Imágenes optimizadas (webp)
- No errores en console

---

### TC-011: Avatares con Imágenes Optimizadas

**Componente:** Testimonials (TestimonialFeature)
**Prioridad:** Media (P1)
**Estado:** ⏳ Pendiente

**Precondiciones:**
- Backend corriendo
- Testimonios con imágenes subidas en Strapi

**Pasos:**
1. En Strapi, subir imágenes de avatar (JPEG, PNG)
2. Recargar frontend
3. Inspeccionar elemento de imagen en DevTools

**Resultado Esperado:**
- Imágenes en formato moderno (webp, avif)
- Múltiples tamaños generados (srcset)
- Lazy loading habilitado
- Dimensiones fijas para evitar layout shift
- No distorsión de imágenes

**Criterios de Aceptación:**
- Tamaño de imagen < 100KB
- Formato webp o avif
- CLS (Cumulative Layout Shift) bajo

---

### TC-012: Placeholder para Avatares sin Imagen

**Componente:** Testimonials (TestimonialFeature)
**Prioridad:** Media (P1)
**Estado:** ⏳ Pendiente

**Precondiciones:**
- Backend corriendo
- Al menos un testimonio sin avatar

**Pasos:**
1. Crear testimonio en Strapi sin subir avatar
2. Publicar
3. Recargar frontend
4. Observar testimonio sin avatar

**Resultado Esperado:**
- Placeholder visible en lugar de imagen
- Opciones para placeholder:
  - Iniciales del autor (ej: "JP" para Juan Pérez)
  - Icono de usuario genérico
  - Imagen default
- Placeholder con mismo tamaño que avatares reales
- Color de fondo del tema

**Criterios de Aceptación:**
- No error 404 de imagen
- Layout consistente

---

### TC-013: Texto Largo Truncado Elegantemente

**Componente:** Testimonials (TestimonialFeature)
**Prioridad:** Baja (P2)
**Estado:** ⏳ Pendiente

**Precondiciones:**
- Backend corriendo
- Testimonio con texto > 300 caracteres

**Pasos:**
1. Crear testimonio con texto muy largo (500+ caracteres)
2. Publicar
3. Recargar frontend
4. Observar renderizado del texto

**Resultado Esperado:**
- Texto truncado a ~200-250 caracteres
- Elipsis al final ("...")
- Botón "Leer más" o "Ver completo" (opcional)
- Al hacer click, expandir texto completo
- No overflow del contenedor
- Responsive: truncado más corto en mobile

**Criterios de Aceptación:**
- Layout no roto por texto largo
- UX intuitivo

---

### TC-014: Carrusel Funcional

**Componente:** Testimonials (TestimonialFeature)
**Prioridad:** Media (P1)
**Estado:** ⏳ Pendiente

**Precondiciones:**
- Frontend corriendo
- Al menos 3 testimonios cargados

**Pasos:**
1. Navegar a sección de testimonios
2. Observar carrusel
3. Click en flecha derecha
4. Click en flecha izquierda
5. Click en dots/indicators (si aplica)
6. Esperar 5 segundos (auto-advance)

**Resultado Esperado:**
- Flechas de navegación visibles
- Click derecha: avanza al siguiente testimonio
- Click izquierda: retrocede al anterior
- Transición suave (slide o fade)
- Auto-advance cada 5-7 segundos (opcional)
- Loop infinito (después del último, vuelve al primero)
- Dots/indicators muestran posición actual

**Criterios de Aceptación:**
- Navegación fluida (60 fps)
- Responsive: swipe en mobile
- Accesibilidad: navegación con teclado

---

### TC-015: Estadísticas Dinámicas del Backend

**Componente:** Site Stats (Hero + CTA)
**Prioridad:** Alta (P0)
**Estado:** ⏳ Pendiente

**Precondiciones:**
- Backend corriendo
- Site stats configuradas en Strapi:
  - `totalStudents`: 1500
  - `totalAcademies`: 75
  - `satisfactionRate`: 98.5
  - `activeInstructors`: 300

**Pasos:**
1. Navegar a página principal
2. Observar sección de stats (hero o CTA)
3. Verificar Network request a `/api/site-stats`

**Resultado Esperado:**
- Request HTTP 200 OK
- Stats mostradas:
  - "1,500 Estudiantes" (con coma)
  - "75 Academias"
  - "98.5% Satisfacción" (con decimal)
  - "300 Instructores"
- Animación de números (count-up) al hacer scroll (opcional)
- Labels traducidos al español

**Criterios de Aceptación:**
- Números formateados correctamente
- Response time < 500ms
- No errores en console

---

### TC-016: Formato de Números con Comas

**Componente:** Site Stats
**Prioridad:** Media (P1)
**Estado:** ⏳ Pendiente

**Precondiciones:**
- Backend corriendo
- Stats con números grandes:
  - `totalStudents`: 12345

**Pasos:**
1. Configurar stat con número grande
2. Recargar frontend
3. Observar formato

**Resultado Esperado:**
- Número mostrado: "12,345" o "12.345" (según locale)
- Separador de miles aplicado
- Porcentajes con un decimal: "98.5%"
- No notación científica (1.2e4)

**Criterios de Aceptación:**
- Formato consistente
- Localización correcta (ES: 12.345, US: 12,345)

---

### TC-017: Actualización tras Cambios en Strapi

**Componente:** Site Stats
**Prioridad:** Alta (P0)
**Estado:** ⏳ Pendiente

**Precondiciones:**
- Backend corriendo
- Frontend con stats iniciales

**Pasos:**
1. Anotar stats actuales en frontend
2. En Strapi admin, modificar números:
   - `totalStudents`: 2000 (cambio de 1500)
3. Guardar en Strapi
4. **Rebuild frontend:** `npm run build`
5. Preview: `npm run preview`
6. Observar nuevas stats

**Resultado Esperado:**
- Nuevos números reflejados en frontend
- Sin necesidad de cambiar código
- Solo rebuild y redeploy

**Criterios de Aceptación:**
- Stats actualizadas correctamente
- Build sin errores

**Nota:** En SSG, cambios de contenido requieren rebuild. En SSR, cambios serían inmediatos.

---

### TC-018: Manejo de Valores Extremos

**Componente:** Site Stats
**Prioridad:** Media (P1)
**Estado:** ⏳ Pendiente

**Precondiciones:**
- Backend corriendo

**Pasos:**
1. Configurar stats con valores extremos:
   - `totalStudents`: 9999999
   - `totalAcademies`: 0
   - `satisfactionRate`: 100
   - `activeInstructors`: 1
2. Recargar frontend

**Resultado Esperado:**
- Número grande: "9,999,999" formateado
- Cero: "0 Academias" (no oculto)
- 100%: "100% Satisfacción" (sin decimal innecesario)
- Singular: "1 Instructor" (no "Instructores")
- Layout no roto por números largos

**Criterios de Aceptación:**
- No overflow visual
- Pluralización correcta (si aplica)

---

### TC-019: Carrusel de Logos Funcional

**Componente:** Client Logos (LogoCarousel.astro)
**Prioridad:** Media (P1)
**Estado:** ⏳ Pendiente

**Precondiciones:**
- Backend corriendo
- 6+ client logos en Strapi con imágenes

**Pasos:**
1. Navegar a sección de clientes
2. Observar carrusel de logos
3. Esperar 10 segundos

**Resultado Esperado:**
- Logos en fila horizontal
- Animación de scroll automático (lento)
- Loop infinito sin corte visual
- Logos en escala de grises (grayscale filter)
- Hover: logo en color
- Click: link a sitio del cliente (opcional)

**Criterios de Aceptación:**
- Animación fluida (60 fps)
- No glitches en loop
- Responsive en mobile

---

### TC-020: Imágenes Optimizadas

**Componente:** Client Logos
**Prioridad:** Media (P1)
**Estado:** ⏳ Pendiente

**Precondiciones:**
- Backend corriendo
- Logos subidos en varios formatos (PNG, JPEG, SVG)

**Pasos:**
1. En Strapi, subir logos (recomendado SVG o PNG transparente)
2. Recargar frontend
3. Inspeccionar imágenes en DevTools

**Resultado Esperado:**
- SVG renderizado directamente (mejor opción)
- PNG/JPEG convertido a webp/avif
- Tamaño de archivo < 50KB por logo
- Dimensiones consistentes (height: 48px o similar)
- No distorsión

**Criterios de Aceptación:**
- Todas las imágenes cargan
- Formato óptimo (SVG > webp > PNG)
- Lazy loading (si está fuera del viewport inicial)

---

### TC-021: Animación de Scroll Infinito

**Componente:** Client Logos
**Prioridad:** Baja (P2)
**Estado:** ⏳ Pendiente

**Precondiciones:**
- Frontend corriendo
- Al menos 6 logos

**Pasos:**
1. Navegar a sección de logos
2. Observar animación
3. Medir velocidad de scroll
4. Esperar que complete un loop (todos los logos pasan)
5. Verificar que vuelve a empezar sin corte

**Resultado Esperado:**
- Animación CSS o JavaScript
- Velocidad constante (~30-40 segundos por loop completo)
- Sin salto visual al reiniciar loop
- Técnica: duplicar logos para loop seamless
- Pausa al hover (opcional)

**Criterios de Aceptación:**
- No jank (movimiento suave)
- Loop infinito sin cortes

---

### TC-022: Fallback sin Backend

**Componente:** Client Logos
**Prioridad:** Media (P1)
**Estado:** ⏳ Pendiente

**Precondiciones:**
- Backend detenido

**Pasos:**
1. Detener Strapi
2. Recargar frontend
3. Observar sección de logos

**Resultado Esperado:**
- Se muestran 6 logos de fallback (imágenes locales o placeholders)
- Carrusel funciona igual
- Layout idéntico
- No errores visibles

**Criterios de Aceptación:**
- UX no degradada
- Fallback indistinguible visualmente

---

### TC-023: Filtrado Correcto por Tipo de Academia

**Componente:** Use Case Benefits (UseCaseFeatures)
**Prioridad:** Alta (P0)
**Estado:** ⏳ Pendiente

**Precondiciones:**
- Backend corriendo
- Beneficios creados para múltiples tipos:
  - 3 beneficios tipo "danzas"
  - 3 beneficios tipo "artes-marciales"
  - 3 beneficios tipo "deportiva"

**Pasos:**
1. Navegar a `/danzas`
2. Observar sección de beneficios
3. Verificar Network request: `/api/use-case-benefits?filters[type][$eq]=danzas`
4. Navegar a `/artes-marciales`
5. Verificar request con filtro `artes-marciales`

**Resultado Esperado:**
- Cada página muestra solo beneficios de su tipo
- Request incluye filtro correcto
- No se muestran beneficios de otros tipos
- Response contiene solo items con `type` correcto

**Criterios de Aceptación:**
- Filtrado preciso (sin data leakage)
- No errores en console
- Response time < 1s

---

### TC-024: Beneficios Únicos por Página

**Componente:** Use Case Benefits
**Prioridad:** Alta (P0)
**Estado:** ⏳ Pendiente

**Precondiciones:**
- Backend corriendo
- Beneficios específicos por tipo

**Pasos:**
1. Navegar entre páginas:
   - `/danzas`
   - `/artes-marciales`
   - `/deportiva`
   - `/musica`
   - `/artes-escenicas`
   - `/pre-escolar`
2. Anotar beneficios de cada página
3. Comparar

**Resultado Esperado:**
- Cada página tiene beneficios únicos
- Ejemplos:
  - **Danzas:** "Gestión de Coreografías", "Vestuario y Recitales"
  - **Artes Marciales:** "Cinturones y Grados", "Competencias"
  - **Deportiva:** "Estadísticas de Rendimiento", "Equipos y Ligas"
- No duplicados entre tipos
- Al menos 3 beneficios por tipo

**Criterios de Aceptación:**
- Contenido relevante por tipo
- No overlaps incorrectos

---

### TC-025: Manejo de Categoría sin Datos

**Componente:** Use Case Benefits
**Prioridad:** Media (P1)
**Estado:** ⏳ Pendiente

**Precondiciones:**
- Backend corriendo
- Crear página nueva (ej: `/idiomas`) sin beneficios en Strapi

**Pasos:**
1. Navegar a página sin beneficios asociados
2. Observar sección de beneficios

**Resultado Esperado:**
- Opción A: Mensaje "Próximamente" o "Características en desarrollo"
- Opción B: Beneficios genéricos de fallback
- Opción C: Sección oculta completamente
- No error JavaScript
- Layout no roto

**Criterios de Aceptación:**
- Experiencia de usuario aceptable
- No mensajes técnicos de error

---

### TC-026: Envío Exitoso con Datos Válidos

**Componente:** Callback Form (CallbackForm.astro)
**Prioridad:** Alta (P0)
**Estado:** ⏳ Pendiente

**Precondiciones:**
- Backend corriendo
- Permisos públicos para POST en `callback-requests`
- Frontend con formulario visible

**Pasos:**
1. Navegar a formulario de callback
2. Rellenar campos:
   - **Nombre:** Juan Pérez
   - **Email:** juan@example.com
   - **Teléfono:** +34 600 123 456
   - **Mensaje:** Quiero más información sobre precios
3. Click en "Enviar" o "Solicitar llamada"
4. Observar Network tab

**Resultado Esperado:**
- Request POST a `http://localhost:1337/api/callback-requests`
- Request body con datos en formato JSON:
  ```json
  {
    "data": {
      "name": "Juan Pérez",
      "email": "juan@example.com",
      "phone": "+34 600 123 456",
      "message": "Quiero más información sobre precios",
      "status": "pending"
    }
  }
  ```
- Response HTTP 200 OK
- Mensaje de éxito visible: "¡Gracias! Te contactaremos pronto"
- Formulario limpiado o deshabilitado
- Botón de envío deshabilitado durante request (loading state)

**Criterios de Aceptación:**
- Request completa en < 2s
- No errores en console
- UX clara (feedback inmediato)

---

### TC-027: Validación de Campos Obligatorios

**Componente:** Callback Form
**Prioridad:** Alta (P0)
**Estado:** ⏳ Pendiente

**Precondiciones:**
- Frontend con formulario visible

**Pasos:**
1. Navegar a formulario
2. Dejar todos los campos vacíos
3. Click en "Enviar"
4. Observar comportamiento

**Resultado Esperado:**
- No se envía request al backend
- Mensajes de error visibles:
  - "El nombre es obligatorio"
  - "El email es obligatorio"
  - "El teléfono es obligatorio"
  - "El mensaje es obligatorio"
- Campos con borde rojo o estilo de error
- Focus automático en primer campo inválido
- Botón "Enviar" se mantiene habilitado (para reintentar)

**Criterios de Aceptación:**
- Validación en client-side (instantánea)
- Mensajes claros y en español
- Accesibilidad: aria-invalid, aria-describedby

---

### TC-028: Validación de Formato de Email

**Componente:** Callback Form
**Prioridad:** Alta (P0)
**Estado:** ⏳ Pendiente

**Precondiciones:**
- Frontend con formulario

**Pasos:**
1. Rellenar todos los campos
2. En email, ingresar valores inválidos:
   - "juan" (sin @)
   - "juan@" (sin dominio)
   - "@example.com" (sin local-part)
   - "juan @example.com" (con espacio)
3. Intentar enviar cada vez

**Resultado Esperado:**
- Validación detecta email inválido
- Mensaje de error: "Email inválido" o "Formato de email incorrecto"
- No se envía request
- Campo email con estilo de error
- Validación en tiempo real (onChange o onBlur)

**Criterios de Aceptación:**
- Validación con regex estándar de email
- Acepta emails válidos como:
  - "test+tag@example.com"
  - "user.name@subdomain.example.com"

---

### TC-029: Validación de Formato de Teléfono

**Componente:** Callback Form
**Prioridad:** Media (P1)
**Estado:** ⏳ Pendiente

**Precondiciones:**
- Frontend con formulario

**Pasos:**
1. Rellenar formulario
2. En teléfono, ingresar:
   - "123" (muy corto)
   - "abcdefghij" (letras)
   - "600-123-456" (con guiones, válido)
   - "+34 600 123 456" (con código país, válido)
   - "(600) 123-456" (formato US)
3. Intentar enviar

**Resultado Esperado:**
- Validación acepta formatos comunes:
  - Números con/sin espacios
  - Con/sin código país (+34, +1, etc.)
  - Con/sin guiones o paréntesis
- Rechaza:
  - Menos de 9 dígitos
  - Solo letras
- Mensaje de error claro
- Opcionalmente: formateo automático mientras se escribe

**Criterios de Aceptación:**
- Validación flexible (acepta formatos internacionales)
- Mensaje de error: "Teléfono inválido (mín. 9 dígitos)"

---

### TC-030: Mensaje de Éxito tras Envío

**Componente:** Callback Form
**Prioridad:** Alta (P0)
**Estado:** ⏳ Pendiente

**Precondiciones:**
- Backend corriendo
- Formulario con datos válidos

**Pasos:**
1. Rellenar y enviar formulario correctamente
2. Esperar respuesta del servidor
3. Observar UI

**Resultado Esperado:**
- Mensaje de éxito mostrado:
  - Opción A: Alert/toast: "¡Gracias! Te contactaremos pronto"
  - Opción B: Inline message debajo del formulario
  - Opción C: Modal de confirmación
- Mensaje con icono de éxito (✓, ✅)
- Color verde o positivo
- Formulario limpiado o reemplazado por mensaje
- Opcionalmente: contador de tiempo ("Cerrar en 5s")

**Criterios de Aceptación:**
- Mensaje claro y visible
- Usuario sabe que acción fue exitosa
- Accesibilidad: anuncio con aria-live

---

### TC-031: Registro Creado en Strapi

**Componente:** Callback Form + Strapi Backend
**Prioridad:** Alta (P0)
**Estado:** ⏳ Pendiente

**Precondiciones:**
- Backend corriendo
- Formulario enviado exitosamente

**Pasos:**
1. Enviar formulario desde frontend
2. Esperar confirmación de éxito
3. Ir a Strapi admin panel: `http://localhost:1337/admin`
4. Navegar a Content Manager > Callback Requests
5. Buscar registro más reciente

**Resultado Esperado:**
- Registro existe en Strapi
- Datos correctos:
  - Name: "Juan Pérez"
  - Email: "juan@example.com"
  - Phone: "+34 600 123 456"
  - Message: "Quiero más información sobre precios"
  - Status: "pending"
- Timestamps:
  - createdAt: fecha/hora actual
  - updatedAt: fecha/hora actual
  - publishedAt: puede ser null
- ID único asignado

**Criterios de Aceptación:**
- Integridad de datos 100%
- No corrupción de caracteres (encoding UTF-8)

---

### TC-032: Error del Servidor Manejado

**Componente:** Callback Form
**Prioridad:** Alta (P0)
**Estado:** ⏳ Pendiente

**Precondiciones:**
- Backend corriendo pero con error configurado
- Opción 1: Desactivar permisos POST en Strapi
- Opción 2: Modificar Strapi para retornar 500

**Pasos:**
1. En Strapi admin, ir a Settings > Roles > Public
2. Desactivar permiso "create" para callback-requests
3. En frontend, rellenar y enviar formulario
4. Observar respuesta

**Resultado Esperado:**
- Request POST retorna HTTP 403 (Forbidden) o 500
- Frontend detecta error
- Mensaje de error mostrado:
  - "Error al enviar solicitud. Por favor, intenta de nuevo."
  - "No se pudo enviar el formulario. Verifica los datos."
- Formulario NO se limpia (datos preservados)
- Botón "Enviar" vuelve a habilitarse (permitir reintento)
- Opcionalmente: botón "Reintentar"

**Criterios de Aceptación:**
- Error manejado gracefully
- Usuario puede reintentar
- No crash de aplicación

---

### TC-033: Backend Caído Muestra Error

**Componente:** Callback Form
**Prioridad:** Alta (P0)
**Estado:** ⏳ Pendiente

**Precondiciones:**
- Backend detenido (Strapi no corriendo)

**Pasos:**
1. Detener Strapi: `Ctrl+C`
2. En frontend, rellenar formulario
3. Intentar enviar
4. Observar respuesta

**Resultado Esperado:**
- Request falla con error de red (ECONNREFUSED, fetch failed)
- Frontend captura error
- Mensaje claro:
  - "Servicio no disponible temporalmente. Intenta más tarde."
  - "No se pudo conectar al servidor. Verifica tu conexión."
- Formulario mantiene datos
- Botón habilitado para reintentar
- No error técnico visible (no mostrar stack trace)

**Criterios de Aceptación:**
- UX comprensible para usuario no técnico
- Datos preservados
- No crash

---

### TC-034: Caracteres Especiales Preservados

**Componente:** Callback Form
**Prioridad:** Media (P1)
**Estado:** ⏳ Pendiente

**Precondiciones:**
- Backend corriendo

**Pasos:**
1. Rellenar formulario con caracteres especiales:
   - **Nombre:** María José O'Brien-García
   - **Email:** test+tag@example.com
   - **Teléfono:** +34 600-123-456
   - **Mensaje:** ¿Cuánto cuesta? ¡Quiero info! 😊 Ñandú & "Capoeira"
2. Enviar
3. Verificar en Strapi admin que datos se guardaron

**Resultado Esperado:**
- Envío exitoso
- Datos en Strapi sin corrupción:
  - Acentos preservados (á, é, í, ó, ú)
  - Ñ preservada
  - Apóstrofes (') y guiones (-)
  - Email con + (válido)
  - Emojis guardados (😊)
  - Comillas dobles y símbolos (&)
- No encoding issues (no "MÃ¡ría" en lugar de "María")

**Criterios de Aceptación:**
- Encoding UTF-8 correcto
- Caracteres especiales intactos

---

### TC-035: Protección contra XSS

**Componente:** Callback Form
**Prioridad:** Alta (P0)
**Estado:** ⏳ Pendiente

**Precondiciones:**
- Backend corriendo

**Pasos:**
1. Intentar inyectar código malicioso:
   - **Nombre:** `<script>alert('XSS')</script>`
   - **Email:** `test@example.com<script>alert('XSS')</script>`
   - **Mensaje:** `<img src=x onerror=alert('XSS')>`
2. Enviar formulario
3. Verificar en Strapi admin
4. Recargar página en frontend (si datos se muestran en algún lado)

**Resultado Esperado:**
- Datos guardados en Strapi como texto plano (escapados):
  - `&lt;script&gt;alert('XSS')&lt;/script&gt;`
- Si datos se renderizan en frontend, HTML escapado
- No ejecución de JavaScript
- Validación: rechazar HTML tags (opcional)

**Criterios de Aceptación:**
- Sin vulnerabilidades XSS
- Strapi sanitiza inputs por default
- Frontend escapa outputs si aplica

---

### TC-036: Prevención de Envíos Duplicados

**Componente:** Callback Form
**Prioridad:** Media (P1)
**Estado:** ⏳ Pendiente

**Precondiciones:**
- Backend corriendo

**Pasos:**
1. Rellenar formulario
2. Click rápido múltiple (doble-click) en botón "Enviar"
3. Observar Network tab
4. Verificar registros en Strapi

**Resultado Esperado:**
- Solo UN request POST enviado
- Botón deshabilitado inmediatamente después del primer click
- Loading state visible (spinner, "Enviando...")
- Segundo click ignorado (button disabled)
- Solo UN registro creado en Strapi

**Criterios de Aceptación:**
- Técnica: debounce o flag de "isSubmitting"
- No duplicados en base de datos

---

### TC-037: Loading State Durante Envío

**Componente:** Callback Form
**Prioridad:** Media (P1)
**Estado:** ⏳ Pendiente

**Precondiciones:**
- Backend corriendo (opcionalmente con latencia simulada)

**Pasos:**
1. Rellenar formulario
2. Click en "Enviar"
3. Observar UI durante request (antes de recibir respuesta)

**Resultado Esperado:**
- Botón muestra loading:
  - Texto cambia: "Enviando..."
  - Spinner visible
  - Botón deshabilitado
- Opcionalmente: overlay sobre formulario
- Campos deshabilitados (no editables durante envío)
- Cursor: wait/progress

**Criterios de Aceptación:**
- Feedback visual claro
- Usuario sabe que acción está en progreso

---

### TC-038: CORS Configurado Correctamente

**Componente:** API Integration
**Prioridad:** Alta (P0)
**Estado:** ⏳ Pendiente

**Precondiciones:**
- Backend corriendo
- Frontend corriendo en `http://localhost:4321`
- CORS habilitado en Strapi

**Pasos:**
1. Abrir DevTools > Console
2. Hacer cualquier request desde frontend (ej: cargar pricing plans)
3. Observar errores de CORS

**Resultado Esperado:**
- No errores CORS en console
- Response headers incluyen:
  - `Access-Control-Allow-Origin: http://localhost:4321` (o `*`)
  - `Access-Control-Allow-Methods: GET, POST, PUT, DELETE`
  - `Access-Control-Allow-Headers: Content-Type, Authorization`
- Requests exitosos

**Validación en Backend:**
```typescript
// config/middlewares.ts
cors: {
  origin: ['http://localhost:4321', 'http://localhost:3000'],
  credentials: true,
}
```

**Criterios de Aceptación:**
- Todas las requests funcionan
- Sin errores CORS

---

### TC-039: Respuestas Malformadas Manejadas

**Componente:** API Integration
**Prioridad:** Media (P1)
**Estado:** ⏳ Pendiente

**Precondiciones:**
- Backend corriendo
- Crear registro con datos incompletos (campos null)

**Pasos:**
1. En Strapi, crear pricing plan con:
   - Name: null
   - Price: null
   - Description: ""
2. Publicar
3. Recargar frontend

**Resultado Esperado:**
- Frontend no crashea
- Componente maneja campos null/undefined:
  - Name: mostrar "Sin nombre" o ocultar
  - Price: mostrar "Gratis" o "Precio no disponible"
  - Description: ocultar o mostrar placeholder
- No errores "Cannot read property 'X' of undefined"
- Defensive programming: optional chaining (?)

**Criterios de Aceptación:**
- Aplicación resiliente
- Manejo de edge cases

---

### TC-040: Timeout de Red Configurado

**Componente:** API Integration (src/lib/api.ts)
**Prioridad:** Media (P1)
**Estado:** ⏳ Pendiente

**Precondiciones:**
- Backend corriendo con latencia alta simulada
- O backend detenido

**Pasos:**
1. Simular latencia en Network tab (DevTools > Network > Throttling: Slow 3G)
2. Recargar frontend
3. Observar behavior

**Resultado Esperado:**
- Request no espera indefinidamente
- Timeout configurado (ej: 10 segundos)
- Después de timeout, request aborta
- Error manejado: "Request timeout"
- Fallback data mostrada

**Validación en Código:**
```typescript
// src/lib/api.ts
const controller = new AbortController();
const timeout = setTimeout(() => controller.abort(), 10000);
fetch(url, { signal: controller.signal });
```

**Criterios de Aceptación:**
- No requests infinitos
- UX no bloqueada

---

### TC-041: Paginación para Datasets Grandes

**Componente:** API Integration
**Prioridad:** Media (P1)
**Estado:** ⏳ Pendiente

**Precondiciones:**
- Backend corriendo
- 100+ registros de testimonials en Strapi

**Pasos:**
1. Crear 100 testimonials en Strapi
2. Recargar frontend
3. Observar Network request a `/api/testimonials`

**Resultado Esperado:**
- Request incluye paginación:
  - `?pagination[page]=1&pagination[pageSize]=25`
- Solo 25 testimonials cargados inicialmente
- Performance aceptable (< 2s)
- Opcionalmente: "Cargar más" o paginación en frontend

**Criterios de Aceptación:**
- No cargar todos los registros de una vez
- Response size < 1 MB

---

### TC-042: Imágenes Faltantes con Placeholder

**Componente:** API Integration + Images
**Prioridad:** Media (P1)
**Estado:** ⏳ Pendiente

**Precondiciones:**
- Backend corriendo
- Registro con imagen, luego borrar archivo físico

**Pasos:**
1. Crear testimonial con avatar en Strapi
2. Anotar URL de imagen (ej: `http://localhost:1337/uploads/avatar_123.jpg`)
3. Manualmente borrar archivo en `backend/public/uploads/avatar_123.jpg`
4. Recargar frontend

**Resultado Esperado:**
- Frontend intenta cargar imagen
- Error 404 de imagen
- Astro `<Image>` component maneja error:
  - Muestra placeholder
  - Icono de usuario default
  - Iniciales del autor
- Layout no roto
- No error JavaScript

**Criterios de Aceptación:**
- Graceful degradation
- No broken image icon visible

---

### TC-043: Build Exitoso con Backend Activo

**Componente:** Build Process
**Prioridad:** Alta (P0)
**Estado:** ⏳ Pendiente

**Precondiciones:**
- Backend corriendo en `http://localhost:1337`
- Todos los content types con datos
- Permisos públicos configurados

**Pasos:**
1. En terminal frontend: `npm run build`
2. Observar logs del build
3. Esperar que termine

**Resultado Esperado:**
- Build completa sin errores
- Exit code: 0
- Logs muestran:
  - `✓ Completed in Xms`
  - `✓ X page(s) built`
- Carpeta `dist/` generada
- No errores de fetch
- Build rápido (< 1 minuto)

**Criterios de Aceptación:**
- Build determinista (repetible)
- Sin warnings críticos

---

### TC-044: Build Exitoso sin Backend

**Componente:** Build Process
**Prioridad:** Alta (P0)
**Estado:** ⏳ Pendiente

**Precondiciones:**
- Backend detenido

**Pasos:**
1. Detener Strapi
2. Limpiar cache: `rm -rf node_modules/.astro`
3. En terminal frontend: `npm run build`
4. Observar logs

**Resultado Esperado:**
- Build completa con warnings pero sin fallar
- Exit code: 0
- Warnings esperados:
  - "Failed to fetch from API"
  - "Using fallback data"
- Carpeta `dist/` generada
- HTML contiene datos de fallback

**Criterios de Aceptación:**
- Build resiliente
- Fallbacks funcionan

---

### TC-045: HTML Contiene Datos Reales

**Componente:** Build Process
**Prioridad:** Alta (P0)
**Estado:** ⏳ Pendiente

**Precondiciones:**
- Backend corriendo con datos únicos:
  - Pricing plan: "Plan Súper Premium" - $199
  - Feature: "Integración con Satélites"
- Build completado

**Pasos:**
1. Build con backend activo
2. Abrir `dist/index.html` en editor de texto
3. Buscar strings únicos:
   - "Plan Súper Premium"
   - "$199"
   - "Integración con Satélites"

**Resultado Esperado:**
- Strings encontrados en HTML
- Datos del backend "congelados" en HTML estático
- NO datos de fallback genéricos

**Validación:**
```bash
grep -i "Plan Súper Premium" dist/index.html
# Output: línea con el string (encontrado)
```

**Criterios de Aceptación:**
- HTML contiene datos reales del backend
- Build usó API correctamente

---

### TC-046: Imágenes Optimizadas Generadas

**Componente:** Build Process
**Prioridad:** Media (P1)
**Estado:** ⏳ Pendiente

**Precondiciones:**
- Backend corriendo con imágenes
- Build completado

**Pasos:**
1. Build frontend
2. Explorar carpeta `dist/_astro/`
3. Listar archivos de imagen

**Resultado Esperado:**
- Múltiples formatos generados:
  - `.webp` (moderno, comprimido)
  - `.avif` (más moderno, mejor compresión)
  - `.jpg` o `.png` (fallback)
- Múltiples tamaños (responsive):
  - `image-sm.webp` (320w)
  - `image-md.webp` (768w)
  - `image-lg.webp` (1920w)
- Nombres hasheados: `avatar-abc123.webp`

**Validación:**
```bash
ls dist/_astro/*.webp
ls dist/_astro/*.avif
```

**Criterios de Aceptación:**
- Al menos formato webp generado
- Imágenes < 200KB cada una

---

### TC-047: Assets Hasheados para Cache

**Componente:** Build Process
**Prioridad:** Media (P1)
**Estado:** ⏳ Pendiente

**Precondiciones:**
- Build completado

**Pasos:**
1. Build frontend
2. Listar archivos en `dist/_astro/`
3. Inspeccionar nombres de archivo

**Resultado Esperado:**
- CSS con hash: `styles.abc123def.css`
- JS con hash: `index.abc123def.js`
- Imágenes con hash: `logo.abc123def.webp`
- HTML referencia archivos hasheados:
  ```html
  <link rel="stylesheet" href="/_astro/styles.abc123def.css">
  ```
- Hash cambia si contenido cambia (cache busting)

**Criterios de Aceptación:**
- Nombres deterministas (mismo input → mismo hash)
- Cache busting funcional

---

### TC-048: Lighthouse Performance > 90

**Componente:** Performance
**Prioridad:** Media (P1)
**Estado:** ⏳ Pendiente

**Precondiciones:**
- Build completado
- Preview corriendo: `npm run preview`

**Pasos:**
1. Abrir Chrome
2. Navegar a `http://localhost:4321`
3. Abrir DevTools > Lighthouse
4. Configurar:
   - Mode: Navigation
   - Device: Desktop o Mobile
   - Categories: Performance
5. Click "Analyze page load"
6. Esperar resultado

**Resultado Esperado:**
- **Performance Score: > 90** (preferiblemente 95+)
- Métricas clave:
  - First Contentful Paint (FCP): < 1.8s
  - Speed Index: < 3.4s
  - Largest Contentful Paint (LCP): < 2.5s
  - Time to Interactive (TTI): < 3.8s
  - Total Blocking Time (TBT): < 200ms
  - Cumulative Layout Shift (CLS): < 0.1

**Criterios de Aceptación:**
- Score verde (90-100)
- No issues críticos

---

### TC-049: First Contentful Paint < 2s

**Componente:** Performance
**Prioridad:** Media (P1)
**Estado:** ⏳ Pendiente

**Precondiciones:**
- Preview corriendo
- Throttling: Deshabilitado o Fast 3G

**Pasos:**
1. Abrir DevTools > Performance
2. Click "Reload and record"
3. Esperar que cargue
4. Stop recording
5. Buscar "FCP" en timeline

**Resultado Esperado:**
- FCP ocurre en < 2 segundos (desde navigation start)
- Primer contenido visible rápidamente
- No recursos bloqueantes (render-blocking)

**Criterios de Aceptación:**
- FCP < 1.8s (good)
- < 3s (acceptable)

---

### TC-050: Largest Contentful Paint < 3s

**Componente:** Performance
**Prioridad:** Media (P1)
**Estado:** ⏳ Pendiente

**Precondiciones:**
- Preview corriendo

**Pasos:**
1. Run Lighthouse audit
2. Observar LCP metric
3. Identificar elemento LCP (usualmente hero image o texto)

**Resultado Esperado:**
- LCP < 2.5s (good)
- < 4s (acceptable)
- Elemento LCP optimizado:
  - Imagen con `loading="eager"` si es above-the-fold
  - Imagen preloaded: `<link rel="preload" as="image">`
  - Tamaño correcto (no downsizing)

**Criterios de Aceptación:**
- LCP verde en Lighthouse
- No layout shifts retrasando LCP

---

### TC-051: Time to Interactive < 4s

**Componente:** Performance
**Prioridad:** Media (P1)
**Estado:** ⏳ Pendiente

**Precondiciones:**
- Preview corriendo

**Pasos:**
1. Run Lighthouse audit
2. Observar TTI metric

**Resultado Esperado:**
- TTI < 3.8s (good)
- < 7.3s (acceptable)
- JavaScript se ejecuta rápido
- Main thread no bloqueado
- Interactividad rápida (botones responden)

**Criterios de Aceptación:**
- TTI verde
- No long tasks (> 50ms)

---

### TC-052: Bundle Size < 200KB

**Componente:** Performance
**Prioridad:** Media (P1)
**Estado:** ⏳ Pendiente

**Precondiciones:**
- Build completado

**Pasos:**
1. Medir tamaño de bundles:
   ```bash
   du -sh dist/_astro/*.js
   du -sh dist/_astro/*.css
   ```
2. Sumar total

**Resultado Esperado:**
- Total JS: < 150KB (gzipped: < 50KB)
- Total CSS: < 50KB (gzipped: < 15KB)
- Total bundle: < 200KB
- Code splitting: múltiples chunks pequeños
- Tree shaking aplicado (sin código muerto)

**Criterios de Aceptación:**
- Bundle size razonable
- Load time aceptable (< 3s en 3G)

---

### TC-053: Alt Text en Todas las Imágenes

**Componente:** Accessibility
**Prioridad:** Alta (P0)
**Estado:** ⏳ Pendiente

**Precondiciones:**
- Build completado

**Pasos:**
1. Abrir `dist/index.html`
2. Buscar todas las tags `<img>`
3. Verificar atributo `alt`

**Resultado Esperado:**
- Todas las `<img>` tienen `alt`:
  - Imágenes informativas: alt descriptivo ("Logo de Academia XYZ")
  - Imágenes decorativas: `alt=""` (vacío, no omitido)
- No `<img>` sin `alt`
- Alt text significativo (no "image1.jpg")

**Validación:**
```bash
grep -o '<img[^>]*>' dist/index.html | grep -v 'alt='
# Output vacío = todas tienen alt
```

**Criterios de Aceptación:**
- 100% de imágenes con alt
- Lighthouse Accessibility > 95

---

### TC-054: Labels en Campos de Formulario

**Componente:** Accessibility
**Prioridad:** Alta (P0)
**Estado:** ⏳ Pendiente

**Precondiciones:**
- Frontend corriendo

**Pasos:**
1. Navegar a formulario de callback
2. Inspeccionar cada campo en DevTools
3. Verificar asociación label-input

**Resultado Esperado:**
- Cada `<input>` tiene `<label>` asociado:
  - Opción A: `<label for="name">Nombre</label>` + `<input id="name">`
  - Opción B: `<label>Nombre <input></label>` (nested)
- Labels visibles (no ocultos con CSS)
- Placeholder NO reemplaza label
- `aria-label` o `aria-labelledby` si no hay label visual

**Criterios de Aceptación:**
- Screen reader puede leer labels
- Click en label enfoca input

---

### TC-055: Focus States Visibles

**Componente:** Accessibility
**Prioridad:** Alta (P0)
**Estado:** ⏳ Pendiente

**Precondiciones:**
- Frontend corriendo

**Pasos:**
1. Navegar página con teclado (Tab)
2. Observar elementos interactivos:
   - Links
   - Botones
   - Inputs de formulario
   - Cards clickeables
3. Verificar focus state visible

**Resultado Esperado:**
- Elemento enfocado tiene borde/outline visible
- Color contrastante (azul, naranja, etc.)
- Outline de al menos 2px
- No `outline: none` sin alternativa visual
- Focus order lógico (top to bottom, left to right)

**Criterios de Aceptación:**
- Todos los elementos interactivos tabulables
- Focus state siempre visible

---

### TC-056: Contraste de Colores WCAG AA

**Componente:** Accessibility
**Prioridad:** Alta (P0)
**Estado:** ⏳ Pendiente

**Precondiciones:**
- Frontend corriendo

**Pasos:**
1. Abrir DevTools > Lighthouse
2. Run Accessibility audit
3. Observar issues de contraste
4. Usar herramienta: https://webaim.org/resources/contrastchecker/

**Resultado Esperado:**
- Texto normal (< 18pt): contraste mínimo 4.5:1
- Texto grande (≥ 18pt o bold ≥ 14pt): contraste mínimo 3:1
- Elementos UI (botones, bordes): contraste 3:1
- Lighthouse no reporta issues de contraste

**Criterios de Aceptación:**
- Cumple WCAG AA
- Lighthouse Accessibility > 95

---

### TC-057: Navegación con Teclado Funcional

**Componente:** Accessibility
**Prioridad:** Alta (P0)
**Estado:** ⏳ Pendiente

**Precondiciones:**
- Frontend corriendo

**Pasos:**
1. Sin usar mouse, navegar página:
   - **Tab:** siguiente elemento
   - **Shift+Tab:** elemento anterior
   - **Enter:** activar link/botón
   - **Space:** activar botón, scroll
   - **Escape:** cerrar modal/menu
2. Probar:
   - Navbar links
   - Botones CTA
   - Formulario completo
   - Carruseles (flechas)

**Resultado Esperado:**
- Todos los elementos interactivos accesibles con teclado
- No keyboard trap (no quedarse atrapado)
- Focus order lógico
- Modals/menus cierran con Escape
- Skip links disponibles (opcional, "Skip to content")

**Criterios de Aceptación:**
- 100% navegable con teclado
- No dependencia de mouse

---

### TC-058: Layout Mobile (320px-640px)

**Componente:** Responsive
**Prioridad:** Alta (P0)
**Estado:** ⏳ Pendiente

**Precondiciones:**
- Frontend corriendo

**Pasos:**
1. Abrir DevTools > Device Toolbar
2. Seleccionar dispositivos:
   - iPhone SE (375x667)
   - Galaxy S8+ (360x740)
   - iPhone 12 Pro (390x844)
3. Navegar página completa
4. Probar scroll, clicks, forms

**Resultado Esperado:**
- Layout de 1 columna
- Texto legible sin zoom (font-size ≥ 16px)
- Tap targets ≥ 44x44px
- No overflow horizontal
- Navbar hamburger menu funcional
- Imágenes responsivas (no cortadas)
- Formulario usable (inputs grandes)
- Spacing adecuado (no apretado)

**Criterios de Aceptación:**
- UX mobile-first
- Sin problemas de usabilidad

---

### TC-059: Layout Tablet (641px-1024px)

**Componente:** Responsive
**Prioridad:** Alta (P0)
**Estado:** ⏳ Pendiente

**Precondiciones:**
- Frontend corriendo

**Pasos:**
1. Seleccionar dispositivos:
   - iPad (768x1024)
   - iPad Pro (1024x1366)
2. Navegar en portrait y landscape
3. Observar layout

**Resultado Esperado:**
- Layout de 2 columnas donde aplique:
  - Features: 2 columnas
  - Pricing: 2-3 columnas
  - Testimonials: 1-2 visibles
- Navbar: puede ser full o hamburger
- Spacing intermedio
- Imágenes optimizadas para resolución

**Criterios de Aceptación:**
- Aprovecha espacio disponible
- No desperdicio de espacio

---

### TC-060: Layout Desktop (1025px+)

**Componente:** Responsive
**Prioridad:** Alta (P0)
**Estado:** ⏳ Pendiente

**Precondiciones:**
- Frontend corriendo

**Pasos:**
1. Abrir en resoluciones:
   - 1280x720 (HD)
   - 1920x1080 (Full HD)
   - 2560x1440 (QHD)
2. Navegar página

**Resultado Esperado:**
- Layout de 3-4 columnas:
  - Features: 3-4 columnas
  - Pricing: 3 columnas
  - Testimonials: 2-3 visibles
- Navbar horizontal completo
- Contenido centrado con max-width (no stretch infinito)
- Hover effects en botones/cards
- Spacing generoso

**Criterios de Aceptación:**
- Layout desktop optimizado
- Aprovecha espacio sin exagerar

---

## Matriz de Prioridades

### Críticos (P0) - Deben pasar para deploy
- TC-001, TC-002, TC-006, TC-009, TC-010, TC-015, TC-023, TC-024, TC-026, TC-027, TC-028, TC-030, TC-031, TC-032, TC-033, TC-035, TC-038, TC-043, TC-044, TC-045, TC-053, TC-054, TC-055, TC-056, TC-057, TC-058, TC-059, TC-060

**Total P0:** 28 casos

### Importantes (P1) - Deberían pasar
- Todos los demás (TC-003, TC-004, TC-005, TC-007, TC-008, etc.)

**Total P1:** 27 casos

### Nice to Have (P2) - Pueden fallar
- TC-013, TC-021

**Total P2:** 5 casos

---

## Registro de Ejecución

### Template

| Fecha | Tester | TC | Status | Notas |
|-------|--------|-----|--------|-------|
| 2025-11-12 | Juan | TC-001 | ✅ | Pasado sin issues |
| 2025-11-12 | María | TC-026 | ❌ | Error CORS, revisar backend |
| 2025-11-12 | Pedro | TC-043 | ⏳ | En progreso |

---

**Versión:** 1.0
**Última actualización:** 2025-11-12
**Total Casos:** 60
**Cobertura:** Frontend-Backend Integration
