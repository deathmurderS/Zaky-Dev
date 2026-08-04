# MUZAZ.DEV — Developer Portfolio Platform

Portfolio interaktif milik **Muhammad Zaky Zamzami**. Platform lengkap yang menampilkan kemampuan sebagai Data Analyst & Data Entry.

## Fitur

| Route | Deskripsi |
|-------|-----------|
| `/` | Landing page — hero + biodata + skill bars |
| `/dashboard` | Analytics overview |
| `/projects` | Project showcase |
| `/terminal` | Interactive terminal |
| `/contact` | Kirim pesan → tersimpan di Supabase |

### API Routes

| Method | Route | Sumber |
|--------|-------|--------|
| POST | `/api/main/contact` | Supabase |

## Tech Stack

```
Frontend   → Next.js 14 + TypeScript + Tailwind CSS 3 + Framer Motion
Database   → Supabase (PostgreSQL)
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
3. Tambah env vars: `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`
4. Deploy