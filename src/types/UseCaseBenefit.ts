/**
 * Use Case Benefit Type Definition
 * Represents benefits specific to different academy types
 */

/**
 * Strapi response for use case benefits
 */
export interface StrapiUseCaseBenefit {
  id: number;
  documentId: string;
  icon: string;
  title: string;
  description: string;
  academyType: 'danzas' | 'artes-escenicas' | 'artes-marciales' | 'artes-plasticas' | 'deportiva' | 'musica' | 'pre-escolar' | 'general';
  order: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  publishedAt: string | null;
}

/**
 * Frontend use case benefit interface
 */
export interface UseCaseBenefit {
  id: number;
  icon: string;
  title: string;
  description: string;
  academyType: 'danzas' | 'artes-escenicas' | 'artes-marciales' | 'artes-plasticas' | 'deportiva' | 'musica' | 'pre-escolar' | 'general';
  order: number;
  isActive: boolean;
}
