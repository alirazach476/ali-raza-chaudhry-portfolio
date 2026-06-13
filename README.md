# Abdullah Yaseen — Portfolio

Premium 3D-animated developer portfolio with case studies and client-converting sections.

## Quick Start

```bash
npm run setup    # install deps + generate project screenshots
npm run dev      # http://localhost:5173
```

## Features

- **Case studies** — `/work/:slug` for Autozy, Raahban, Watches, ALPR, Tracking
- **Contact** — Copy email, WhatsApp, LinkedIn, GitHub
- **Social proof** — Testimonials, trusted-by logos, availability badge, impact stats
- **Services & process** — Offerings + Discovery → Build → Launch → Support timeline
- **SEO** — Open Graph, Twitter Cards, JSON-LD, sitemap, robots.txt, manifest
- **UX** — Cmd/Ctrl+K command palette, scroll progress, back-to-top, active nav, 404 page
- **Resume** — Download button (uses `/public/Abdullah-Yaseen-Resume.pdf`)

## Automated Assets

Place your photo at `assets/abdullah-original.jpg`, then:

```bash
npm run assets          # screenshots + background cutout
npm run og-image        # regenerate social share image
```

## Customize Content

| File | What to edit |
|------|--------------|
| `src/data/content.ts` | Bio, projects, email, socials |
| `src/data/caseStudies.ts` | Case study copy |
| `src/data/socialProof.ts` | Testimonials, stats, availability |
| `src/data/services.ts` | Services & process steps |

## Deploy (Vercel)

```bash
npm run build
```

Update `canonical` URL and sitemap domain in `index.html` / `public/sitemap.xml` to your live domain.

## Tech Stack

Vite · React · TypeScript · React Router · Three.js · GSAP · Framer Motion · Lenis · Tailwind CSS v4
