/**
 * Testimonial Interface
 * Represents a customer testimonial or review
 */

export interface Testimonial {
  id: number;
  quote: string;
  author: string;
  role: string;
  company?: string;
  avatar?: string;
  rating: number;
  isFeatured: boolean;
  academyType?: string;
}

/**
 * Strapi API response format for Testimonial
 */
export interface StrapiTestimonial {
  id: number;
  attributes: Omit<Testimonial, 'id'>;
}
