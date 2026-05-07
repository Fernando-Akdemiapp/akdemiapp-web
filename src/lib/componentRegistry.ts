/**
 * Component Registry
 * Maps Strapi dynamic zone component names to Astro components
 */

import type { Section } from '@/types';

// Import all section components
import HeroSection from '@/components/sections/Hero.astro';
import UseCaseHeroSection from '@/components/sections/UseCaseHero.astro';
import FeaturesSection from '@/components/sections/Features.astro';
import UseCaseFeaturesSection from '@/components/sections/UseCaseFeatures.astro';
import PricingSection from '@/components/sections/Pricing.astro';
import CTASection from '@/components/sections/CTA.astro';
import CallbackFormSection from '@/components/sections/CallbackForm.astro';
import TestimonialsSection from '@/components/sections/Testimonials.astro';
import TestimonialFeatureSection from '@/components/sections/TestimonialFeature.astro';
import LogoCarouselSection from '@/components/sections/LogoCarousel.astro';

/**
 * Component Registry Object
 * Maps Strapi component identifiers to Astro components
 *
 * The keys must match the __component field from Strapi's dynamic zones
 * Format: 'collection-name.component-name' (e.g., 'sections.hero-section')
 */
export const componentRegistry = {
  'sections.hero-section': HeroSection,
  'sections.use-case-hero-section': UseCaseHeroSection,
  'sections.features-section': FeaturesSection,
  'sections.use-case-features-section': UseCaseFeaturesSection,
  'sections.pricing-section': PricingSection,
  'sections.cta-section': CTASection,
  'sections.callback-form-section': CallbackFormSection,
  'sections.testimonials-section': TestimonialsSection,
  'sections.testimonial-feature-section': TestimonialFeatureSection,
  'sections.logo-carousel-section': LogoCarouselSection,
} as const;

/**
 * Type for valid component keys
 */
export type ComponentKey = keyof typeof componentRegistry;

/**
 * Type for component values
 */
export type ComponentValue = (typeof componentRegistry)[ComponentKey];

/**
 * Get the Astro component for a given section
 * @param section - Section object from Strapi with __component field
 * @returns Astro component or null if not found
 */
export function getComponentForSection(section: Section): ComponentValue | null {
  const componentKey = section.__component as ComponentKey;

  if (!componentRegistry[componentKey]) {
    console.warn(
      `Component "${section.__component}" not found in registry. Available components:`,
      Object.keys(componentRegistry).join(', ')
    );
    return null;
  }

  return componentRegistry[componentKey];
}

/**
 * Validate that all sections have registered components
 * @param sections - Array of section objects
 * @returns True if all sections are valid, false otherwise
 */
export function validateSections(sections: Section[]): boolean {
  if (!sections || sections.length === 0) {
    return true; // Empty sections are valid
  }

  let allValid = true;

  sections.forEach((section, index) => {
    if (!section.__component) {
      console.error(`Section at index ${index} is missing __component field:`, section);
      allValid = false;
      return;
    }

    const componentKey = section.__component as ComponentKey;

    if (!componentRegistry[componentKey]) {
      console.error(
        `Section at index ${index} has unregistered component "${section.__component}". ` +
        `Available components: ${Object.keys(componentRegistry).join(', ')}`
      );
      allValid = false;
    }
  });

  return allValid;
}

/**
 * Get all registered component keys
 * @returns Array of component keys
 */
export function getRegisteredComponents(): ComponentKey[] {
  return Object.keys(componentRegistry) as ComponentKey[];
}

/**
 * Check if a component is registered
 * @param componentName - Component name to check
 * @returns True if component is registered
 */
export function isComponentRegistered(componentName: string): componentName is ComponentKey {
  return componentName in componentRegistry;
}
