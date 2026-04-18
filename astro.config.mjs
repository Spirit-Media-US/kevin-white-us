import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://kevinwhite.us',
  integrations: [sitemap()],
  build: {
    // Inline ALL stylesheets. The Tailwind CSS bundle is ~13KB uncompressed / ~5KB
    // gzipped — small enough that inlining eliminates the render-blocking external
    // CSS request from the critical path (saves ~300ms on mobile LCP) without
    // materially increasing HTML size.
    inlineStylesheets: 'always',
  },
  vite: {
    server: { allowedHosts: ['preview.spiritmediapublishing.com'] },
    plugins: [tailwindcss()],
  },
});
