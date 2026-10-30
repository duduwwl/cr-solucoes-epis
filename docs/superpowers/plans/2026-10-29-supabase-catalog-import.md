# Supabase Catalog Import Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make Supabase the protected source of catalog and quote data, then import only visually distinct products from the supplied image library.

**Architecture:** The public site continues to use server routes. Server-only Supabase access reads catalog data and records quote requests. Catalog assets are normalized as WebP/JPEG with white backgrounds and published with the app; products point to image variants instead of duplicated records.

**Tech Stack:** Next.js 16, TypeScript, Supabase Postgres, Supabase Storage, Zod, image generation for background extraction.

**Spec:** `docs/superpowers/specs/2026-10-29-supabase-catalog-design.md`

## Global Constraints

- Do not expose Supabase secret keys or connection strings to browsers or Git.
- Keep Neon untouched until Supabase production validation passes.
- Do not invent technical certifications, CA numbers, sizes, or materials.
- One product record per visually distinct model; repeated photos are image variants.
- Existing products remain unchanged.

## Review Focus

- Missing environment variables must fail server routes without leaking configuration.
- Anonymous users must never receive write access to catalog tables.
- Re-running import must not create duplicate slugs or image variants.
- Ambiguous images must not get technical claims inferred from appearance.
- New assets must render on mobile without excess payload.

### Task 1: Supabase schema and server client

**Files:**
- Create: `supabase/migrations/20261029_catalog.sql`
- Modify: `package.json`, `src/lib/db.ts`, `.env.example`
- Test: `src/app/api/produtos/route.ts`

- [ ] Add category, product, product image, quote, audit and rate-limit schema with RLS and least-privilege policies.
- [ ] Replace Neon client with a server-only Supabase client using `SUPABASE_URL` and `SUPABASE_SECRET_KEY`.
- [ ] Preserve the public product route contract and error behavior.
- [ ] Verify typecheck and a route request against Supabase.

### Task 2: Data transition and resilient quote flow

**Files:**
- Modify: `src/app/api/produtos/route.ts`, `src/app/api/orcamentos/route.ts`, `src/lib/security.ts`
- Create: `scripts/import-existing-catalog.mjs`
- Test: API route requests

- [ ] Load current static catalog once, upsert canonical categories and products, and preserve existing slugs.
- [ ] Write quote requests, audit entries and rate-limit records through Supabase.
- [ ] Verify validation, origin check, honeypot and rate limiting still return the existing response statuses.

### Task 3: Image inventory and product import

**Files:**
- Create: `scripts/inventory-products.mjs`, `data/import-candidates.json`
- Create: `public/images/catalog/`
- Test: import script dry run

- [ ] Convert HEIC originals into review copies without touching originals.
- [ ] Group repeated photos by visually distinct model, excluding models already in `src/data/catalog.ts`.
- [ ] Generate white-background product assets non-destructively and store only approved assets in `public/images/catalog/`.
- [ ] Import candidates with generic, non-technical names where labels are unreadable.
- [ ] Verify each asset path exists and each candidate slug is unique.

### Task 4: Publish and operational verification

**Files:**
- Modify: `README.md`, `.gitignore`
- Test: build, TypeScript, production API responses

- [ ] Configure Supabase secrets as sensitive Vercel environment variables without logging values.
- [ ] Deploy via GitHub integration.
- [ ] Verify production catalog read, quote submit validation and responsive image URLs.
- [ ] Retain Neon credentials and document rollback until explicit retirement approval.
