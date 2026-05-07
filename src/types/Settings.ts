/**
 * Settings Type Definitions
 * Complete type system for global site settings (Navbar, Footer, etc.)
 */

import type { StrapiMedia } from './Page';

/**
 * Social Media Icons
 * Supported social platforms for footer links
 */
export type SocialIcon = 'whatsapp' | 'facebook' | 'instagram' | 'twitter' | 'linkedin';

/**
 * Button Variants
 * Visual styles for CTA buttons
 */
export type ButtonVariant = 'primary' | 'secondary';

/**
 * Navigation Item Interface
 * Represents a single navigation link with optional dropdown children
 * Supports one level of nested items for dropdown menus
 */
export interface NavItem {
  id: number;
  label: string;
  href: string;
  icon?: string | null;
  badge?: string | null;
  children?: NavItem[]; // Dropdown items (only one level deep)
}

/**
 * Link Item Interface
 * Simple link structure for footer sections
 */
export interface LinkItem {
  id: number;
  label: string;
  href: string;
}

/**
 * Social Link Interface
 * Social media link with specific icon type
 */
export interface SocialLink {
  id: number;
  label: string;
  href: string;
  icon: SocialIcon;
}

/**
 * Button Configuration Interface
 * CTA button with text, link, and visual variant
 */
export interface ButtonConfig {
  id: number;
  text: string;
  link: string;
  variant: ButtonVariant;
}

/**
 * Navbar Configuration Interface
 * Complete navigation bar configuration
 */
export interface NavbarConfig {
  id: number;
  logo: StrapiMedia;
  items: NavItem[];
  ctaButton: ButtonConfig;
}

/**
 * Footer Configuration Interface
 * Complete footer configuration with multiple link sections
 */
export interface FooterConfig {
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

/**
 * Settings Interface
 * Global site settings including navbar and footer
 */
export interface Settings {
  id: number;
  navbar: NavbarConfig;
  footer: FooterConfig;
  createdAt: string;
  updatedAt: string;
  publishedAt: string | null;
}

/**
 * Strapi API Response for Settings
 * Response format from Strapi for settings endpoint
 */
export interface StrapiSettings {
  data: {
    id: number;
    attributes: {
      navbar: NavbarConfig;
      footer: FooterConfig;
      createdAt: string;
      updatedAt: string;
      publishedAt: string | null;
    };
  };
}
