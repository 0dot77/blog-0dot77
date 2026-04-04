# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Personal portfolio / CV site for Taeyang Yoo (0dot77). Single-page static site built with Next.js 16, React 19, Tailwind CSS v4, and TypeScript.

- **Domain**: https://0dot77.com
- **Language**: Korean (lang="ko"), with English section headings

## Commands

```bash
npm run dev      # Start dev server (Next.js)
npm run build    # Production build
npm run start    # Serve production build
npm run lint     # ESLint (flat config, next/core-web-vitals + typescript)
```

No test framework is configured.

## Architecture

This is a minimal Next.js App Router project. Almost all content lives in a single page component.

```
src/
  app/
    layout.tsx    # Root layout — fonts (JetBrains Mono, Pretendard), metadata, OG tags
    page.tsx      # Single-page CV — all portfolio data is inline as const arrays
    globals.css   # Tailwind v4 @theme config with custom design tokens
  components/     # Currently empty
```

## Styling

- **Tailwind CSS v4** with `@theme inline` block in `globals.css` — no `tailwind.config` file.
- Custom color tokens: `bg`, `surface`, `border`, `text`, `text-secondary`, `teal`, `green`, `purple`.
- Two font families:
  - `--font-sans`: Pretendard Variable (loaded via CDN in `<head>`)
  - `--font-mono`: JetBrains Mono (loaded via `next/font/google`)
- Mono font applied with Tailwind v4 syntax: `font-(family-name:--font-mono)`.
- Dark theme only (bg `#0a0a0f`).

## Key Conventions

- Images are unoptimized (`next.config.ts`: `images.unoptimized: true`) — likely for static export.
- Path alias: `@/*` maps to `./src/*`.
- ESLint uses flat config (`eslint.config.mjs`) with `eslint/config` API.
- PostCSS plugin is `@tailwindcss/postcss` (Tailwind v4 canonical setup).
