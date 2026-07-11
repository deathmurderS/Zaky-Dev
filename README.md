# ZAKY.DEV — Developer Portfolio Platform

Portfolio interaktif milik **Muhammad Zaky Zamzami**. Bukan sekadar landing page biasa — ini adalah platform lengkap yang menampilkan kemampuan sebagai Backend & DevOps Engineer.

## Fitur

| Route | Deskripsi |
|-------|-----------|
| `/` | Landing page — hero dengan karakter Ryo Yamada + biodata + skill bars |
| `/dashboard` | Analytics dashboard — data real-time dari GitHub API |
| `/projects` | Project showcase — GitHub, Live Demo, Documentation links |
| `/api-playground` | Interactive API explorer — coba endpoint langsung dari browser |
| `/blog` | Blog dengan artikel teknis — markdown-based |
| `/blog/[slug]` | Halaman detail artikel |
| `/tools` | 8 free developer tools (CSV to JSON, UUID, Base64, dll) |
| `/terminal` | Interactive terminal — ketik `help`, `about`, `skills`, dll |
| `/status` | Server monitoring — data real CPU, RAM, Disk, Docker |
| `/contact` | Contact form — kirim pesan, tersimpan di Supabase |
| `/admin` | Admin panel — lihat & kelola pesan masuk |

### API Routes

| Method | Route | Fungsi | Data |
|--------|-------|--------|------|
| GET | `/api/profile` | Profile JSON | Static |
| GET | `/api/projects` | Projects JSON | Static |
| GET | `/api/github` | GitHub stats & repos | **Real-time** dari GitHub API |
| GET | `/api/status` | Server metrics | **Real-time** dari OS |
| POST | `/api/contact` | Simpan pesan | Supabase |
| GET/PATCH/DELETE | `/api/admin/messages` | Kelola pesan | Supabase (auth required) |

## Tech Stack

```
Frontend     → Next.js 14 + TypeScript + Tailwind CSS 3
Animations   → Framer Motion
Icons        → Lucide Icons
Database     → Supabase (PostgreSQL)
Blog Content → Markdown files (src/content/blog/)
Deployment   → Vercel
```

## Struktur Folder

```
zaky-dev/
├── src/
│   ├── app/                    # Next.js App Router pages & API
│   │   ├── admin/              # Admin panel
│   │   ├── api/
│   │   │   ├── admin/messages/ # CRUD messages
│   │   │   ├── contact/        # Receive messages
│   │   │   ├── github/         # GitHub API proxy
│   │   │   ├── profile/        # Profile JSON
│   │   │   ├── projects/       # Projects JSON
│   │   │   └── status/         # Server status
│   │   ├── api-playground/     # Interactive API explorer
│   │   ├── blog/               # Blog list & [slug]/ detail
│   │   ├── contact/            # Contact form
│   │   ├── dashboard/          # Analytics dashboard
│   │   ├── projects/           # Project showcase
│   │   ├── status/             # Server monitoring
│   │   ├── terminal/           # Interactive terminal
│   │   ├── tools/              # Developer tools
│   │   ├── globals.css         # Global styles
│   │   ├── layout.tsx          # Root layout + Navbar + Footer
│   │   └── page.tsx            # Landing page
│   ├── components/
│   │   ├── landing/            # Hero section, personality cards
│   │   └── layout/             # Navbar, Footer
│   ├── content/blog/           # Blog articles (Markdown)
│   ├── data/                   # Profile data, skills, projects
│   └── lib/                    # Utilities, Supabase client, blog parser
├── public/                     # Static assets (images)
├── .env.local                  # Environment variables (gitignored)
├── tailwind.config.ts          # Tailwind config
├── next.config.mjs
└── package.json
```

## Cara Pasang & Jalankan

```bash
# Clone
git clone https://github.com/deathmurderS/Zaky-Dev.git
cd Zaky-Dev

# Install dependencies
npm install

# Setup environment variables
# 1. Bikin project di Supabase
# 2. Jalankan SQL:
#    create table messages (
#      id text primary key,
#      name text not null,
#      email text not null,
#      message text not null,
#      created_at timestamptz not null default now(),
#      read boolean not null default false
#    );
# 3. Isi .env.local:
#    SUPABASE_URL=https://xxx.supabase.co
#    SUPABASE_SERVICE_ROLE_KEY=eyJxxx...

# Development
npm run dev

# Build production
npm run build

# Start production
npm start
```

## Deploy ke Vercel

```bash
git add .
git commit -m "Init ZAKY.DEV"
git push origin main
```

Di Vercel dashboard → Import repo → tambah environment variables:
- `SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY`

## Admin Panel

URL: `/admin?key=admin123`
Ganti `admin123` di `src/app/api/admin/messages/route.ts` sebelum production.

## Cara Nambah Artikel Blog

1. Buat file `.md` di `src/content/blog/`
2. Isi frontmatter:
```markdown
---
title: "Judul Artikel"
slug: "judul-artikel"
date: "2026-01-01"
tags: ["Python", "Docker"]
readTime: 5
---
```
3. Tulis konten markdown
4. Push ke GitHub → Vercel auto-deploy

---

Dibangun dengan ❤️ oleh Muhammad Zaky Zamzami
