# MUZAZ.DEV — Developer Portfolio Platform

Portfolio interaktif milik **Muhammad Zaky Zamzami**. Platform lengkap yang menampilkan kemampuan sebagai Backend & DevOps Engineer.

![CI Status](https://github.com/deathmurderS/Zaky-Dev/actions/workflows/ci.yml/badge.svg)

## Fitur

| Route | Deskripsi |
|-------|-----------|
| `/` | Landing page — hero + biodata + skill bars |
| `/dashboard` | Analytics — **real-time** dari GitHub API |
| `/projects` | Project showcase |
| `/api-playground` | Interactive API explorer |
| `/blog` | Blog — markdown-based (4 articles) |
| `/tools` | 8 developer tools |
| `/terminal` | Interactive terminal |
| `/status` | Server monitoring — **real-time** CPU, RAM, Disk |
| `/contact` | Kirim pesan → tersimpan di Supabase |
| `/admin` | Admin panel (protected) |

### API Routes

| Method | Route | Sumber |
|--------|-------|--------|
| GET | `/api/profile` | Static |
| GET | `/api/github` | **GitHub API real-time** |
| GET | `/api/status` | **OS metrics** |
| POST | `/api/contact` | Supabase |
| GET/PATCH/DELETE | `/api/admin/messages` | Supabase (auth) |

## Tech Stack

```
Frontend   → Next.js 14 + TypeScript + Tailwind CSS 3 + Framer Motion
Database   → Supabase (PostgreSQL)
Blog       → Custom Markdown parser
CI/CD      → GitHub Actions (build & lint on push)
Deployment → Vercel
```

## Cara Pasang

```bash
git clone https://github.com/deathmurderS/Zaky-Dev.git
cd Zaky-Dev
npm install
```

Buat `.env.local`:
```env
SUPABASE_URL=...
SUPABASE_SERVICE_ROLE_KEY=...
ADMIN_SECRET_KEY=...
```

Buat tabel di Supabase SQL Editor:
```sql
create table messages (
  id text primary key,
  name text not null,
  email text not null,
  message text not null,
  created_at timestamptz not null default now(),
  read boolean not null default false
);
```

```bash
npm run dev    # Development
npm run build  # Production build
```

## Deploy Vercel

1. Push ke GitHub
2. Import di [vercel.com/new](https://vercel.com/new)
3. Tambah env vars: `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`, `ADMIN_SECRET_KEY`
4. Deploy
