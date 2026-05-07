/**
 * Pages Service
 * Functions for fetching dynamic pages from Strapi
 */

import { fetchAPI } from '../lib/api';
import type { Page, StrapiPage, StrapiPagesResponse } from '../types';

/**
 * Build query string with Strapi's qs library format for complex queries
 * @param params - Query parameters object
 * @returns Query string
 */
function buildStrapiQuery(params: Record<string, any>): string {
  const queryParams: string[] = [];

  // Handle populate
  if (params.populate) {
    if (typeof params.populate === 'object') {
      Object.entries(params.populate).forEach(([key, value]) => {
        if (typeof value === 'object') {
          Object.entries(value as Record<string, any>).forEach(([subKey, subValue]) => {
            queryParams.push(`populate[${key}][${subKey}]=${subValue}`);
          });
        } else {
          queryParams.push(`populate[${key}]=${value}`);
        }
      });
    } else {
      queryParams.push(`populate=${params.populate}`);
    }
  }

  // Handle filters
  if (params.filters) {
    Object.entries(params.filters).forEach(([key, value]) => {
      if (typeof value === 'object') {
        Object.entries(value as Record<string, any>).forEach(([operator, operatorValue]) => {
          queryParams.push(`filters[${key}][${operator}]=${operatorValue}`);
        });
      } else {
        queryParams.push(`filters[${key}]=${value}`);
      }
    });
  }

  // Handle sort
  if (params.sort) {
    if (Array.isArray(params.sort)) {
      params.sort.forEach((sortField: string, index: number) => {
        queryParams.push(`sort[${index}]=${sortField}`);
      });
    } else {
      queryParams.push(`sort=${params.sort}`);
    }
  }

  // Handle fields
  if (params.fields) {
    if (Array.isArray(params.fields)) {
      params.fields.forEach((field: string, index: number) => {
        queryParams.push(`fields[${index}]=${field}`);
      });
    } else {
      queryParams.push(`fields=${params.fields}`);
    }
  }

  return queryParams.length > 0 ? `?${queryParams.join('&')}` : '';
}

/**
 * Transform Strapi page response to Page interface
 * Note: Strapi 5 returns data directly (no attributes wrapper for some endpoints)
 */
function transformPage(strapiPageData: any): Page {
  // Strapi 5 puede devolver datos con o sin wrapper 'attributes'
  const data = strapiPageData.attributes || strapiPageData;

  return {
    id: strapiPageData.id,
    slug: data.slug,
    title: data.title,
    description: data.description,
    isActive: data.isActive,
    order: data.order,
    sections: data.sections || [],
    seo: data.seo,
    publishedAt: data.publishedAt,
    createdAt: data.createdAt,
    updatedAt: data.updatedAt,
  };
}

/**
 * Get all active pages, ordered by the 'order' field
 * Includes populated sections and SEO metadata
 * @returns Array of active pages
 */
export async function getPages(): Promise<Page[]> {
  try {
    const query = buildStrapiQuery({
      populate: {
        sections: {
          populate: '*',
        },
        seo: {
          populate: '*',
        },
      },
      filters: {
        isActive: {
          $eq: true,
        },
      },
      sort: ['order:asc'],
    });

    const response = await fetchAPI<StrapiPagesResponse['data']>(`/pages${query}`, {
      method: 'GET',
    });

    if (!response?.data) {
      console.warn('No pages data received from API');
      return [];
    }

    // Transform and return pages
    return response.data.map(transformPage);

  } catch (error) {
    console.error('Error fetching pages:', error instanceof Error ? error.message : 'Unknown error');
    return [];
  }
}

/**
 * Get a specific page by slug
 * Includes populated sections and SEO metadata
 * @param slug - Page slug identifier
 * @returns Page object or null if not found
 */
export async function getPageBySlug(slug: string): Promise<Page | null> {
  try {
    console.log(`[Pages] Fetching page with slug: "${slug}"`);

    // Strapi 5 query format for nested populate and filters
    // Dynamic zones require 'on' syntax to populate component fields
    // Must use populate=* to populate all fields within each component including media
    // Reference: https://docs.strapi.io/cms/api/rest/guides/understanding-populate#populate-dynamic-zones
    const endpoint = `/pages` +
      `?populate[sections][on][sections.hero-section][populate]=*` +
      `&populate[sections][on][sections.features-section][populate]=*` +
      `&populate[sections][on][sections.pricing-section][populate]=*` +
      `&populate[sections][on][sections.testimonials-section][populate]=*` +
      `&populate[sections][on][sections.logo-carousel-section][populate]=*` +
      `&populate[sections][on][sections.cta-section][populate]=*` +
      `&populate[sections][on][sections.callback-form-section][populate]=*` +
      `&populate[sections][on][sections.use-case-hero-section][populate]=*` +
      `&populate[sections][on][sections.use-case-features-section][populate]=*` +
      `&populate[seo][populate][ogImage]=*` +
      `&filters[slug][$eq]=${slug}` +
      `&filters[isActive][$eq]=true`;

    console.log(`[Pages] Endpoint:`, endpoint);
    console.log(`[Pages] Full URL:`, `${import.meta.env.PUBLIC_API_URL || 'http://localhost:1337/api'}${endpoint}`);

    const response = await fetchAPI<any>(endpoint, {
      method: 'GET',
    });

    console.log(`[Pages] Raw response (first 200 chars):`, JSON.stringify(response).substring(0, 200));

    // Log the full sections array to see if image field is present
    if (Array.isArray(response)) {
      console.log(`[Pages] Full sections data:`, JSON.stringify(response[0]?.sections, null, 2));
    } else if (response?.data && Array.isArray(response.data)) {
      console.log(`[Pages] Full sections data:`, JSON.stringify(response.data[0]?.sections, null, 2));
    }

    // Strapi 5 puede devolver directamente un array o { data: [...] }
    let pagesData: any[];

    if (Array.isArray(response)) {
      // Respuesta directa como array
      pagesData = response;
      console.log(`[Pages] Response format: direct array, ${pagesData.length} pages found`);
    } else if (response?.data && Array.isArray(response.data)) {
      // Respuesta con wrapper { data: [...] }
      pagesData = response.data;
      console.log(`[Pages] Response format: wrapped, ${pagesData.length} pages found`);
    } else {
      console.warn(`[Pages] Unexpected response format`);
      return null;
    }

    if (pagesData.length === 0) {
      console.warn(`[Pages] Page with slug "${slug}" not found`);
      return null;
    }

    // Return the first matching page
    const page = transformPage(pagesData[0]);
    console.log(`[Pages] Page transformed successfully:`, page.title);
    return page;

  } catch (error) {
    console.error(`[Pages] Error fetching page by slug "${slug}":`, error instanceof Error ? error.message : 'Unknown error');
    return null;
  }
}

/**
 * Get all page slugs
 * Useful for generating static paths (getStaticPaths)
 * @returns Array of page slugs
 */
export async function getPageSlugs(): Promise<string[]> {
  try {
    const query = buildStrapiQuery({
      fields: ['slug'],
      filters: {
        isActive: {
          $eq: true,
        },
      },
    });

    const response = await fetchAPI<StrapiPagesResponse['data']>(`/pages${query}`, {
      method: 'GET',
    });

    if (!response?.data) {
      console.warn('No pages data received from API');
      return [];
    }

    // Extract slugs from response
    return response.data.map((page) => page.attributes.slug);

  } catch (error) {
    console.error('Error fetching page slugs:', error instanceof Error ? error.message : 'Unknown error');
    return [];
  }
}
