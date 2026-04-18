import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://kevinwhite.us',
  integrations: [sitemap()],
  build: {
    // Inline small stylesheets only (<4KB by default). Eliminates render-blocking
    // external CSS requests while keeping large Tailwind chunks external-and-cached
    // so HTML stays lean for fast FCP.
    inlineStylesheets: 'auto',
  },
  vite: {
    server: { allowedHosts: ['preview.spiritmediapublishing.com'] },
    plugins: [tailwindcss()],
  },
});
