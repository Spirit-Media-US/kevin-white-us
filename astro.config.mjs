import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://kevinwhite.us',
  integrations: [sitemap()],
  build: {
    // Inline all stylesheets into <head> — eliminates render-blocking external CSS
    // request on mobile 3G (saves ~300ms in Lighthouse lab). Proven on Scripture Alive.
    inlineStylesheets: 'always',
  },
  vite: {
    server: { allowedHosts: ['preview.spiritmediapublishing.com'] },
    plugins: [tailwindcss()],
  },
});
