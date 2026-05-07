/**
 * Features Service
 * Functions for fetching product features from Strapi
 */

import { fetchAPI } from '../lib/api';
import type { Feature, StrapiFeature } from '../types';

/**
 * Transform Strapi feature response to Feature interface
 */
function transformFeature(strapiFeature: StrapiFeature): Feature {
  return {
    id: strapiFeature.id,
    ...strapiFeature.attributes,
  };
}

/**
 * Get all active features, ordered by the 'order' field
 * @returns Array of active features
 */
export async function getFeatures(): Promise<Feature[]> {
  try {
    const response = await fetchAPI<StrapiFeature[]>('/features', {
      method: 'GET',
    });

    if (!response?.data) {
      return [];
    }

    // Transform and return features
    return response.data
      .map(transformFeature)
      .filter(feature => feature.isActive)
      .sort((a, b) => a.order - b.order);

  } catch (error) {
    console.error('Error fetching features:', error);
    return [];
  }
}
