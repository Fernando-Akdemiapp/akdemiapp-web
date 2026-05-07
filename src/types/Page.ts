/**
 * Page Builder Type Definitions
 * Complete type system for dynamic page rendering with Strapi CMS
 */

/**
 * Strapi Media Interface
 * Represents an uploaded file/image from Strapi
 */
export interface StrapiMedia {
  id: number;
  name: string;
  alternativeText: string | null;
  caption: string | null;
  width: number | null;
  height: number | null;
  formats: {
    thumbnail?: MediaFormat;
    small?: MediaFormat;
    medium?: MediaFormat;
    large?: MediaFormat;
  } | null;
  hash: string;
  ext: string;
  mime: string;
  size: number;
  url: string;
  previewUrl: string | null;
  provider: string;
  createdAt: string;
  updatedAt: string;
}

/**
 * Media format variations
 */
export interface MediaFormat {
  name: string;
  hash: string;
  ext: string;
  mime: string;
  width: number;
  height: number;
  size: number;
  path: string | null;
  url: string;
}

/**
 * SEO Metadata Interface
 */
export interface SEO {
  metaTitle: string;
  metaDescription: string;
  keywords?: string;
  metaRobots?: string;
  structuredData?: Record<string, any>;
  metaViewport?: string;
  canonicalURL?: string;
  metaImage?: StrapiMedia | null;
  metaSocial?: MetaSocial[];
}

/**
 * Social media metadata
 */
export interface MetaSocial {
  socialNetwork: 'Facebook' | 'Twitter' | 'LinkedIn' | 'Instagram';
  title: string;
  description: string;
  image?: StrapiMedia | null;
}

/**
 * Base Section Interface
 * All sections extend from this
 */
export interface BaseSection {
  __component: string;
  id: number;
}

/**
 * Feature/Benefit Item Interface
 * Used in Features and UseCaseFeatures sections
 */
export interface BenefitItem {
  icon: string;
  title: string;
  description: string;
  badge?: string;
}

/**
 * Testimonial Interface for sections
 */
export interface TestimonialItem {
  quote: string;
  author: string;
  role: string;
  avatar?: string;
}

/**
 * Feature Item for Testimonial Feature Section
 */
export interface FeatureItem {
  icon: string;
  title: string;
  description: string;
}

/**
 * Phone Prefix Option
 */
export interface PhonePrefix {
  value: string;
  label: string;
}

// ============================================================================
// SECTION TYPE DEFINITIONS
// ============================================================================

/**
 * Hero Section (Main Landing Page)
 * Full-featured hero with stats, CTA buttons, and dynamic content
 */
export interface HeroSection extends BaseSection {
  __component: 'sections.hero-section';
  title: string;
  subtitle: string;
  description: string;
  ctaText: string;
  ctaLink: string;
  secondaryCtaText?: string;
  secondaryCtaLink?: string;
  badge?: string;
  image?: StrapiMedia | null;
  showStats: boolean;
  totalAcademies?: number;
  activeUsers?: number;
  satisfactionRate?: number;
}

/**
 * Use Case Hero Section
 * Simplified hero for specific academy types
 */
export interface UseCaseHeroSection extends BaseSection {
  __component: 'sections.use-case-hero-section';
  title: string;
  subtitle: string;
  description: string;
  badge: string;
  icon: string;
  image?: StrapiMedia | null;
  imageAlt?: string;
  accentColor?: string;
}

/**
 * Features Section
 * Main features grid with API integration
 */
export interface FeaturesSection extends BaseSection {
  __component: 'sections.features-section';
  sectionTitle: string;
  sectionSubtitle: string;
  sectionDescription: string;
  badge?: string;
  features: BenefitItem[];
  showCTA: boolean;
  ctaTitle?: string;
  ctaDescription?: string;
  ctaButtonText?: string;
  ctaButtonLink?: string;
}

/**
 * Use Case Features Section
 * Features specific to academy types with benefits
 */
export interface UseCaseFeaturesSection extends BaseSection {
  __component: 'sections.use-case-features-section';
  benefitsTitle: string;
  benefitsSubtitle: string;
  benefitsBadge?: string;
  benefits: BenefitItem[];
  featuresTitle: string;
  featuresSubtitle: string;
  featuresDescription?: string;
  featuresBadge?: string;
  mainFeatures: BenefitItem[];
  showCTA: boolean;
  ctaText?: string;
}

/**
 * Pricing Section
 * Plans with monthly/yearly toggle
 */
export interface PricingSection extends BaseSection {
  __component: 'sections.pricing-section';
  sectionTitle: string;
  sectionSubtitle: string;
  sectionDescription: string;
  badge?: string;
  showToggle: boolean;
  enterpriseText?: string;
  enterpriseCTAText?: string;
  // Plans are fetched from Plans service, not stored in section
}

/**
 * CTA Section
 * Call-to-action with stats
 */
export interface CTASection extends BaseSection {
  __component: 'sections.cta-section';
  title: string;
  description: string;
  primaryButtonText: string;
  primaryButtonLink?: string;
  secondaryButtonText?: string;
  secondaryButtonLink?: string;
  showStats: boolean;
  backgroundColor?: 'primary' | 'secondary' | 'gradient';
  // Stats are fetched from SiteStats service, not stored in section
}

/**
 * Callback Form Section
 * "Nosotros te Llamamos" form
 */
export interface CallbackFormSection extends BaseSection {
  __component: 'sections.callback-form-section';
  formTitle: string;
  formDescription: string;
  submitButtonText?: string;
  successMessage?: string;
  errorMessage?: string;
  privacyText?: string;
  phonePrefixes: PhonePrefix[];
  defaultPrefix?: string;
}

/**
 * Testimonial Item for Testimonials Section
 */
export interface TestimonialSectionItem {
  name: string;
  role?: string;
  company?: string;
  content: string;
  rating?: number;
  avatar?: StrapiMedia | null;
  date?: string;
}

/**
 * Testimonials Section
 * Client testimonials and reviews
 */
export interface TestimonialsSection extends BaseSection {
  __component: 'sections.testimonials-section';
  sectionTitle?: string;
  sectionSubtitle?: string;
  sectionDescription?: string;
  badge?: string;
  // Backwards compatibility
  title?: string;
  subtitle?: string;
  description?: string;
  testimonials: TestimonialSectionItem[];
  layout: 'grid' | 'carousel' | 'masonry';
  showRatings: boolean;
  showAvatars: boolean;
}

/**
 * Logo Carousel Section
 * Client logos infinite scroll
 */
export interface LogoCarouselSection extends BaseSection {
  __component: 'sections.logo-carousel-section';
  title: string;
  subtitle?: string;
  description?: string;
  showBadge?: boolean;
  badgeText?: string;
  trustIndicatorText?: string;
  animationSpeed?: number;
  // Logos are fetched from ClientLogos service, not stored in section
}

/**
 * Testimonial Feature Section
 * Combined feature showcase with testimonial
 */
export interface TestimonialFeatureSection extends BaseSection {
  __component: 'sections.testimonial-feature-section';
  position: 'left' | 'right';
  title: string;
  description: string;
  features: FeatureItem[];
  image: StrapiMedia | null;
  imageAlt?: string;
  testimonial: TestimonialItem;
  ctaText?: string;
  ctaHref?: string;
  footerText?: string;
}

/**
 * Union type of all possible sections
 */
export type Section =
  | HeroSection
  | UseCaseHeroSection
  | FeaturesSection
  | UseCaseFeaturesSection
  | PricingSection
  | CTASection
  | CallbackFormSection
  | TestimonialsSection
  | LogoCarouselSection
  | TestimonialFeatureSection;

/**
 * Page Interface
 * Main page structure
 */
export interface Page {
  id: number;
  slug: string;
  title: string;
  description?: string;
  isActive: boolean;
  order: number;
  sections: Section[];
  seo?: SEO;
  publishedAt: string | null;
  createdAt: string;
  updatedAt: string;
}

/**
 * Strapi API Response for Single Page
 */
export interface StrapiPage {
  data: {
    id: number;
    attributes: {
      slug: string;
      title: string;
      description?: string;
      isActive: boolean;
      order: number;
      sections: Section[];
      seo?: SEO;
      publishedAt: string | null;
      createdAt: string;
      updatedAt: string;
    };
  };
}

/**
 * Strapi API Response for Multiple Pages
 */
export interface StrapiPagesResponse {
  data: Array<{
    id: number;
    attributes: {
      slug: string;
      title: string;
      description?: string;
      isActive: boolean;
      order: number;
      sections: Section[];
      seo?: SEO;
      publishedAt: string | null;
      createdAt: string;
      updatedAt: string;
    };
  }>;
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}
