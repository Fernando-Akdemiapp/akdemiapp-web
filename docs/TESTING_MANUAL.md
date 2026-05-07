# Plan de Testing Manual - Integración Frontend-Backend

## Tabla de Contenidos
1. [Checklist de Verificación Pre-Testing](#checklist-pre-testing)
2. [Casos de Prueba por Componente](#casos-de-prueba-por-componente)
3. [Testing de Formularios](#testing-de-formularios)
4. [Escenarios de Error y Edge Cases](#escenarios-de-error)
5. [Validación Visual](#validación-visual)
6. [Criterios de Aceptación](#criterios-de-aceptación)

---

## Checklist de Verificación Pre-Testing

### Entorno Backend
- [ ] PostgreSQL está corriendo (`docker-compose ps` en `/backend`)
- [ ] Strapi está levantado en `http://localhost:1337`
- [ ] Admin panel accesible en `http://localhost:1337/admin`
- [ ] Usuario admin creado y logueado
- [ ] Todos los Content Types están creados (7 tipos)
- [ ] Permisos públicos configurados para lectura (GET)
- [ ] Permiso público configurado para callback-requests (POST)
- [ ] Al menos 3 registros de prueba por Content Type

### Entorno Frontend
- [ ] Dependencias instaladas (`npm install` en `/frontend`)
- [ ] Dev server corriendo en `http://localhost:4321`
- [ ] Variables de entorno configuradas (si aplica)
- [ ] Console del navegador limpia (sin errores)
- [ ] Network tab del DevTools abierto

### Datos de Prueba
- [ ] 3-4 Pricing Plans con diferentes precios
- [ ] 6-8 Features con iconos variados
- [ ] 4-5 Testimonials con imágenes
- [ ] Site Stats con valores realistas
- [ ] 6+ Client Logos
- [ ] Use Case Benefits por categoría
- [ ] Verificar que todos tengan `publishedAt` no nulo

---

## Casos de Prueba por Componente

### 1. Pricing Plans (Pricing.astro)

#### TC-PRICING-001: Carga exitosa de planes
**Backend:** Activo con datos
**Pasos:**
1. Navegar a la página principal (/)
2. Scroll a la sección de pricing
3. Abrir Network tab y buscar request a `/api/pricing-plans`

**Validar:**
- [ ] Request HTTP 200 OK
- [ ] Response contiene array de planes
- [ ] Cada plan muestra: nombre, precio, descripción, features
- [ ] Botón CTA visible en cada plan
- [ ] Plan "popular" tiene badge destacado
- [ ] Formato de precio correcto ($XX/mes o Free)

#### TC-PRICING-002: Fallback sin backend
**Backend:** Detenido
**Pasos:**
1. Detener Strapi (`Ctrl+C` en terminal backend)
2. Recargar página frontend
3. Observar sección pricing

**Validar:**
- [ ] No se muestra error visible al usuario
- [ ] Se muestran datos de fallback (3 planes básicos)
- [ ] Diseño mantiene estructura visual
- [ ] Console muestra error de fetch (esperado)

#### TC-PRICING-003: Datos incompletos
**Backend:** Activo con plan sin features
**Pasos:**
1. En Strapi, crear plan sin rellenar features
2. Publicar el plan
3. Recargar frontend

**Validar:**
- [ ] Plan se muestra sin errores
- [ ] Sección de features vacía o con mensaje apropiado
- [ ] Botón CTA funciona
- [ ] No rompe el layout

---

### 2. Features (Features.astro)

#### TC-FEATURES-001: Carga exitosa de características
**Backend:** Activo con datos
**Pasos:**
1. Navegar a página principal
2. Localizar sección de features
3. Revisar Network tab

**Validar:**
- [ ] Request a `/api/features` exitoso
- [ ] 6-8 features desplegadas en grid
- [ ] Cada feature muestra: icono, título, descripción
- [ ] Iconos renderizados correctamente
- [ ] Layout responsive (mobile/tablet/desktop)

#### TC-FEATURES-002: Iconos dinámicos
**Backend:** Activo
**Pasos:**
1. Verificar en Strapi que features tienen diferentes iconos
2. Observar frontend

**Validar:**
- [ ] Cada feature muestra icono correcto
- [ ] Iconos tienen tamaño consistente
- [ ] Iconos con color de tema (primary/secondary)
- [ ] Fallback si icono no existe

#### TC-FEATURES-003: Fallback sin backend
**Backend:** Detenido
**Validar:**
- [ ] Datos de fallback mostrados
- [ ] Al menos 6 features predefinidas
- [ ] No errores visibles en UI

---

### 3. Hero + CTA (Site Stats)

#### TC-STATS-001: Estadísticas dinámicas
**Backend:** Activo con site-stats
**Pasos:**
1. Abrir página principal
2. Observar sección hero o stats

**Validar:**
- [ ] Request a `/api/site-stats` exitoso
- [ ] Números mostrados correctamente
- [ ] Labels traducidos o en español
- [ ] Animación de números (si aplica)
- [ ] Formato con comas para miles (1,000+)

#### TC-STATS-002: Actualización de datos
**Backend:** Activo
**Pasos:**
1. Anotar estadísticas actuales
2. En Strapi, modificar números
3. Recargar frontend

**Validar:**
- [ ] Nuevos números reflejados
- [ ] Sin necesidad de rebuild
- [ ] Cache invalidado correctamente

#### TC-STATS-003: Valores extremos
**Backend:** Activo con valores grandes
**Pasos:**
1. En Strapi, configurar stats con:
   - Estudiantes: 1,500,000
   - Academias: 50,000
   - Satisfacción: 99.9%
2. Verificar frontend

**Validar:**
- [ ] Números formateados correctamente
- [ ] No overflow visual
- [ ] Porcentajes con decimales
- [ ] Layout no se rompe

---

### 4. Testimonials (TestimonialFeature)

#### TC-TESTIMONIAL-001: Carga de testimonios
**Backend:** Activo con 4-5 testimonios
**Pasos:**
1. Navegar a sección de testimonios
2. Observar carga de datos

**Validar:**
- [ ] Request a `/api/testimonials` exitoso
- [ ] Cada testimonio muestra: avatar, nombre, rol, academia, texto
- [ ] Imágenes cargadas correctamente
- [ ] Rating stars visible (si aplica)
- [ ] Carrusel funcional (navegación)

#### TC-TESTIMONIAL-002: Imágenes de avatar
**Backend:** Activo
**Pasos:**
1. Verificar testimonios con y sin avatar
2. Observar renderizado

**Validar:**
- [ ] Avatares con imagen se muestran
- [ ] Avatares sin imagen usan placeholder
- [ ] Imágenes optimizadas (Astro Image)
- [ ] No errores 404 en imágenes

#### TC-TESTIMONIAL-003: Texto largo
**Backend:** Activo con testimonio de 300+ caracteres
**Validar:**
- [ ] Texto completo visible o truncado elegantemente
- [ ] Botón "Leer más" si aplica
- [ ] No overflow del contenedor
- [ ] Responsive en mobile

---

### 5. Client Logos (LogoCarousel.astro)

#### TC-LOGOS-001: Carrusel de logos
**Backend:** Activo con 6+ logos
**Pasos:**
1. Navegar a sección de clientes
2. Observar carrusel

**Validar:**
- [ ] Request a `/api/client-logos` exitoso
- [ ] Logos renderizados en carrusel
- [ ] Animación de scroll infinito
- [ ] Logos en escala de grises/hover con color
- [ ] Responsive en todos los dispositivos

#### TC-LOGOS-002: Imágenes optimizadas
**Backend:** Activo
**Validar:**
- [ ] Logos no distorsionados
- [ ] Tamaño consistente
- [ ] Carga lazy (si aplica)
- [ ] Formato webp/avif generado

#### TC-LOGOS-003: Fallback sin backend
**Backend:** Detenido
**Validar:**
- [ ] Logos de fallback mostrados
- [ ] Carrusel funciona igual
- [ ] No rompe layout

---

### 6. Use Case Benefits (UseCaseFeatures)

#### TC-USECASE-001: Beneficios por tipo de academia
**Backend:** Activo con datos por categoría
**Pasos:**
1. Navegar a página específica (ej: `/danzas`)
2. Observar sección de beneficios
3. Verificar Network tab con filtro por tipo

**Validar:**
- [ ] Request a `/api/use-case-benefits?filters[type][$eq]=danzas`
- [ ] Solo beneficios de la categoría correcta
- [ ] Cada beneficio con: icono, título, descripción
- [ ] No se muestran beneficios de otras categorías

#### TC-USECASE-002: Múltiples páginas
**Backend:** Activo
**Pasos:**
1. Navegar entre páginas: artes-escenicas, artes-marciales, danzas, deportiva, musica, pre-escolar
2. Comparar beneficios

**Validar:**
- [ ] Cada página muestra beneficios únicos
- [ ] Filtrado correcto por tipo
- [ ] No duplicados entre páginas
- [ ] Fallback si categoría sin datos

#### TC-USECASE-003: Página sin beneficios
**Backend:** Activo con categoría vacía
**Pasos:**
1. Crear categoría nueva sin beneficios
2. Navegar a esa página

**Validar:**
- [ ] Mensaje apropiado ("Próximamente")
- [ ] No error visible
- [ ] Layout mantiene estructura
- [ ] O muestra beneficios generales de fallback

---

## Testing de Formularios

### 7. Callback Form (CallbackForm.astro)

#### TC-FORM-001: Envío exitoso
**Backend:** Activo
**Pasos:**
1. Rellenar formulario con datos válidos:
   - Nombre: "Juan Pérez"
   - Email: "juan@example.com"
   - Teléfono: "+34 600 123 456"
   - Mensaje: "Quiero más información sobre Akdemi"
2. Click en "Enviar"
3. Observar Network tab (POST a `/api/callback-requests`)

**Validar:**
- [ ] Request HTTP 200 OK
- [ ] Mensaje de éxito mostrado
- [ ] Formulario limpiado o deshabilitado
- [ ] Registro creado en Strapi (verificar en admin panel)
- [ ] Datos guardados correctamente
- [ ] Botón de envío deshabilitado durante request

#### TC-FORM-002: Validación de campos
**Backend:** Activo
**Pasos:**
1. Intentar enviar formulario vacío
2. Intentar enviar con email inválido
3. Intentar enviar con teléfono inválido

**Validar:**
- [ ] Mensajes de error claros por campo
- [ ] No se envía request si validación falla
- [ ] Focus en primer campo inválido
- [ ] Validación en tiempo real (onChange)
- [ ] Estilos visuales de error (borde rojo)

#### TC-FORM-003: Error del servidor
**Backend:** Activo pero con error (ej: permisos incorrectos)
**Pasos:**
1. Desactivar permisos públicos para POST en callback-requests
2. Intentar enviar formulario

**Validar:**
- [ ] Request HTTP 403 o 500
- [ ] Mensaje de error amigable mostrado
- [ ] Formulario no se limpia
- [ ] Datos del usuario preservados
- [ ] Opción de reintentar

#### TC-FORM-004: Backend caído
**Backend:** Detenido
**Pasos:**
1. Detener Strapi
2. Rellenar y enviar formulario

**Validar:**
- [ ] Error de red capturado
- [ ] Mensaje claro: "Servicio no disponible"
- [ ] No crash de la aplicación
- [ ] Formulario sigue editable

#### TC-FORM-005: Caracteres especiales
**Backend:** Activo
**Pasos:**
1. Rellenar con:
   - Nombre: "María José O'Brien-García"
   - Email: "test+tag@example.com"
   - Mensaje: "Hola! ¿Cuánto cuesta? 😊 <script>alert('xss')</script>"
2. Enviar

**Validar:**
- [ ] Datos guardados sin corrupción
- [ ] Caracteres especiales preservados
- [ ] Script tags sanitizados
- [ ] Emojis guardados correctamente
- [ ] No errores de encoding

#### TC-FORM-006: Envíos duplicados
**Backend:** Activo
**Pasos:**
1. Rellenar formulario
2. Click rápido múltiple en "Enviar"

**Validar:**
- [ ] Solo un request enviado (debounce)
- [ ] Botón deshabilitado después del primer click
- [ ] No registros duplicados en Strapi
- [ ] Loading state visible

---

## Escenarios de Error y Edge Cases

### 8. Testing de Resiliencia

#### TC-ERROR-001: CORS Issues
**Backend:** Activo sin CORS configurado
**Pasos:**
1. Comentar middleware de CORS en backend
2. Recargar frontend

**Validar:**
- [ ] Error CORS en console
- [ ] Fallbacks mostrados
- [ ] No crash de aplicación

#### TC-ERROR-002: Respuestas malformadas
**Backend:** Activo con datos corruptos
**Pasos:**
1. En Strapi, crear registro con campos null/undefined
2. Recargar frontend

**Validar:**
- [ ] Componente maneja datos incompletos
- [ ] No errores de "undefined"
- [ ] Valores default mostrados

#### TC-ERROR-003: Timeout de red
**Backend:** Activo con latencia alta
**Pasos:**
1. Simular red lenta (DevTools > Network > Throttling: Slow 3G)
2. Recargar página

**Validar:**
- [ ] Loading states visibles
- [ ] Timeout configurado (no espera infinita)
- [ ] Fallback después de timeout
- [ ] Mensaje de carga lenta

#### TC-ERROR-004: Paginación grande
**Backend:** Activo con 100+ registros
**Pasos:**
1. Crear 100+ testimonials en Strapi
2. Cargar frontend

**Validar:**
- [ ] Request con paginación (`?pagination[pageSize]=25`)
- [ ] Solo primeros 25 cargados
- [ ] Performance aceptable
- [ ] Opción de "Ver más" (si aplica)

#### TC-ERROR-005: Imágenes faltantes
**Backend:** Activo con URLs de imagen rotas
**Pasos:**
1. Crear registro con imagen
2. Borrar archivo del servidor
3. Recargar frontend

**Validar:**
- [ ] Placeholder mostrado
- [ ] No error 404 visible
- [ ] Layout no roto
- [ ] Alt text presente

---

## Validación Visual

### 9. Checklist de UI/UX

#### Diseño General
- [ ] Todas las secciones alineadas correctamente
- [ ] Espaciado consistente entre componentes
- [ ] Colores del tema aplicados correctamente
- [ ] Tipografía legible y consistente
- [ ] Animaciones suaves (fadeIn, slideUp)

#### Responsive Design
- [ ] Mobile (320px - 640px): Layout columna única
- [ ] Tablet (641px - 1024px): Layout 2 columnas
- [ ] Desktop (1025px+): Layout 3-4 columnas
- [ ] Imágenes escaladas apropiadamente
- [ ] Texto no cortado en ningún dispositivo

#### Accesibilidad
- [ ] Alt text en todas las imágenes
- [ ] Labels en campos de formulario
- [ ] Focus states visibles
- [ ] Contraste de colores WCAG AA
- [ ] Navegación con teclado funcional

#### Performance
- [ ] Imágenes optimizadas (webp/avif)
- [ ] Lazy loading de imágenes
- [ ] No layout shifts (CLS bajo)
- [ ] Carga inicial < 3 segundos
- [ ] Time to Interactive < 5 segundos

---

## Criterios de Aceptación

### Mínimos para Producción

#### Funcionalidad
- [ ] Todos los componentes cargan datos del backend cuando está disponible
- [ ] Todos los fallbacks funcionan cuando backend está caído
- [ ] Formulario de callback envía y guarda datos correctamente
- [ ] No errores JavaScript en console (production build)
- [ ] No warnings de TypeScript

#### Seguridad
- [ ] No se exponen API tokens en frontend
- [ ] Validación de formularios (client + server)
- [ ] Sanitización de inputs
- [ ] HTTPS en producción
- [ ] CORS configurado correctamente

#### Performance
- [ ] Lighthouse Score > 90
- [ ] First Contentful Paint < 2s
- [ ] Largest Contentful Paint < 3s
- [ ] Time to Interactive < 4s
- [ ] Bundle size < 200kb

#### Calidad
- [ ] 0 errores críticos
- [ ] 0 errores de TypeScript
- [ ] < 5 warnings no críticos
- [ ] Coverage de casos de prueba > 80%
- [ ] Documentación actualizada

---

## Registro de Testing

### Template de Reporte

```markdown
## Sesión de Testing

**Fecha:** YYYY-MM-DD
**Tester:** [Nombre]
**Build:** [commit hash]
**Backend Version:** Strapi 5.30.1
**Frontend Version:** Astro 5.x

### Entorno
- [ ] Backend corriendo
- [ ] PostgreSQL activo
- [ ] Datos de prueba cargados

### Resultados
- **Total Casos Ejecutados:** X
- **Pasados:** X
- **Fallados:** X
- **Bloqueados:** X

### Bugs Encontrados
1. [ID] - [Severidad] - [Descripción corta]
2. ...

### Notas
[Observaciones adicionales]
```

---

## Anexo: Comandos Útiles

### Verificar Backend
```bash
# Check PostgreSQL
docker-compose ps

# Check Strapi
curl http://localhost:1337/_health

# Ver logs
docker-compose logs -f
```

### Verificar Frontend
```bash
# Dev server
npm run dev

# Build y preview
npm run build && npm run preview

# Check bundle
npm run build -- --verbose
```

### Reset de Datos
```bash
# Backend: Borrar DB y recrear
cd backend
docker-compose down -v
docker-compose up -d
npm run develop
# Recrear content types y datos
```

---

**Versión:** 1.0
**Última actualización:** 2025-11-12
