# AI Engineer Portfolio

Interactive personal portfolio for Nguyen Ngoc Thanh, an aspiring AI Engineer.

## About

A dark, futuristic portfolio presenting Thanh's education, AI engineering direction, interactive 3D work, AI interface, and contact information.

## Features

- Interactive procedural 3D AI Core
- Draggable and keyboard-accessible 3D panda companion
- AI Engineer portfolio introduction
- Education profile
- Streaming mock AI interface
- Contact and social links
- Responsive design
- Reduced-motion and keyboard accessibility support
- SEO metadata, Open Graph, sitemap, and robots configuration
- Reusable Projects and Skills data/components for future use

## Tech Stack

- Next.js 16
- React 19
- TypeScript
- Three.js
- React Three Fiber
- React Three Drei
- GSAP and ScrollTrigger
- Motion
- Tailwind CSS 4
- Lucide React

## Local Development

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

## Production Build

```bash
pnpm lint
pnpm build
```

## Environment Variables

Copy `.env.example` and set the public production URL:

```env
NEXT_PUBLIC_SITE_URL=https://your-production-url.vercel.app
```

This value is used for canonical metadata, sitemap, and robots output. The AI interface currently uses the repository's mock streaming route and does not require an external API key.

## Live Demo

The production Vercel URL will be added here after deployment.
