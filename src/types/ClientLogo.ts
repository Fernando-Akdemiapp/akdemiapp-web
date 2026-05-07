/**
 * ClientLogo Interface
 * Represents a client/company logo
 */

export interface ClientLogo {
  id: number;
  name: string;
  logo: string;
  url?: string;
  isActive: boolean;
  order: number;
}

/**
 * Strapi API response format for ClientLogo
 */
export interface StrapiClientLogo {
  id: number;
  attributes: Omit<ClientLogo, 'id'>;
}
