import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://kevinwhite.us',
  integrations: [sitemap()],
  build: {
    // Inline small stylesheets only (<4KB by default). Keeps the HTML document
    // small for faster FCP on mobile, while still avoiding render-blocking for
    // any small per-page style chunks. The shared Tailwind CSS is served as a
    // cacheable external file and the preconnect hint makes it cheap to fetch.
    inlineStylesheets: 'auto',
  },
  vite: {
    server: { allowedHosts: ['preview.spiritmediapublishing.com'] },
    plugins: [tailwindcss()],
  },
});
