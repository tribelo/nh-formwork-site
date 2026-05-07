# NH Formwork Limited — Website

Single-page static brochure site for NH Formwork Limited, a Bath-based concrete formwork specialist.

## What's here

- `index.html` — the entire page
- `styles.css` — single stylesheet, system fonts, light + dark mode
- `script.js` — small progressive-enhancement script for the mobile nav toggle (site is fully usable without it)
- `robots.txt`, `sitemap.xml` — basic SEO
- `LICENSE` — MIT
- `.gitignore` — standard

No build step, no dependencies, no tracking, no third-party scripts.

## Preview locally

```bash
python3 -m http.server 8080
```

Then open <http://localhost:8080/>.

## Where contact details live

The phone number, email, Facebook link and service area are hard-coded in `index.html`. Search for `+447966190511`, `nhformwork@gmail.com`, or `facebook.com/nhformwork` to find every reference. Don't forget to update the JSON-LD `LocalBusiness` block at the top of the file as well if anything changes.

## Deployment

This is a fully static site — drop the files onto any static host. Suggested options:

- **GitHub Pages**: push to a repo and enable Pages on the `main` branch (root). No CNAME file is included; add one if you want a custom domain.
- **Netlify / Cloudflare Pages**: connect the repo, no build command, publish directory is the repo root.
- **Plain web host**: copy all files via SFTP.

### After deploying

Update the canonical URL and `og:url` in `index.html` (and the URLs in `sitemap.xml` / `robots.txt`) if the live URL is anything other than `https://nhformwork.co.uk/`. There's a `<!-- NOTE: ... -->` comment in `index.html` next to the canonical link as a reminder.

## Accessibility & performance notes

- Semantic HTML5 landmarks, skip-link, visible focus rings, `prefers-reduced-motion` respected, dark-mode aware.
- System font stack — no Google Fonts or external CSS.
- Inline SVG icons and an inline SVG favicon (data URI), no extra HTTP requests for graphics.
- Total HTML + CSS is comfortably under 50 KB uncompressed.

## Things the owner should review

- The canonical URL placeholder (`https://nhformwork.co.uk/`) — set this to the real production URL.
- The Open Graph image URL (`/og-image.jpg`) — currently a placeholder; add a real 1200x630 image and upload it to the site root, or remove the `og:image` meta if not using one.
- The "Recent work" gallery uses CSS-only placeholders. Replace with real project photos when available.
