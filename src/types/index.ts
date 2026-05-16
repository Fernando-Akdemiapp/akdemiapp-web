/**
 * Type definitions index
 * Exports all interfaces for easy importing
 */

// Existing service types
export type { Plan, StrapiPlan } from './Plan';
export type { Feature, StrapiFeature } from './Feature';
export type { Testimonial, StrapiTestimonial } from './Testimonial';
export type { SiteStats, StrapiSiteStats } from './SiteStats';
export type { CallbackRequest, StrapiCallbackRequest } from './CallbackRequest';
export type { ClientLogo, StrapiClientLogo } from './ClientLogo';
export type { UseCaseBenefit, StrapiUseCaseBenefit } from './UseCaseBenefit';

// Page Builder types
export type {
  // Main types
  Page,
  StrapiPage,
  StrapiPagesResponse,
  Section,

  // Base interfaces
  BaseSection,
  SEO,
  MetaSocial,
  StrapiMedia,
  MediaFormat,

  // Section types
  HeroSection,
  UseCaseHeroSection,
  FeaturesSection,
  UseCaseFeaturesSection,
  PricingSection,
  CTASection,
  CallbackFormSection,
  TestimonialsSection,
  LogoCarouselSection,
  TestimonialFeatureSection,

  // Utility interfaces
  BenefitItem,
  TestimonialItem,
  FeatureItem,
  PhonePrefix,
} from './Page';

// Settings types
export type {
  Settings,
  StrapiSettings,
  NavbarConfig,
  FooterConfig,
  NavItem,
  LinkItem,
  SocialLink,
  SocialIcon,
  ButtonConfig,
  ButtonVariant,
} from './Settings';
