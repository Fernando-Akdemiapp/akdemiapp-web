/**
 * Clients Service
 * Functions for fetching client logos from Strapi
 */

import { fetchAPI, getStrapiMedia } from '../lib/api';
import type { ClientLogo, StrapiClientLogo } from '../types';

/**
 * Transform Strapi client logo response to ClientLogo interface
 * Strapi 5 returns data directly without attributes wrapper
 */
function transformClientLogo(strapiClient: any): ClientLogo {
  // Strapi 5 format - data is directly on the object
  const logoUrl = strapiClient.logo?.url
    ? getStrapiMedia(strapiClient.logo.url)
    : '';

  return {
    id: strapiClient.id,
    name: strapiClient.name,
    logo: logoUrl,
    url: strapiClient.website || '',
    isActive: strapiClient.isActive,
    order: strapiClient.order,
  };
}

/**
 * Get all active client logos, ordered by the 'order' field
 * @returns Array of active client logos
 */
export async function getClientLogos(): Promise<ClientLogo[]> {
  try {
    // Populate the logo media field
    const response = await fetchAPI<any>('/client-logos?populate=logo', {
      method: 'GET',
    });

    if (!response?.data) {
      console.log('[ClientLogos] No data received from API');
      return [];
    }

    console.log('[ClientLogos] Raw API response:', JSON.stringify(response.data[0], null, 2));

    // Transform and return client logos
    return response.data
      .map(transformClientLogo)
      .filter((client: ClientLogo) => client.isActive)
      .sort((a: ClientLogo, b: ClientLogo) => a.order - b.order);

  } catch (error) {
    console.error('Error fetching client logos:', error);
    return [];
  }
}
