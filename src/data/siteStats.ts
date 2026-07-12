/**
 * Site-wide statistics shown on the home page (Hero stats band).
 *
 * Previously fetched from Strapi via `getSiteStats()`; now static local data.
 * Source of truth: rescued live-site snapshot (backup-sitio/index.txt, "70+ /
 * 5,000+ / 98%"). Kept as a data file so the numbers live in one place.
 */
export interface SiteStats {
  /** "Academias activas" — rendered as `${totalAcademies}+` */
  totalAcademies: number;
  /** "Alumnos gestionados" — free text (kept as-is, incl. thousands separator) */
  studentsManaged: string;
  /** "Satisfacción" — rendered as `${satisfactionRate}%` */
  satisfactionRate: number;
}

export const siteStats: SiteStats = {
  totalAcademies: 70,
  studentsManaged: "5,000+",
  satisfactionRate: 98,
};
