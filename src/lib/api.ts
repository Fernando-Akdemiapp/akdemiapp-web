/**
 * Strapi API Client
 * Base functions for interacting with the Strapi backend
 */

interface FetchAPIOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  body?: Record<string, any>;
  headers?: Record<string, string>;
}

interface StrapiResponse<T> {
  data: T;
  meta?: {
    pagination?: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

interface StrapiError {
  status: number;
  name: string;
  message: string;
  details?: Record<string, any>;
}

/**
 * Get the full Strapi URL
 * @param path - API path (e.g., '/plans')
 * @returns Full URL to Strapi endpoint
 */
export function getStrapiURL(path: string = ''): string {
  const baseUrl = import.meta.env.PUBLIC_STRAPI_URL || 'http://localhost:1337';

  // Remove leading slash from path if present
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;

  return `${baseUrl}/${cleanPath}`;
}

/**
 * Get the full URL for a Strapi media file
 * @param url - Media URL from Strapi (can be relative or absolute)
 * @returns Full URL to the media file
 */
export function getStrapiMedia(url: string | null | undefined): string | null {
  if (!url) {
    return null;
  }

  // Return as-is if already absolute URL
  if (url.startsWith('http://') || url.startsWith('https://')) {
    return url;
  }

  // Build full URL for relative paths
  return getStrapiURL(url);
}

/**
 * Base fetch function for Strapi API calls
 * @param path - API endpoint path (e.g., '/plans')
 * @param options - Fetch options
 * @returns Parsed JSON response
 */
export async function fetchAPI<T = any>(
  path: string,
  options: FetchAPIOptions = {}
): Promise<StrapiResponse<T> | null> {
  const { method = 'GET', body, headers = {} } = options;

  // Build full API URL
  const apiUrl = import.meta.env.PUBLIC_API_URL || 'http://localhost:1337/api';
  const url = `${apiUrl}${path}`;

  // Set default headers
  const defaultHeaders: Record<string, string> = {
    'Content-Type': 'application/json',
  };

  try {
    const response = await fetch(url, {
      method,
      headers: {
        ...defaultHeaders,
        ...headers,
      },
      body: body ? JSON.stringify(body) : undefined,
    });

    // Handle non-OK responses
    if (!response.ok) {
      const errorData: { error?: StrapiError } = await response.json().catch(() => ({}));
      console.error(`Strapi API Error [${response.status}]:`, errorData.error?.message || response.statusText);
      return null;
    }

    // Parse and return JSON response
    const data = await response.json();

    // Strapi 5 puede devolver directamente arrays o el formato { data: ... }
    // Si es un array directo, wrapearlo en el formato esperado
    if (Array.isArray(data)) {
      return { data } as StrapiResponse<T>;
    }

    return data as StrapiResponse<T>;

  } catch (error) {
    console.error('Fetch API Error:', error instanceof Error ? error.message : 'Unknown error');
    return null;
  }
}

/**
 * Helper to build Strapi query parameters
 * @param params - Object with filters, sort, populate, etc.
 * @returns Query string
 */
export function buildQueryString(params: Record<string, any>): string {
  const searchParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      if (typeof value === 'object') {
        searchParams.append(key, JSON.stringify(value));
      } else {
        searchParams.append(key, String(value));
      }
    }
  });

  const queryString = searchParams.toString();
  return queryString ? `?${queryString}` : '';
}
