/**
 * Feature Interface
 * Represents a product feature or capability
 */

export interface Feature {
  id: number;
  title: string;
  description: string;
  icon: string;
  badge?: string;
  isActive: boolean;
  order: number;
}

/**
 * Strapi API response format for Feature
 */
export interface StrapiFeature {
  id: number;
  attributes: Omit<Feature, 'id'>;
}
