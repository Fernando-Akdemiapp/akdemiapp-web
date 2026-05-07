/**
 * Settings Service
 * Functions for fetching global site settings (navbar, footer) from Strapi
 */

import { fetchAPI, buildQueryString } from '../lib/api';
import type {
  Settings,
  NavbarConfig,
  FooterConfig,
  NavItem,
  LinkItem,
  SocialLink,
  ButtonConfig,
} from '../types/Settings';

/**
 * Transform Strapi navigation item to NavItem interface
 */
function transformNavItem(item: any): NavItem {
  return {
    id: item.id,
    label: item.label,
    href: item.href,
    icon: item.icon || null,
    badge: item.badge || null,
    children: item.children ? item.children.map(transformNavItem) : undefined,
  };
}

/**
 * Transform Strapi link item to LinkItem interface
 */
function transformLinkItem(item: any): LinkItem {
  return {
    id: item.id,
    label: item.label,
    href: item.href,
  };
}

/**
 * Transform Strapi social link to SocialLink interface
 */
function transformSocialLink(item: any): SocialLink {
  return {
    id: item.id,
    label: item.label,
    href: item.href,
    icon: item.icon,
  };
}

/**
 * Transform Strapi button config to ButtonConfig interface
 */
function transformButtonConfig(button: any): ButtonConfig {
  return {
    id: button.id,
    text: button.text,
    link: button.link,
    variant: button.variant,
  };
}

/**
 * Transform Strapi navbar data to NavbarConfig interface
 */
function transformNavbar(navbar: any): NavbarConfig {
  return {
    id: navbar.id,
    logo: navbar.logo,
    items: navbar.items ? navbar.items.map(transformNavItem) : [],
    ctaButton: transformButtonConfig(navbar.ctaButton),
  };
}

/**
 * Transform Strapi footer data to FooterConfig interface
 */
function transformFooter(footer: any): FooterConfig {
  return {
    id: footer.id,
    logo: footer.logo,
    description: footer.description,
    productLinks: footer.productLinks ? footer.productLinks.map(transformLinkItem) : [],
    companyLinks: footer.companyLinks ? footer.companyLinks.map(transformLinkItem) : [],
    legalLinks: footer.legalLinks ? footer.legalLinks.map(transformLinkItem) : [],
    socialLinks: footer.socialLinks ? footer.socialLinks.map(transformSocialLink) : [],
    contactLocation: footer.contactLocation,
    contactPhone: footer.contactPhone,
  };
}

/**
 * Transform Strapi settings response to Settings interface
 * Note: Strapi 5 Single Types return data directly (no attributes wrapper)
 */
function transformSettings(data: any): Settings {
  return {
    id: data.id,
    navbar: transformNavbar(data.navbar),
    footer: transformFooter(data.footer),
    createdAt: data.createdAt,
    updatedAt: data.updatedAt,
    publishedAt: data.publishedAt,
  };
}

/**
 * Get global site settings (navbar and footer configuration)
 * This is a singleton collection in Strapi, so it returns a single object
 * @returns Settings object or null if not found/error
 */
export async function getSettings(): Promise<Settings | null> {
  try {
    console.log('[Settings] Fetching settings from Strapi...');

    // Strapi 5 REST API: Need to explicitly populate nested components
    // Format: populate[component][populate][field]=true
    const endpoint = '/setting' +
      '?populate[navbar][populate][logo]=true' +
      '&populate[navbar][populate][items][populate][children]=true' +
      '&populate[navbar][populate][ctaButton]=true' +
      '&populate[footer][populate][logo]=true' +
      '&populate[footer][populate][productLinks]=true' +
      '&populate[footer][populate][companyLinks]=true' +
      '&populate[footer][populate][legalLinks]=true' +
      '&populate[footer][populate][socialLinks]=true';

    console.log('[Settings] Endpoint:', endpoint);
    console.log('[Settings] Full URL:', `${import.meta.env.PUBLIC_API_URL || 'http://localhost:1337/api'}${endpoint}`);

    // Fetch settings from Strapi
    const response = await fetchAPI<any>(endpoint, {
      method: 'GET',
    });

    console.log('[Settings] Response received');
    console.log('[Settings] Full response:', JSON.stringify(response, null, 2));

    // Handle empty or error response
    if (!response?.data) {
      console.warn('[Settings] No settings data found in Strapi');
      return null;
    }

    // Strapi 5 Single Types: data is directly in response.data (no attributes wrapper)
    // Check if navbar and footer exist
    if (!response.data.navbar || !response.data.footer) {
      console.warn('[Settings] Settings incomplete - missing navbar or footer');
      console.warn('[Settings] Navbar exists:', !!response.data.navbar);
      console.warn('[Settings] Footer exists:', !!response.data.footer);
      console.warn('[Settings] Note: navbar and footer components need to be populated with data in Strapi admin');
      return null;
    }

    // Check if navbar/footer are just IDs (not populated)
    if (typeof response.data.navbar === 'object' && Object.keys(response.data.navbar).length === 1 && response.data.navbar.id) {
      console.warn('[Settings] Navbar is not populated (only has id). Need to use populate query parameter.');
      console.warn('[Settings] This might be a Strapi configuration issue or populate is not working correctly.');
      return null;
    }

    // Transform and return settings
    const transformed = transformSettings(response.data);
    console.log('[Settings] Settings transformed successfully');

    return transformed;

  } catch (error) {
    console.error('[Settings] Error fetching settings:', error);
    return null;
  }
}
