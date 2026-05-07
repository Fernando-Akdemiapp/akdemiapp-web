/**
 * SiteStats Interface
 * Represents site-wide statistics (Single Type in Strapi)
 */

export interface SiteStats {
  id: number;
  totalAcademies: number;
  activeUsers: number;
  satisfactionRate: number;
  hoursPerMonthSaved: number;
  lastUpdated: string;
}

/**
 * Strapi API response format for SiteStats (Single Type)
 */
export interface StrapiSiteStats {
  id: number;
  attributes: Omit<SiteStats, 'id'>;
}
