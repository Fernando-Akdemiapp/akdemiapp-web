# Ejemplos de Uso de la Capa de Servicios

Guía práctica de cómo integrar los servicios en componentes y páginas de Astro.

## Estructura Básica de una Página Astro

```astro
---
// 1. Importar servicios necesarios
import { getPricingPlans, getFeatures } from '@/services';
import Layout from '@/layouts/Layout.astro';

// 2. Obtener datos en build time (SSG)
const plans = await getPricingPlans();
const features = await getFeatures();

// 3. Procesar datos si es necesario
const activePlans = plans.filter(p => p.isActive);
---

<!-- 4. Renderizar datos -->
<Layout title="Pricing">
  <section>
    {activePlans.map(plan => (
      <div>
        <h2>{plan.name}</h2>
        <p>${plan.monthlyPrice}/mes</p>
      </div>
    ))}
  </section>
</Layout>
```

## Ejemplo 1: Página de Precios Completa

```astro
---
// src/pages/pricing.astro
import Layout from '@/layouts/Layout.astro';
import { getPricingPlans } from '@/services';

const plans = await getPricingPlans();
const title = 'Planes y Precios - AkdemiApp';
const description = 'Elige el plan perfecto para tu academia';
---

<Layout title={title} description={description}>
  <section class="pricing-section py-20">
    <div class="container mx-auto px-4">
      <h1 class="text-4xl font-bold text-center mb-12">
        Planes y Precios
      </h1>

      <div class="grid md:grid-cols-3 gap-8">
        {plans.map((plan) => (
          <div class:list={[
            'pricing-card p-8 rounded-lg border-2',
            plan.isPopular ? 'border-blue-500 shadow-xl' : 'border-gray-200'
          ]}>
            {plan.isPopular && (
              <span class="badge bg-blue-500 text-white px-3 py-1 rounded-full text-sm">
                Más Popular
              </span>
            )}

            <div class="icon text-4xl mb-4">
              <i class={plan.icon}></i>
            </div>

            <h3 class="text-2xl font-bold mb-2">{plan.name}</h3>
            <p class="text-gray-600 mb-6">{plan.description}</p>

            <div class="pricing mb-6">
              <span class="text-4xl font-bold">${plan.monthlyPrice}</span>
              <span class="text-gray-600">/mes</span>
              <p class="text-sm text-gray-500 mt-2">
                o ${plan.yearlyPrice}/año (ahorra {Math.round((1 - plan.yearlyPrice / (plan.monthlyPrice * 12)) * 100)}%)
              </p>
            </div>

            <ul class="features mb-6 space-y-2">
              {plan.features.map((feature) => (
                <li class="flex items-center gap-2">
                  <i class="lucide-check text-green-500"></i>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>

            <a
              href={`/register?plan=${plan.slug}`}
              class="btn btn-primary w-full"
            >
              Comenzar Ahora
            </a>
          </div>
        ))}
      </div>
    </div>
  </section>
</Layout>
```

## Ejemplo 2: Sección de Características

```astro
---
// src/components/sections/Features.astro
import { getFeatures } from '@/services';

const features = await getFeatures();
---

<section class="features-section py-20 bg-gray-50">
  <div class="container mx-auto px-4">
    <h2 class="text-3xl font-bold text-center mb-12">
      Características Principales
    </h2>

    <div class="grid md:grid-cols-3 gap-8">
      {features.map((feature) => (
        <div class="feature-card bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow">
          {feature.badge && (
            <span class="badge bg-purple-100 text-purple-700 px-2 py-1 rounded text-xs uppercase font-semibold">
              {feature.badge}
            </span>
          )}

          <div class="icon text-3xl mb-4 text-blue-500">
            <i class={feature.icon}></i>
          </div>

          <h3 class="text-xl font-bold mb-2">{feature.title}</h3>
          <p class="text-gray-600">{feature.description}</p>
        </div>
      ))}
    </div>
  </div>
</section>
```

## Ejemplo 3: Testimonios por Tipo de Academia

```astro
---
// src/pages/artes-marciales.astro
import Layout from '@/layouts/Layout.astro';
import { getTestimonials } from '@/services';

// Filtrar testimonios específicos para artes marciales
const testimonials = await getTestimonials('artes-marciales');
---

<Layout title="AkdemiApp para Artes Marciales">
  <!-- Hero section -->
  <section class="hero">
    <!-- ... -->
  </section>

  <!-- Testimonials section -->
  {testimonials.length > 0 && (
    <section class="testimonials py-20">
      <div class="container mx-auto px-4">
        <h2 class="text-3xl font-bold text-center mb-12">
          Lo Que Dicen Nuestros Clientes
        </h2>

        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.slice(0, 6).map((testimonial) => (
            <div class="testimonial-card bg-white p-6 rounded-lg shadow-md">
              <div class="rating mb-4">
                {Array.from({ length: 5 }).map((_, i) => (
                  <i class:list={[
                    'lucide-star',
                    i < testimonial.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'
                  ]}></i>
                ))}
              </div>

              <p class="quote text-gray-700 mb-4 italic">
                "{testimonial.quote}"
              </p>

              <div class="author flex items-center gap-3">
                {testimonial.avatar && (
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.author}
                    class="w-12 h-12 rounded-full"
                  />
                )}
                <div>
                  <p class="font-bold">{testimonial.author}</p>
                  <p class="text-sm text-gray-600">
                    {testimonial.role}
                    {testimonial.company && ` - ${testimonial.company}`}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )}
</Layout>
```

## Ejemplo 4: Estadísticas del Sitio

```astro
---
// src/components/sections/Stats.astro
import { getSiteStats } from '@/services';

const stats = await getSiteStats();
---

{stats && (
  <section class="stats-section py-16 bg-blue-600 text-white">
    <div class="container mx-auto px-4">
      <div class="grid md:grid-cols-4 gap-8 text-center">
        <div class="stat">
          <h3 class="text-5xl font-bold mb-2">
            {stats.totalAcademies.toLocaleString()}+
          </h3>
          <p class="text-blue-100">Academias Activas</p>
        </div>

        <div class="stat">
          <h3 class="text-5xl font-bold mb-2">
            {stats.activeUsers.toLocaleString()}+
          </h3>
          <p class="text-blue-100">Usuarios Activos</p>
        </div>

        <div class="stat">
          <h3 class="text-5xl font-bold mb-2">
            {stats.satisfactionRate}%
          </h3>
          <p class="text-blue-100">Satisfacción</p>
        </div>

        <div class="stat">
          <h3 class="text-5xl font-bold mb-2">
            {stats.hoursPerMonthSaved.toLocaleString()}h
          </h3>
          <p class="text-blue-100">Ahorradas al Mes</p>
        </div>
      </div>

      <p class="text-center mt-8 text-sm text-blue-200">
        Última actualización: {new Date(stats.lastUpdated).toLocaleDateString('es-ES')}
      </p>
    </div>
  </section>
)}
```

## Ejemplo 5: Formulario de Callback (Componente Interactivo)

```astro
---
// src/components/CallbackForm.astro
---

<div class="callback-form">
  <form id="callback-form" class="space-y-4">
    <div>
      <label for="nombre" class="block text-sm font-medium mb-1">
        Nombre Completo
      </label>
      <input
        type="text"
        id="nombre"
        name="nombre"
        required
        class="w-full px-4 py-2 border rounded-lg"
      />
    </div>

    <div class="grid grid-cols-3 gap-4">
      <div>
        <label for="prefijo" class="block text-sm font-medium mb-1">
          Prefijo
        </label>
        <select
          id="prefijo"
          name="prefijo"
          required
          class="w-full px-4 py-2 border rounded-lg"
        >
          <option value="+34">+34 (España)</option>
          <option value="+52">+52 (México)</option>
          <option value="+54">+54 (Argentina)</option>
          <option value="+57">+57 (Colombia)</option>
        </select>
      </div>

      <div class="col-span-2">
        <label for="telefono" class="block text-sm font-medium mb-1">
          Teléfono
        </label>
        <input
          type="tel"
          id="telefono"
          name="telefono"
          required
          pattern="[0-9]{9}"
          class="w-full px-4 py-2 border rounded-lg"
        />
      </div>
    </div>

    <button
      type="submit"
      class="btn btn-primary w-full"
    >
      Solicitar Llamada
    </button>

    <div id="form-message" class="hidden"></div>
  </form>
</div>

<script>
  import { createCallbackRequest } from '@/services';

  const form = document.getElementById('callback-form') as HTMLFormElement;
  const messageDiv = document.getElementById('form-message') as HTMLDivElement;

  form?.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData(form);
    const nombre = formData.get('nombre') as string;
    const prefijo = formData.get('prefijo') as string;
    const telefono = formData.get('telefono') as string;

    // Deshabilitar botón
    const submitBtn = form.querySelector('button[type="submit"]') as HTMLButtonElement;
    submitBtn.disabled = true;
    submitBtn.textContent = 'Enviando...';

    try {
      const result = await createCallbackRequest({
        nombre,
        prefijo,
        telefono,
        telefonoCompleto: `${prefijo}${telefono}`,
        source: window.location.pathname
      });

      if (result) {
        // Éxito
        messageDiv.textContent = '¡Gracias! Te llamaremos pronto.';
        messageDiv.className = 'p-4 bg-green-100 text-green-700 rounded-lg';
        form.reset();
      } else {
        // Error
        messageDiv.textContent = 'Hubo un error. Por favor, inténtalo de nuevo.';
        messageDiv.className = 'p-4 bg-red-100 text-red-700 rounded-lg';
      }

      messageDiv.classList.remove('hidden');

      // Ocultar mensaje después de 5 segundos
      setTimeout(() => {
        messageDiv.classList.add('hidden');
      }, 5000);

    } catch (error) {
      console.error('Form submission error:', error);
      messageDiv.textContent = 'Error al enviar el formulario.';
      messageDiv.className = 'p-4 bg-red-100 text-red-700 rounded-lg';
      messageDiv.classList.remove('hidden');
    } finally {
      // Rehabilitar botón
      submitBtn.disabled = false;
      submitBtn.textContent = 'Solicitar Llamada';
    }
  });
</script>
```

## Ejemplo 6: Logos de Clientes

```astro
---
// src/components/sections/Clients.astro
import { getClientLogos } from '@/services';

const clients = await getClientLogos();
---

{clients.length > 0 && (
  <section class="clients-section py-12 bg-gray-100">
    <div class="container mx-auto px-4">
      <h3 class="text-center text-gray-600 mb-8">
        Confían en nosotros
      </h3>

      <div class="flex flex-wrap justify-center items-center gap-8">
        {clients.map((client) => (
          <div class="client-logo">
            {client.url ? (
              <a
                href={client.url}
                target="_blank"
                rel="noopener noreferrer"
                class="block opacity-60 hover:opacity-100 transition-opacity"
              >
                <img
                  src={client.logo}
                  alt={client.name}
                  class="h-12 object-contain grayscale hover:grayscale-0 transition-all"
                />
              </a>
            ) : (
              <img
                src={client.logo}
                alt={client.name}
                class="h-12 object-contain opacity-60"
              />
            )}
          </div>
        ))}
      </div>
    </div>
  </section>
)}
```

## Ejemplo 7: Página Dinámica con Múltiples Servicios

```astro
---
// src/pages/index.astro
import Layout from '@/layouts/Layout.astro';
import {
  getPricingPlans,
  getFeatures,
  getFeaturedTestimonials,
  getSiteStats,
  getClientLogos
} from '@/services';

// Cargar todos los datos en paralelo
const [plans, features, testimonials, stats, clients] = await Promise.all([
  getPricingPlans(),
  getFeatures(),
  getFeaturedTestimonials(),
  getSiteStats(),
  getClientLogos()
]);

// Tomar solo los primeros 3 planes
const topPlans = plans.slice(0, 3);
---

<Layout title="AkdemiApp - Gestión de Academias">
  <!-- Hero Section -->
  <section class="hero">
    <h1>Simplifica la Gestión de tu Academia</h1>
    <p>Todo lo que necesitas en una sola plataforma</p>
  </section>

  <!-- Stats Section -->
  {stats && <StatsSection stats={stats} />}

  <!-- Features Section -->
  {features.length > 0 && <FeaturesSection features={features} />}

  <!-- Pricing Section -->
  {topPlans.length > 0 && <PricingSection plans={topPlans} />}

  <!-- Testimonials Section -->
  {testimonials.length > 0 && <TestimonialsSection testimonials={testimonials} />}

  <!-- Clients Section -->
  {clients.length > 0 && <ClientsSection clients={clients} />}
</Layout>
```

## Notas de Implementación

### 1. Importaciones con Alias
Puedes configurar alias de ruta en `tsconfig.json`:

```json
{
  "extends": "astro/tsconfigs/strict",
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"],
      "@/components/*": ["src/components/*"],
      "@/services/*": ["src/services/*"],
      "@/types/*": ["src/types/*"]
    }
  }
}
```

### 2. Manejo de Datos Vacíos
Siempre verifica si hay datos antes de renderizar:

```astro
{plans.length > 0 ? (
  <PricingSection plans={plans} />
) : (
  <p>No hay planes disponibles en este momento.</p>
)}
```

### 3. Optimización de Imágenes
Usa el componente Image de Astro para optimizar imágenes de Strapi:

```astro
---
import { Image } from 'astro:assets';
---

<Image
  src={testimonial.avatar}
  alt={testimonial.author}
  width={48}
  height={48}
  format="webp"
/>
```

### 4. Loading States (Client-Side)
Para datos cargados en el cliente, muestra estados de carga:

```astro
<div id="dynamic-content" class="loading">
  <p>Cargando...</p>
</div>

<script>
  import { getPricingPlans } from '@/services';

  async function loadPlans() {
    const container = document.getElementById('dynamic-content');
    if (!container) return;

    const plans = await getPricingPlans();

    container.classList.remove('loading');
    container.innerHTML = plans.map(plan => `
      <div class="plan-card">
        <h3>${plan.name}</h3>
        <p>$${plan.monthlyPrice}/mes</p>
      </div>
    `).join('');
  }

  loadPlans();
</script>
```
