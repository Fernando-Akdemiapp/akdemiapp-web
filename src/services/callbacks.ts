/**
 * Callbacks Service
 * Functions for creating callback requests in Strapi
 */

import { fetchAPI } from '../lib/api';
import type { CallbackRequest, StrapiCallbackRequest } from '../types';

/**
 * Create a new callback request
 * @param data - Callback request data
 * @returns Created callback request or null if failed
 */
export async function createCallbackRequest(
  data: CallbackRequest
): Promise<StrapiCallbackRequest | null> {
  try {
    // Strapi expects data wrapped in a 'data' property
    const response = await fetchAPI<StrapiCallbackRequest>('/callback-requests', {
      method: 'POST',
      body: {
        data: {
          nombre: data.nombre,
          prefijo: data.prefijo,
          telefono: data.telefono,
          telefonoCompleto: data.telefonoCompleto,
          source: data.source || 'website',
        },
      },
    });

    if (!response?.data) {
      return null;
    }

    return response.data;

  } catch (error) {
    console.error('Error creating callback request:', error);
    return null;
  }
}
