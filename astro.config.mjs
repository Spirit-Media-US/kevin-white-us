import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://kevinwhite.us',
  integrations: [sitemap()],
  build: {
    // Inline everything. On this site the LCP is the hero H1 text; external
    // CSS was adding 2.5s of element-render-delay waiting for the stylesheet
    // fetch to unblock paint. Inlining adds ~13KB to HTML (~26KB total) but
    // removes the critical-path round-trip entirely.
    inlineStylesheets: 'always',
  },
  vite: {
    server: { allowedHosts: ['preview.spiritmediapublishing.com'] },
    plugins: [tailwindcss()],
  },
});
