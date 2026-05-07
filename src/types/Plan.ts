/**
 * Pricing Plan Interface
 * Represents a subscription plan with pricing and features
 */

export interface Plan {
  id: number;
  name: string;
  slug: string;
  monthlyPrice: number;
  yearlyPrice: number;
  description: string;
  features: string[];
  icon: string;
  isPopular: boolean;
  isActive: boolean;
  order: number;
}

/**
 * Strapi API response format for Plan
 */
export interface StrapiPlan {
  id: number;
  attributes: Omit<Plan, 'id'>;
}
