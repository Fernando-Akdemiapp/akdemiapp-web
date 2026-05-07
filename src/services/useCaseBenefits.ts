/**
 * Use Case Benefits Service
 * Functions for fetching academy-specific benefits from Strapi
 */

import { fetchAPI } from '../lib/api';
import type { UseCaseBenefit, StrapiUseCaseBenefit } from '../types';

/**
 * Transform Strapi use case benefit response to UseCaseBenefit interface
 */
function transformUseCaseBenefit(strapiBenefit: StrapiUseCaseBenefit): UseCaseBenefit {
  return {
    id: strapiBenefit.id,
    icon: strapiBenefit.icon,
    title: strapiBenefit.title,
    description: strapiBenefit.description,
    academyType: strapiBenefit.academyType,
    order: strapiBenefit.order,
    isActive: strapiBenefit.isActive,
  };
}

/**
 * Get use case benefits filtered by academy type
 * @param academyType - Optional academy type to filter ('danzas', 'artes-escenicas', etc.)
 * @returns Array of active benefits ordered by 'order' field
 */
export async function getUseCaseBenefits(academyType?: string): Promise<UseCaseBenefit[]> {
  try {
    // Build query parameters
    let path = '/use-case-benefits';
    const queryParams: string[] = [];

    // Filter by academy type if provided
    if (academyType) {
      queryParams.push(`filters[academyType][$eq]=${academyType}`);
    }

    // Always filter by active status
    queryParams.push('filters[isActive][$eq]=true');

    // Sort by order field
    queryParams.push('sort=order:asc');

    // Append query parameters if any
    if (queryParams.length > 0) {
      path += `?${queryParams.join('&')}`;
    }

    const response = await fetchAPI<StrapiUseCaseBenefit[]>(path, {
      method: 'GET',
    });

    if (!response?.data) {
      return [];
    }

    // Transform and return benefits
    return response.data.map(transformUseCaseBenefit);

  } catch (error) {
    console.error('Error fetching use case benefits:', error);
    return [];
  }
}

/**
 * Get use case benefits for multiple academy types
 * Useful for fetching general benefits that apply to all types
 * @param academyTypes - Array of academy types
 * @returns Array of active benefits
 */
export async function getUseCaseBenefitsByTypes(academyTypes: string[]): Promise<UseCaseBenefit[]> {
  try {
    // Build query with multiple filters
    let path = '/use-case-benefits?';
    const filters = academyTypes.map((type, index) =>
      `filters[$or][${index}][academyType][$eq]=${type}`
    ).join('&');

    path += filters;
    path += '&filters[isActive][$eq]=true';
    path += '&sort=order:asc';

    const response = await fetchAPI<StrapiUseCaseBenefit[]>(path, {
      method: 'GET',
    });

    if (!response?.data) {
      return [];
    }

    // Transform and return benefits
    return response.data.map(transformUseCaseBenefit);

  } catch (error) {
    console.error('Error fetching use case benefits by types:', error);
    return [];
  }
}
