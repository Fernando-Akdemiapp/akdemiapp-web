/**
 * Stats Service
 * Functions for fetching site statistics from Strapi (Single Type)
 */

import { fetchAPI } from '../lib/api';
import type { SiteStats, StrapiSiteStats } from '../types';

/**
 * Transform Strapi site stats response to SiteStats interface
 */
function transformSiteStats(strapiStats: StrapiSiteStats): SiteStats {
  return {
    id: strapiStats.id,
    ...strapiStats.attributes,
  };
}

/**
 * Get site statistics (Single Type)
 * @returns Site statistics or null if not available
 */
export async function getSiteStats(): Promise<SiteStats | null> {
  try {
    // Note: Single Types in Strapi don't use plural endpoint and return object directly
    const response = await fetchAPI<StrapiSiteStats>('/site-stat', {
      method: 'GET',
    });

    if (!response?.data) {
      return null;
    }

    return transformSiteStats(response.data);

  } catch (error) {
    console.error('Error fetching site stats:', error);
    return null;
  }
}
