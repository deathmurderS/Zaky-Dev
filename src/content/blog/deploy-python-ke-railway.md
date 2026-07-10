---
title: "Cara Deploy Python (FastAPI) ke Railway — Gratis & Mudah"
slug: "deploy-python-ke-railway"
date: "2026-06-15"
tags: ["Python", "FastAPI", "Deployment", "Railway"]
readTime: 8
---

## Kenapa Railway?

Railway adalah platform deployment yang sangat cocok untuk project pribadi dan prototyping. Dibanding Render atau Heroku, Railway menawarkan:

- **Free tier** yang cukup untuk project kecil
- **Auto-deploy** dari GitHub
- **Built-in PostgreSQL** — tinggal klik, dapat database
- **Custom domain** gratis
- **No credit card** untuk free tier

## Persiapan

Sebelum mulai, pastikan kamu punya:

1. Akun [Railway](https://railway.app)
2. Project FastAPI yang sudah siap
3. Repo GitHub (opsional, bisa langsung upload)

## Struktur Project

```
project-anda/
├── main.py
├── requirements.txt
├── runtime.txt        # optional
└── Procfile           # optional
```

### main.py

```python
from fastapi import FastAPI

app = FastAPI()

@app.get("/")
def root():
    return {"message": "Hello from Railway!"}

@app.get("/health")
def health():
    return {"status": "ok"}
```

### requirements.txt

```
fastapi==0.115.0
uvicorn==0.30.0
```

## Langkah Deployment

### 1. Push ke GitHub

```bash
git init
git add .
git commit -m "Init FastAPI"
git remote add origin https://github.com/username/repo.git
git push -u origin main
```

### 2. Deploy ke Railway

1. Login ke [Railway](https://railway.app)
2. Klik **New Project** → **Deploy from GitHub repo**
3. Pilih repo yang tadi
4. Railway auto-detect Python + FastAPI
5. Tunggu build selesai (1-2 menit)

### 3. Setup Environment Variables

Di dashboard Railway → project → Variables, tambah:

| Variable | Value |
|----------|-------|
| `PORT` | `8000` |

### 4. Add Database (Optional)

1. Klik **New** → **Database** → **PostgreSQL**
2. Railway auto-generate `DATABASE_URL`
3. Kamu bisa akses dari environment variable `DATABASE_URL`

## Testing

Setelah deploy, Railway akan kasih domain seperti:

```
https://project-name.up.railway.app
```

Coba akses:

```bash
curl https://project-name.up.railway.app/health
# {"status": "ok"}
```

## Tips

- **Auto-deploy**: Setiap push ke GitHub otomatis redeploy
- **Logs**: Cek tab **Deploy Logs** kalau ada error
- **Sleep**: Free tier akan sleep setelah inactivity — tapi ini wajar
- **Custom domain**: Bisa di Settings → Domains

## Kesimpulan

Railway adalah pilihan tepat untuk deploy aplikasi Python dengan cepat. Dalam 5 menit, aplikasi kamu sudah live dengan domain publik.