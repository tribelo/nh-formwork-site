# NH Formwork Limited — Website

Single-page static brochure site for NH Formwork Limited, a Bath-based concrete formwork specialist. Built with [Astro](https://astro.build/) — static-first, ships zero client-side JavaScript, system fonts only, no third-party scripts.

## Prerequisites

- **Node.js 20+** (Node 24 also works fine).
- npm (bundled with Node).

## Install

```bash
npm install
```

## Develop

```bash
npm run dev
```

Then open <http://localhost:4321/nh-formwork-site/> (the `base` path is configured in `astro.config.mjs`).

## Build

```bash
npm run build
```

Output is written to `dist/`. To preview the production build locally:

```bash
npm run preview
```

## Deploy

Pushes to `main` are deployed automatically to GitHub Pages via the workflow at `.github/workflows/deploy.yml` (uses the official `withastro/action@v3` and `actions/deploy-pages@v4`). The workflow can also be triggered manually from the Actions tab (`workflow_dispatch`).

## Site / base URL

The `astro.config.mjs` is currently set up for GitHub Pages:

- `site: 'https://pittdog.github.io'`
- `base: '/nh-formwork-site'`

When a real domain (e.g. `https://nhformwork.co.uk`) is wired up, drop the `base` and update `site` to the real origin. There's a `// TODO` comment in `astro.config.mjs` as a reminder. The canonical URL, OG URL, and JSON-LD `url` are all derived from these settings, so updating the config updates the whole site.

## Where contact details live

The phone number, email, Facebook link and service area are hard-coded in the components. Search for `+447966190511`, `nhformwork@gmail.com`, or `facebook.com/nhformwork` to find every reference. The JSON-LD `GeneralContractor` block lives in `src/layouts/BaseLayout.astro`.

## Project structure

```
public/                 # static assets copied verbatim (favicon, robots.txt)
src/
  pages/index.astro     # the only page
  layouts/BaseLayout.astro   # head, meta, OG, JSON-LD, skip-link, footer
  components/           # SiteHeader, Hero, Services, WhyUs, Gallery, About, Contact, SiteFooter
  styles/global.css     # all styles, system fonts, light + dark mode
astro.config.mjs        # site, base, sitemap integration
```

## Accessibility & performance notes

- Semantic HTML5 landmarks, skip-link, visible focus rings, `prefers-reduced-motion` respected, `lang="en-GB"`, dark-mode aware.
- System font stack — no Google Fonts or external CSS.
- Inline SVG icons; favicon is a real `.svg` file, no extra HTTP request beyond the icon itself.
- **Zero client-side JavaScript shipped.** The mobile nav is a pure-CSS hidden checkbox toggle.
- Sitemap is generated at build time by `@astrojs/sitemap`.
- Total HTML + CSS comfortably under 50 KB uncompressed.

## Things the owner should review

- The site/base URL placeholder in `astro.config.mjs` — set to the real production origin once a custom domain is wired up.
- The Open Graph image — currently falls back to the SVG favicon. Add a real 1200x630 image in `public/` and update the `ogImage` in `BaseLayout.astro` if desired.
- The "Recent work" gallery uses CSS-only placeholders. Replace with real project photos when available.
