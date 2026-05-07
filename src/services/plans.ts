/**
 * Plans Service
 * Functions for fetching pricing plans from Strapi
 */

import { fetchAPI } from '../lib/api';
import type { Plan, StrapiPlan } from '../types';

/**
 * Transform Strapi plan response to Plan interface
 * Strapi 5 returns data directly without attributes wrapper
 */
function transformPlan(strapiPlan: any): Plan {
  // Strapi 5 format - data is directly on the object
  return {
    id: strapiPlan.id,
    name: strapiPlan.name,
    slug: strapiPlan.slug,
    description: strapiPlan.description,
    icon: strapiPlan.icon,
    monthlyPrice: strapiPlan.monthlyPrice,
    yearlyPrice: strapiPlan.yearlyPrice,
    features: strapiPlan.features,
    isPopular: strapiPlan.isPopular,
    isActive: strapiPlan.isActive,
    order: strapiPlan.order,
  };
}

/**
 * Get all active pricing plans, ordered by the 'order' field
 * @returns Array of active plans
 */
export async function getPricingPlans(): Promise<Plan[]> {
  try {
    const response = await fetchAPI<any>('/plans', {
      method: 'GET',
    });

    if (!response?.data) {
      console.log('No data received from plans API');
      return [];
    }

    console.log('Plans API response:', response.data);

    // Transform and return plans
    return response.data
      .map(transformPlan)
      .filter((plan: Plan) => plan.isActive)
      .sort((a: Plan, b: Plan) => a.order - b.order);

  } catch (error) {
    console.error('Error fetching pricing plans:', error);
    return [];
  }
}

/**
 * Get a specific pricing plan by slug
 * @param slug - Plan slug (e.g., 'basic', 'pro', 'enterprise')
 * @returns Plan or null if not found
 */
export async function getPricingPlanBySlug(slug: string): Promise<Plan | null> {
  try {
    const response = await fetchAPI<any>('/plans', {
      method: 'GET',
    });

    if (!response?.data) {
      return null;
    }

    // Find plan by slug - Strapi 5 format
    const strapiPlan = response.data.find(
      (plan: any) => plan.slug === slug && plan.isActive
    );

    if (!strapiPlan) {
      return null;
    }

    return transformPlan(strapiPlan);

  } catch (error) {
    console.error(`Error fetching plan with slug '${slug}':`, error);
    return null;
  }
}
