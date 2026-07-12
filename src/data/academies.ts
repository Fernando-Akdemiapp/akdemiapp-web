/**
 * Client academies shown in the "Academias de toda Latinoamérica" social-proof
 * strip on the home page.
 *
 * Previously fetched from Strapi via `getClientLogos()` as image logos hosted on
 * admin.akdemiapp.com. Those images are PERMANENTLY LOST (media host down, 503) —
 * see backup-sitio/imagenes-perdidas.txt for the original (dead) image URLs.
 *
 * Rendered as text wordmarks. This is the AUTHORITATIVE client list and order,
 * taken from the live site's logo alt text (provided by the site owner).
 */
export interface Academy {
  name: string;
}

export const academies: Academy[] = [
  { name: "Allonge Studio" },
  { name: "Folklore" },
  { name: "Academia Cai" },
  { name: "Scorpions Academy" },
  { name: "A4U" },
  { name: "AM Dance" },
  { name: "Elementrix" },
  { name: "Maka" },
  { name: "Azul" },
  { name: "Teacher Gissel" },
  { name: "Gladiadores" },
  { name: "Conchita" },
  { name: "Evolución" },
  { name: "EFA" },
  { name: "The Victory Gym" },
  { name: "Somos" },
  { name: "Tutorias" },
  { name: "TH" },
  { name: "MAB" },
  { name: "Dolls" },
  { name: "Full Society" },
  { name: "Kdencia" },
  { name: "JM" },
  { name: "Sanchez Soccer Academy" },
  { name: "Kuyka Academia" },
];
