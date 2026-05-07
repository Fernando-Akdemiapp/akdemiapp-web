/**
 * CallbackRequest Interface
 * Represents a callback request form submission
 */

export interface CallbackRequest {
  nombre: string;
  prefijo: string;
  telefono: string;
  telefonoCompleto: string;
  source?: string;
}

/**
 * Strapi API response format for CallbackRequest
 */
export interface StrapiCallbackRequest {
  id: number;
  attributes: Omit<CallbackRequest, 'id'> & {
    createdAt: string;
    updatedAt: string;
  };
}
