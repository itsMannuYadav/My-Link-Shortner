# My Link Shortner

**My Link** — Create short, clean and shareable links instantly.

A production-quality URL shortener SaaS built as a portfolio-grade MVP. Inspired by Bitly, Dub.co, and Rebrandly — fast redirects, custom aliases, QR codes, and a polished modern UI.

**Live domain:** [go.mannuyadav.me](https://go.mannuyadav.me)

---

## Features

- **URL shortening** — 6-character alphanumeric codes with collision handling
- **Custom aliases** — Branded links like `/library`
- **Instant redirects** — Server-side HTTP redirects at `/[shortCode]`
- **QR codes** — Auto-generated with PNG download
- **Copy to clipboard** — One-click copy with toast feedback
- **Recent links** — Last 10 links stored in browser localStorage
- **Dark mode** — System preference + manual toggle with persistence
- **SEO ready** — Metadata, Open Graph, Twitter Cards, robots.txt, sitemap.xml
- **Accessible** — Semantic HTML, ARIA labels, keyboard navigation

---

## Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 |
| UI | Shadcn UI |
| ORM | Prisma 7 |
| Database | SQLite (development) |
| Deployment | Vercel |

---

## Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── [shortCode]/        # Redirect handler
│   ├── api/
│   │   ├── shorten/        # POST /api/shorten
│   │   └── link/[shortCode]/
│   ├── layout.tsx
│   ├── page.tsx
│   ├── not-found.tsx
│   ├── robots.ts
│   └── sitemap.ts
├── components/
│   ├── home/               # Homepage sections
│   ├── layout/             # Navbar, Footer
│   ├── providers/          # Theme provider
│   ├── shared/             # CopyButton, QrCodeDialog
│   └── ui/                 # Shadcn components
├── features/links/         # Types & constants
├── hooks/                  # useRecentLinks, useCopyToClipboard
├── lib/                    # config, prisma
├── services/               # link.service.ts (business logic)
└── utils/                  # url, short-code helpers
```

---

## Setup Guide

### Prerequisites

- Node.js 20.9+
- npm 10+

### 1. Clone and install

```bash
git clone <your-repo-url>
cd my-link-shortner
npm install
```

### 2. Environment variables

Copy the example env file:

```bash
cp .env.example .env
```

Default values:

```env
DATABASE_URL="file:./dev.db"
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

### 3. Database setup

```bash
npm run db:migrate
```

This creates the SQLite database and applies migrations.

### 4. Start development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `DATABASE_URL` | Prisma database connection string | `file:./dev.db` |
| `NEXT_PUBLIC_APP_URL` | Public base URL for short links | `https://go.mannuyadav.me` |

Changing domains only requires updating `NEXT_PUBLIC_APP_URL`.

---

## API Reference

### POST `/api/shorten`

Create a shortened link.

**Request:**

```json
{
  "url": "https://example.com/very-long-url",
  "alias": "optional-custom-alias"
}
```

**Response (201):**

```json
{
  "shortCode": "aB3xY2",
  "shortUrl": "https://go.mannuyadav.me/aB3xY2",
  "originalUrl": "https://example.com/very-long-url",
  "createdAt": "2026-06-20T06:00:00.000Z"
}
```

**Error responses:** `400` (invalid URL/alias), `409` (duplicate alias), `500` (server error)

### GET `/api/link/[shortCode]`

Retrieve link metadata.

**Response (200):**

```json
{
  "shortCode": "aB3xY2",
  "shortUrl": "https://go.mannuyadav.me/aB3xY2",
  "originalUrl": "https://example.com/very-long-url",
  "createdAt": "2026-06-20T06:00:00.000Z"
}
```

---

## Deployment Guide (Vercel)

### 1. Push to GitHub

```bash
git add .
git commit -m "Initial commit: My Link Shortner"
git push origin main
```

### 2. Import to Vercel

1. Go to [vercel.com/new](https://vercel.com/new)
2. Import your repository
3. Framework preset: **Next.js** (auto-detected)

### 3. Environment variables

Set in Vercel project settings:

| Variable | Value |
|----------|-------|
| `NEXT_PUBLIC_APP_URL` | `https://go.mannuyadav.me` |
| `DATABASE_URL` | See production database note below |

### 4. Custom domain

1. Vercel → Project → Settings → Domains
2. Add `go.mannuyadav.me`
3. Configure DNS per Vercel instructions

### 5. Deploy

Vercel deploys automatically on push. Build command:

```bash
npm run build
```

---

## Production Database

SQLite works for local development but **does not persist on Vercel's serverless filesystem**. For production, use one of:

### Option A: Turso (SQLite-compatible, recommended)

1. Create a database at [turso.tech](https://turso.tech)
2. Install `@prisma/adapter-libsql` and `@libsql/client`
3. Update `prisma.ts` to use the LibSQL adapter
4. Set `DATABASE_URL` to your Turso connection string

### Option B: PostgreSQL (Vercel Postgres / Neon)

1. Change `provider` in `prisma/schema.prisma` from `sqlite` to `postgresql`
2. Install `@prisma/adapter-pg` and `pg`
3. Update `src/lib/prisma.ts` with the PG adapter
4. Set `DATABASE_URL` to your Postgres connection string
5. Run `npm run db:migrate`

The service layer (`src/services/link.service.ts`) requires no changes — only the Prisma client setup and schema provider.

---

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Production build |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |
| `npm run db:migrate` | Run Prisma migrations (dev) |
| `npm run db:push` | Push schema without migration |
| `npm run db:studio` | Open Prisma Studio |

---

## Future-Ready Architecture

The codebase is structured for easy extension:

| Future Feature | Extension Point |
|----------------|-----------------|
| User accounts | Add `User` model, auth middleware |
| Analytics | Add `Click` model, track in redirect handler |
| Team workspaces | Add `Workspace` model, scope links |
| Custom domains | Extend `appConfig`, multi-tenant routing |
| Expiring links | Add `expiresAt` field to `Link` model |
| Password protection | Add `passwordHash` field, gate redirect |

Business logic lives in `src/services/` — routes stay thin.

---

## License

MIT
