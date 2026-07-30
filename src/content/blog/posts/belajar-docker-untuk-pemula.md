---
title: "Belajar Docker untuk Pemula — Konsep & Praktik"
slug: "belajar-docker-untuk-pemula"
date: "2026-06-10"
tags: ["Docker", "DevOps", "Tutorial"]
readTime: 12
---

## Apa Itu Docker?

Docker adalah platform containerization yang memungkinkan kamu mengemas aplikasi dan dependensinya ke dalam satu unit yang disebut **container**. Bayangkan container seperti "virtual machine mini" yang ringan, cepat, dan portabel.

## Kenapa Docker Penting?

**Sebelum Docker:** "Tapi di laptop saya jalan kok?" — problem klasik developer.

**Sesudah Docker:** Aplikasi jalan sama persis di laptop, server, cloud, dimanapun.

## Konsep Dasar

### Image vs Container

| Image | Container |
|-------|-----------|
| Blueprint / template | Instance dari image |
| Read-only | Dapat diubah |
| Di-share via Docker Hub | Berjalan di host |
| `docker build` | `docker run` |

### Dockerfile

Ini adalah resep untuk membuat image:

```dockerfile
FROM python:3.11-slim

WORKDIR /app

COPY requirements.txt .
RUN pip install -r requirements.txt

COPY . .

CMD ["python", "main.py"]
```

## Command Penting

```bash
# Melihat daftar container yang berjalan
docker ps

# Melihat semua container (termasuk yang berhenti)
docker ps -a

# Menjalankan container
docker run nginx

# Menjalankan container di background
docker run -d nginx

# Melihat log
docker logs container_id

# Masuk ke container
docker exec -it container_id bash

# Build image dari Dockerfile
docker build -t nama-image:tag .
```

## Praktik: Dockerize Aplikasi Python

### 1. Buat aplikasi

```python
# app.py
from flask import Flask
app = Flask(__name__)

@app.route('/')
def hello():
    return "Hello from Docker!"
```

### 2. Buat Dockerfile

```dockerfile
FROM python:3.11-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install flask
COPY . .
CMD ["python", "app.py"]
```

### 3. Build & Run

```bash
docker build -t my-flask-app .
docker run -p 5000:5000 my-flask-app
```

Buka `http://localhost:5000` — aplikasi jalan!

## Docker Compose

Untuk multi-container, gunakan `docker-compose.yml`:

```yaml
version: '3'
services:
  web:
    build: .
    ports:
      - "5000:5000"
  db:
    image: postgres:15
    environment:
      POSTGRES_PASSWORD: secret
```

Jalankan dengan:
```bash
docker-compose up
```

## Best Practices

1. **Gunakan .dockerignore** — hindari file tidak perlu masuk image
2. **Multi-stage build** — untuk production image yang kecil
3. **Jangan jalan sebagai root** — gunakan USER
4. **Image sekecil mungkin** — mulai dari alpine/slim

## Kesimpulan

Docker mengubah cara kita develop dan deploy aplikasi. Dengan Docker, environment issue hilang, kolaborasi tim lebih mudah, dan deployment lebih konsisten.