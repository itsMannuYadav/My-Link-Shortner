<div align="center">

# My Link — URL Shortener

**Create short, clean, and shareable links instantly.**

[![Live Demo](https://img.shields.io/badge/Live%20Demo-go.mannuyadav.me-0070f3?style=flat-square&logo=vercel)](https://go.mannuyadav.me)
[![Next.js](https://img.shields.io/badge/Next.js-16-black?style=flat-square&logo=next.js)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178c6?style=flat-square&logo=typescript)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-4-38bdf8?style=flat-square&logo=tailwindcss)](https://tailwindcss.com)
[![License: MIT](https://img.shields.io/badge/License-MIT-22c55e?style=flat-square)](LICENSE)

[**Live Demo →**](https://go.mannuyadav.me) · [Report a Bug](https://github.com/itsMannuYadav/My-Link-Shortner/issues) · [Request a Feature](https://github.com/itsMannuYadav/My-Link-Shortner/issues)

</div>

---

## What is My Link?

My Link is a self-hostable URL shortener built with Next.js 16 and Turso. Turn any long URL into a clean, shareable short link in seconds — with optional custom aliases, one-click QR codes, and zero sign-up required.

```
https://example.com/blog/2024/my-super-long-article-title → https://go.mannuyadav.me/aB3xY2
```

Think **Bitly** or **TinyURL**, but open source, self-hosted, and yours to own.

---

## Features

| Feature | Description |
|---------|-------------|
| **Instant shortening** | Paste any URL and get a short link immediately |
| **Custom aliases** | Choose your own slug — `/library`, `/resume`, `/project` |
| **QR code generation** | Download a QR image for any link |
| **One-click copy** | Copy the short URL to clipboard instantly |
| **Recent links** | Your last 10 links are remembered in the browser |
| **Dark / light mode** | Full theme support via `next-themes` |
| **Fast redirects** | Server-side redirect — no client JS required |
| **Collision-safe codes** | Auto-generated 6-char codes with up to 10 retry attempts |

---

## Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | [Next.js 16](https://nextjs.org) (App Router, Turbopack) |
| Language | TypeScript 5 |
| UI | [Shadcn UI](https://ui.shadcn.com) + [Tailwind CSS 4](https://tailwindcss.com) |
| Icons | [Lucide React](https://lucide.dev) |
| Toasts | [Sonner](https://sonner.emilkowal.ski) |
| ORM | [Prisma 7](https://www.prisma.io) |
| DB — local | SQLite via `better-sqlite3` |
| DB — production | [Turso](https://turso.tech) (libSQL) |
| Hosting | [Vercel](https://vercel.com) |

---

## Project Structure

```
src/
├── app/
│   ├── page.tsx                  # Homepage (shorten form + recent links)
│   ├── [shortCode]/page.tsx      # Redirect handler
│   └── api/
│       ├── shorten/route.ts      # POST — create a short link
│       └── link/[shortCode]/     # GET — look up a short code
├── components/
│   ├── shared/                   # Copy button, shared UI pieces
│   ├── ui/                       # Shadcn base components
│   └── providers/                # Theme provider
├── features/links/
│   ├── constants.ts              # Reserved routes, alias rules
│   └── types.ts                  # Shared TypeScript types
├── hooks/
│   ├── use-copy-to-clipboard.ts
│   └── use-recent-links.ts       # localStorage-backed recent links
├── services/
│   └── link.service.ts           # Core business logic
├── lib/
│   ├── prisma.ts                 # Prisma client (SQLite ↔ Turso)
│   └── config.ts                 # App-wide config helpers
└── utils/
    ├── short-code.ts             # Code generator
    └── url.ts                    # URL normalizer
prisma/
├── schema.prisma
└── migrations/
scripts/
└── push-turso-schema.mjs         # Push schema to Turso (production)
```

---

## Getting Started

### Prerequisites

- **Node.js 20+** — [nodejs.org](https://nodejs.org)
- **Git** — [git-scm.com](https://git-scm.com)

### Local Development

```bash
git clone https://github.com/itsMannuYadav/My-Link-Shortner.git
cd My-Link-Shortner
npm install
```

Copy the example env file:

```bash
# macOS / Linux
cp .env.example .env

# Windows (PowerShell)
Copy-Item .env.example .env
```

The default `.env` is all you need locally:

```env
DATABASE_URL="file:./dev.db"
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

Create the local database and start the dev server:

```bash
npm run db:migrate
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Paste a URL, click **Shorten Link**, done.

---

## Deploying to Production

This project is designed for **Vercel + Turso**. Vercel hosts the app; Turso provides the cloud SQLite database.

### 1. Create a Turso database

1. Sign up at [turso.tech](https://turso.tech) (free tier available)
2. Create a database — name it anything, pick a region near your users
3. Copy the **Database URL** (`libsql://...`) and create an **Auth Token**

### 2. Push the schema to Turso

Add your Turso credentials to `.env` temporarily:

```env
TURSO_DATABASE_URL="libsql://your-db.turso.io"
TURSO_AUTH_TOKEN="your-token"
```

Then run:

```bash
npm run db:push:turso
```

### 3. Deploy on Vercel

1. Import the repo at [vercel.com/new](https://vercel.com/new)
2. Add these environment variables before the first deploy:

| Variable | Value |
|----------|-------|
| `TURSO_DATABASE_URL` | `libsql://your-db.turso.io` |
| `TURSO_AUTH_TOKEN` | your token |
| `NEXT_PUBLIC_APP_URL` | `https://your-domain.com` |

3. Click **Deploy** — it's live.

> **Custom domain?** Go to Vercel → Settings → Domains, add your domain, update the DNS, then update `NEXT_PUBLIC_APP_URL` and redeploy.

---

## API Reference

### `POST /api/shorten`

Create a short link.

**Request body:**

```json
{
  "url": "https://example.com",
  "alias": "my-alias"
}
```

`alias` is optional. When omitted, a random 6-character code is generated.

**Response `201`:**

```json
{
  "shortCode": "aB3xY2",
  "shortUrl": "https://go.mannuyadav.me/aB3xY2",
  "originalUrl": "https://example.com",
  "createdAt": "2026-06-20T06:00:00.000Z"
}
```

**Error codes:**

| Code | Status | Meaning |
|------|--------|---------|
| `INVALID_URL` | 400 | Missing or malformed URL |
| `INVALID_ALIAS` | 400 | Alias too short, too long, or invalid characters |
| `RESERVED_ALIAS` | 400 | Alias conflicts with a system route |
| `DUPLICATE_ALIAS` | 409 | Alias already taken |
| `CODE_GENERATION_FAILED` | 500 | Collision limit hit — try again |

**Alias rules:**
- 3–32 characters
- Letters, numbers, `-`, `_` only
- Cannot be a reserved route (`api`, `admin`, `login`, `docs`, etc.)

---

### `GET /api/link/[shortCode]`

Look up metadata for a short code.

**Response `200`:**

```json
{
  "shortCode": "aB3xY2",
  "originalUrl": "https://example.com",
  "createdAt": "2026-06-20T06:00:00.000Z"
}
```

Returns `404` if the code doesn't exist.

---

## Commands

| Command | What it does |
|---------|--------------|
| `npm run dev` | Start dev server at localhost:3000 |
| `npm run build` | Production build (runs `prisma generate` first) |
| `npm run start` | Start production build locally |
| `npm run lint` | Run ESLint |
| `npm run db:migrate` | Create / apply local SQLite migrations |
| `npm run db:push:turso` | Push schema to Turso (production setup) |
| `npm run db:studio` | Open Prisma Studio (visual DB browser) |

---

## Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `DATABASE_URL` | Local only | Path to local SQLite file (`file:./dev.db`) |
| `TURSO_DATABASE_URL` | Production | Turso database URL (`libsql://...`) |
| `TURSO_AUTH_TOKEN` | Production | Turso auth token |
| `NEXT_PUBLIC_APP_URL` | Always | Base URL used when generating short links |

> **Never commit `.env` to GitHub.** It is listed in `.gitignore`. Use Vercel's environment variable UI for production secrets.

---

## Roadmap

The architecture is ready for these additions when needed:

- [ ] User accounts and authentication
- [ ] Click analytics and link stats
- [ ] Link expiry dates
- [ ] Password-protected links
- [ ] Team workspaces
- [ ] Custom domains per user
- [ ] Bulk link import / export

---

## Contributing

Pull requests are welcome. For significant changes, open an issue first to discuss what you'd like to change.

1. Fork the repo and create a branch: `git checkout -b feature/my-feature`
2. Make your changes and run `npm run lint`
3. Open a pull request

---

## License

[MIT](LICENSE) — free to use, learn from, and modify.

---

<div align="center">
Built by <a href="https://mannuyadav.me">Mannu Yadav</a>
</div>
