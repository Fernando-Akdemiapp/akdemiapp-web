// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  output: 'static',
  site: 'https://akdemiapp.com',
  trailingSlash: 'ignore',
  redirects: {
    '/academias/arte': { status: 301, destination: '/academia-teatro' },
    '/academias/artes-marciales': { status: 301, destination: '/academia-artes-marciales' },
    '/academias/danza': { status: 301, destination: '/academia-danzas' },
    '/academias/futbol': { status: 301, destination: '/academia-futbol' },
  },
  integrations: [sitemap()],
  vite: {
    plugins: [tailwindcss()]
  },
  experimental: {
    clientPrerender: true
  }
});
