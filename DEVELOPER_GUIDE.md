# Tuli Artisan — Developer Guide

## Project Overview
Premium e-commerce platform connecting customers to Indian artisans. Built with Next.js 16, React 19, TypeScript, Tailwind CSS v4.

## Architecture

### Directory Structure
- `src/app/` — Next.js App Router pages (each route = separate file)
- `src/components/ui/` — Reusable UI primitives (Reveal, Divider, Tag, Img, etc.)
- `src/components/layout/` — Navbar, Footer, MobileMenu
- `src/components/product/` — Product-specific components
- `src/components/home/` — Home page section components
- `src/context/` — React context providers (Theme, Cart)
- `src/hooks/` — Custom React hooks
- `src/lib/` — Utilities, constants, theme reference
- `src/data/` — Data layer (hardcoded for now, will become database queries)
- `src/types/` — TypeScript type definitions
- `middleware.ts` — Security headers

### Key Patterns
- **Theme**: CSS custom properties on `[data-theme]` attribute, toggled via `ThemeContext`
- **Routing**: Standard Next.js App Router with `<Link>` — no SPA-style navigation
- **Server/Client split**: Pages are server components; interactive parts use `"use client"`
- **Animations**: CSS transitions for reveals/hovers, Framer Motion for page transitions
- **Styling**: Inline styles referencing CSS variables (`var(--color-dark)`)

### Data Layer
Data currently lives in `src/data/` as TypeScript constants. When adding a database:
1. Replace imports from `@/data/*` with database queries
2. Each `getProduct()`, `getArtisan()`, etc. becomes an async database call
3. Page components already support this pattern via `generateStaticParams()`

## Commands
- `npm run dev` — Start development server
- `npm run build` — Production build (verifies TypeScript, generates static pages)
- `npm run lint` — Run ESLint

## Conventions
- TypeScript strict mode — all files are `.ts`/`.tsx`
- Import alias: `@/` maps to `src/`
- Component files: PascalCase (`ProductCard.tsx`)
- Hook files: kebab-case prefixed with `use-` (`use-in-view.ts`)
- One component per file (with helper sub-components allowed)
- CSS custom properties for all theme colors: `var(--color-dark)`, `var(--color-gold)`, etc.
- Security headers in `middleware.ts` — update CSP when adding external services

## Brand Guidelines
- Fonts: Cormorant Garamond (headings), Karla (body)
- Gold accent: `--color-gold` (#B8960C light / #D4B96E dark)
- Tone: Premium, editorial, heritage-focused
- No emojis in UI copy. Minimal use of icons.
