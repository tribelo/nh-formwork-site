// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// TODO: when a real domain is wired up (e.g. https://nhformwork.co.uk),
// drop the `base` and update `site` to the real origin.
export default defineConfig({
  site: 'https://pittdog.github.io',
  base: '/nh-formwork-site',
  output: 'static',
  trailingSlash: 'ignore',
  integrations: [sitemap()],
  compressHTML: true,
});
