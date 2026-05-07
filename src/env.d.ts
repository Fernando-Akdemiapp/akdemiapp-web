/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

/**
 * Astro component type declarations
 */
declare module '*.astro' {
  import type { AstroComponentFactory } from 'astro/runtime/server/index.js';
  const component: AstroComponentFactory;
  export default component;
}

/**
 * Type declarations for Astro section components
 */
declare module '@/components/sections/*.astro' {
  import type { AstroComponentFactory } from 'astro/runtime/server/index.js';
  const component: AstroComponentFactory;
  export default component;
}
