# My Link Shortner

**Brand name: My Link**

> Create short, clean and shareable links instantly.

**Live website:** [https://go.mannuyadav.me](https://go.mannuyadav.me)

---

## What is this project?

Imagine you have a very long link like this:

```
https://example.com/blog/2024/my-super-long-article-title-that-is-hard-to-share
```

This app turns it into a short link like this:

```
https://go.mannuyadav.me/aB3xY2
```

When someone opens the short link, they are automatically sent to the original long website.

Think of it like **Bitly** or **TinyURL**, but this is **your own app** that you built and can host yourself.

### What can this app do?

| Feature | What it means |
|--------|----------------|
| Shorten URLs | Paste a long link, get a short one |
| Custom alias | Choose your own short name (example: `/library`) |
| QR code | Download a QR image for your link |
| Copy button | Copy the short link with one click |
| Recent links | Shows your last 10 links in the browser |
| Dark mode | Switch between light and dark theme |
| Fast redirects | Short links open the real website quickly |

---

## What you need before starting

You need these **free tools** on your computer:

| Tool | Why you need it | Where to get it |
|------|-----------------|-----------------|
| **Git** | To download (clone) the project | [https://git-scm.com/downloads](https://git-scm.com/downloads) |
| **Node.js 20+** | To run the app | [https://nodejs.org](https://nodejs.org) (download the **LTS** version) |
| **A code editor** (optional but helpful) | To edit files | [https://code.visualstudio.com](https://code.visualstudio.com) |

### Check if Node.js is installed

Open **Terminal** (Mac) or **PowerShell** (Windows) and type:

```bash
node -v
npm -v
```

You should see version numbers (example: `v22.x.x` and `10.x.x`).

If you see an error, install Node.js first, then try again.

---

# Part 1 — Run the project on your computer (Local Setup)

Follow these steps **in order**. Do not skip steps.

---

## Step 1: Download the project (Clone from GitHub)

### 1.1 Create a GitHub account (only if you don't have one)

1. Go to [https://github.com/signup](https://github.com/signup)
2. Enter your email, password, and username
3. Verify your email when GitHub asks you to

### 1.2 Clone the repository

Open **PowerShell** (Windows) or **Terminal** (Mac/Linux).

Go to the folder where you keep projects. Example:

```powershell
cd Desktop
```

Now clone (download) the project:

```bash
git clone https://github.com/itsMannuYadav/My-Link-Shortner.git
cd My-Link-Shortner
```

You should now be inside the project folder.

---

## Step 2: Install all packages

Still inside the project folder, run:

```bash
npm install
```

This downloads all libraries the project needs. It may take 1–3 minutes.

**Wait until it finishes.** You should see something like `added XXX packages` with no red errors.

---

## Step 3: Create your environment file (`.env`)

The app needs a small config file with secret settings.

### On Windows (PowerShell):

```powershell
Copy-Item .env.example .env
```

### On Mac / Linux:

```bash
cp .env.example .env
```

### Open `.env` and make sure it looks like this:

```env
DATABASE_URL="file:./dev.db"
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

**What these mean (simple):**

- `DATABASE_URL` → Where your links are saved on your computer (a local SQLite file)
- `NEXT_PUBLIC_APP_URL` → The website address used when creating short links locally

> **Important:** For local development, you do **NOT** need Turso variables. Leave `TURSO_DATABASE_URL` and `TURSO_AUTH_TOKEN` commented out (with `#` at the start).

---

## Step 4: Create the local database

Run this command once:

```bash
npm run db:migrate
```

If it asks for a migration name, you can type `init` and press Enter.

This creates a file called `dev.db` inside the `prisma` folder. That file stores all your shortened links on your computer.

---

## Step 5: Start the app

Run:

```bash
npm run dev
```

You should see:

```
✓ Ready
- Local: http://localhost:3000
```

Open your browser and go to:

**[http://localhost:3000](http://localhost:3000)**

### Test it works

1. Paste this URL in the box: `https://google.com`
2. Click **Shorten Link**
3. You should see a short link like `http://localhost:3000/abc123`
4. Click the short link — it should open Google

**Congratulations — the app is running on your computer.**

To stop the server, go back to the terminal and press `Ctrl + C`.

---

# Part 2 — Put the project online (Production Setup)

Running locally is great for learning. To share your app with the world, you need:

1. **Vercel** → Hosts your website (free)
2. **Turso** → Stores your links online in a cloud database (free plan available)
3. **GitHub** → Already used — Vercel reads code from here

> **Why Turso?** Your computer uses a local file (`dev.db`) to save links. Vercel cannot use that file reliably. Turso is a free online database that works perfectly with Vercel.

---

## Step 6: Push your code to GitHub (if you made changes)

If you cloned the repo and didn't change anything, you can skip to Step 7.

If you edited the project and want to deploy your version:

```bash
git add .
git commit -m "My changes"
git push
```

If `git push` asks for login, sign in with your GitHub account.

---

## Step 7: Create a Turso account and database

### 7.1 Sign up on Turso

1. Open [https://turso.tech](https://turso.tech)
2. Click **Sign Up** or **Get Started**
3. Sign up using your **GitHub account** (easiest option)
4. You will land on the Turso dashboard

### 7.2 Create your database

1. Click the **Create Database** button
2. **Database name:** type `my-link-shortner`
3. **Location:** pick the region closest to you (example: Mumbai / Asia if available)
4. Click **Create**

Your database is now created.

### 7.3 Get your Database URL

1. Click on your database name (`my-link-shortner`)
2. Find the section called **Database URL** or **Connect**
3. Copy the URL — it looks like this:

```
libsql://my-link-shortner-yourname.aws-ap-south-1.turso.io
```

Save this somewhere safe (Notepad is fine for now).

### 7.4 Create an Auth Token

1. In the same database page, find **Tokens** (or **Create Token**)
2. Click **Create Token**
3. Give it a name like `vercel-production`
4. Click **Create**
5. **Copy the token immediately** — you will only see it once!

It looks like a long string starting with `eyJ...`

Save it next to your Database URL.

### 7.5 Create the tables inside Turso (VERY IMPORTANT)

Adding env vars alone is **not enough**. You must create the database tables once.

On your computer, open the project folder and edit your `.env` file. Add these two lines (use your real values):

```env
TURSO_DATABASE_URL="libsql://my-link-shortner-yourname.aws-ap-south-1.turso.io"
TURSO_AUTH_TOKEN="paste-your-token-here"
```

Then run:

```bash
npm run db:push:turso
```

You should see:

```
Turso schema is ready.
```

This creates the `Link` table in Turso where all shortened URLs are stored.

> **After this step**, you can remove the Turso lines from `.env` if you want — they are only needed on Vercel for production. Local dev still uses `DATABASE_URL="file:./dev.db"`.

---

## Step 8: Deploy on Vercel

### 8.1 Create a Vercel account

1. Go to [https://vercel.com/signup](https://vercel.com/signup)
2. Click **Continue with GitHub**
3. Allow Vercel to access your GitHub account

### 8.2 Import your project

1. Go to [https://vercel.com/new](https://vercel.com/new)
2. Find **My-Link-Shortner** in the list (or your fork)
3. Click **Import**
4. Keep all default settings:
   - **Framework Preset:** Next.js
   - **Build Command:** `npm run build`
   - **Output Directory:** (leave default)
5. **Do NOT click Deploy yet** — add environment variables first (next step)

### 8.3 Add environment variables on Vercel

Before deploying, click **Environment Variables** and add these **3 variables**:

| Name | Value | Example |
|------|-------|---------|
| `TURSO_DATABASE_URL` | Your Turso Database URL | `libsql://my-link-shortner-....turso.io` |
| `TURSO_AUTH_TOKEN` | Your Turso token | `eyJhbG...` (long string) |
| `NEXT_PUBLIC_APP_URL` | Your public website URL | `https://go.mannuyadav.me` |

For each variable:

1. Type the **Name**
2. Paste the **Value**
3. Select **Production** and **Preview** (both checked)
4. Click **Save**

Then click **Deploy**.

Wait 1–2 minutes until status shows **Ready** (green).

### 8.4 Test your live website

Open your Vercel URL (something like `https://my-link-shortner.vercel.app`).

1. Paste a URL like `https://google.com`
2. Click **Shorten Link**
3. It should give you a working short link

If shortening fails with an error, go to the **Troubleshooting** section below.

---

## Step 9: Add your custom domain (Optional)

If you own a domain (example: `go.mannuyadav.me`):

1. In Vercel, open your project
2. Go to **Settings → Domains**
3. Type your domain and click **Add**
4. Vercel will show DNS records to add at your domain provider
5. Add those DNS records (usually a `CNAME` record)
6. Wait 5–30 minutes for DNS to update
7. Update `NEXT_PUBLIC_APP_URL` on Vercel to `https://your-domain.com`
8. Redeploy the project

---

# How to use the website

1. Open the homepage
2. Paste a long URL (must start with `http://` or `https://`)
3. Click **Shorten Link**
4. Copy the short link, download the QR code, or share it anywhere
5. Optional: click **Add custom alias** to choose your own short name (example: `library`)

### Custom alias rules

- Minimum 3 characters
- Only letters, numbers, `-` and `_`
- Must be unique (not already used)
- Cannot use reserved names like `api`, `admin`, `login`

---

# Project folder structure (simple explanation)

```
My-Link-Shortner/
├── src/
│   ├── app/              → Website pages and API routes
│   │   ├── page.tsx      → Homepage
│   │   ├── [shortCode]/  → Redirects short links
│   │   └── api/          → Backend APIs
│   ├── components/       → UI parts (buttons, cards, navbar)
│   ├── hooks/            → Reusable React logic
│   ├── services/         → Main business logic (creating links)
│   └── lib/              → Database connection and config
├── prisma/
│   ├── schema.prisma     → Database table design
│   └── migrations/       → Database change history
├── scripts/
│   └── push-turso-schema.mjs  → Creates tables in Turso
├── .env.example          → Example config file (safe to share)
├── .env                  → Your real config (NEVER upload to GitHub)
└── package.json          → Project info and commands
```

---

# All commands (cheat sheet)

| Command | When to use it |
|---------|----------------|
| `npm install` | First time setup, or after pulling new changes |
| `npm run dev` | Run the app locally at localhost:3000 |
| `npm run build` | Test if production build works |
| `npm run start` | Run production build locally |
| `npm run lint` | Check code for errors |
| `npm run db:migrate` | Set up local database (first time on your PC) |
| `npm run db:push:turso` | Create tables in Turso (first time for production) |
| `npm run db:studio` | Open a visual database browser |

---

# Environment variables explained

| Variable | Required where | What it does |
|----------|----------------|--------------|
| `DATABASE_URL` | Local only | Path to local SQLite file (`file:./dev.db`) |
| `TURSO_DATABASE_URL` | Vercel / Turso setup | Cloud database address |
| `TURSO_AUTH_TOKEN` | Vercel / Turso setup | Password for Turso database |
| `NEXT_PUBLIC_APP_URL` | Everywhere | Base URL shown in short links |

**Local example:**

```env
DATABASE_URL="file:./dev.db"
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

**Production (set on Vercel, not in GitHub):**

```env
TURSO_DATABASE_URL="libsql://your-db.turso.io"
TURSO_AUTH_TOKEN="your-token"
NEXT_PUBLIC_APP_URL="https://go.mannuyadav.me"
```

> **Never commit `.env` to GitHub.** It may contain secrets. The `.gitignore` file already blocks it.

---

# API reference (for developers)

### Create a short link

**POST** `/api/shorten`

```json
{
  "url": "https://example.com",
  "alias": "optional-custom-name"
}
```

**Success response:**

```json
{
  "shortCode": "aB3xY2",
  "shortUrl": "https://go.mannuyadav.me/aB3xY2",
  "originalUrl": "https://example.com",
  "createdAt": "2026-06-20T06:00:00.000Z"
}
```

### Get link details

**GET** `/api/link/[shortCode]`

Returns the original URL and metadata for a short code.

---

# Troubleshooting (common problems)

### "This page couldn't load" on the live website

1. Hard refresh: **Ctrl + Shift + R** (Windows) or **Cmd + Shift + R** (Mac)
2. Make sure the latest code is deployed on Vercel (check **Deployments** tab)
3. Try in an Incognito / Private browser window

### Shorten button works locally but fails online (500 error)

1. Check Turso env vars are set on Vercel (`TURSO_DATABASE_URL` + `TURSO_AUTH_TOKEN`)
2. Run `npm run db:push:turso` on your computer (creates the tables)
3. Redeploy on Vercel: **Deployments → ... → Redeploy**

### `npm install` fails

- Make sure Node.js 20+ is installed (`node -v`)
- Delete `node_modules` folder and run `npm install` again

### `npm run db:migrate` fails locally

- Make sure `.env` exists and has `DATABASE_URL="file:./dev.db"`
- Run `npm install` first

### Port 3000 already in use

Another app is using port 3000. Either close that app, or Next.js will automatically try port 3001 — check the terminal output for the correct URL.

### Turso token lost

Create a new token in Turso dashboard → **Tokens → Create Token**, then update it on Vercel and redeploy.

### Short link shows "Link not found"

The link was never saved, or you're using the wrong short code. Create a new link and try again.

---

# Tech stack

| Part | Technology |
|------|------------|
| Frontend + Backend | Next.js 16 |
| Language | TypeScript |
| Styling | Tailwind CSS |
| UI components | Shadcn UI |
| Database (local) | SQLite |
| Database (production) | Turso |
| Hosting | Vercel |

---

# Future features (not built yet, but ready to add)

The code is organized so you can easily add later:

- User accounts and login
- Click analytics
- Team workspaces
- Custom domains per user
- Link expiry dates
- Password-protected links

---

# License

MIT — free to use, learn from, and modify.

---

## Quick start summary

**Local (5 steps):**

```bash
git clone https://github.com/itsMannuYadav/My-Link-Shortner.git
cd My-Link-Shortner
npm install
cp .env.example .env        # Windows: Copy-Item .env.example .env
npm run db:migrate
npm run dev
```

Open **http://localhost:3000** — done.

**Online:** Turso database → `npm run db:push:turso` → Vercel deploy with 3 env vars → test live URL.

If you get stuck, read the **Troubleshooting** section above — most issues are covered there.
