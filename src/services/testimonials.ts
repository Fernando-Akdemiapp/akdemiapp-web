/**
 * Testimonials Service
 * Functions for fetching customer testimonials from Strapi
 */

import { fetchAPI } from '../lib/api';
import type { Testimonial, StrapiTestimonial } from '../types';

/**
 * Transform Strapi testimonial response to Testimonial interface
 */
function transformTestimonial(strapiTestimonial: StrapiTestimonial): Testimonial {
  return {
    id: strapiTestimonial.id,
    ...strapiTestimonial.attributes,
  };
}

/**
 * Get testimonials, optionally filtered by academy type
 * @param academyType - Optional academy type to filter by (e.g., 'artes-escenicas', 'deportiva')
 * @returns Array of testimonials
 */
export async function getTestimonials(academyType?: string): Promise<Testimonial[]> {
  try {
    const response = await fetchAPI<StrapiTestimonial[]>('/testimonials', {
      method: 'GET',
    });

    if (!response?.data) {
      return [];
    }

    // Transform testimonials
    let testimonials = response.data.map(transformTestimonial);

    // Filter by academy type if provided
    if (academyType) {
      testimonials = testimonials.filter(
        testimonial => !testimonial.academyType || testimonial.academyType === academyType
      );
    }

    // Sort by rating (highest first), then by featured status
    return testimonials.sort((a, b) => {
      if (a.isFeatured !== b.isFeatured) {
        return a.isFeatured ? -1 : 1;
      }
      return b.rating - a.rating;
    });

  } catch (error) {
    console.error('Error fetching testimonials:', error);
    return [];
  }
}

/**
 * Get only featured testimonials
 * @returns Array of featured testimonials
 */
export async function getFeaturedTestimonials(): Promise<Testimonial[]> {
  try {
    const response = await fetchAPI<StrapiTestimonial[]>('/testimonials', {
      method: 'GET',
    });

    if (!response?.data) {
      return [];
    }

    // Transform and filter featured testimonials
    return response.data
      .map(transformTestimonial)
      .filter(testimonial => testimonial.isFeatured)
      .sort((a, b) => b.rating - a.rating);

  } catch (error) {
    console.error('Error fetching featured testimonials:', error);
    return [];
  }
}
