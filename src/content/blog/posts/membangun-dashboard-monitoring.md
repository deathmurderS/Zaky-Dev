---
title: "Membangun Dashboard Monitoring dengan Grafana & Prometheus"
slug: "membangun-dashboard-monitoring"
date: "2026-05-28"
tags: ["Grafana", "Monitoring", "Prometheus"]
readTime: 10
---

## Kenapa Monitoring Penting?

Bayangin kamu deploy aplikasi, trus tiba-tiba lemot. Daripada login SSH dan ngetik `top` manual, lebih baik semuanya terlihat di satu dashboard. Di sinilah **Grafana + Prometheus** berperan.

## Arsitektur

```
Aplikasi → Metrics Endpoint
                ↓
          Prometheus  (ngumpulin data)
                ↓
           Grafana     (visualisasi)
```

## 1. Setup Prometheus

### prometheus.yml

```yaml
global:
  scrape_interval: 15s

scrape_configs:
  - job_name: 'node'
    static_configs:
      - targets: ['localhost:9100']
  
  - job_name: 'app'
    static_configs:
      - targets: ['localhost:8000']
```

### Docker Compose

```yaml
version: '3'
services:
  prometheus:
    image: prom/prometheus
    volumes:
      - ./prometheus.yml:/etc/prometheus/prometheus.yml
    ports:
      - "9090:9090"

  grafana:
    image: grafana/grafana
    ports:
      - "3000:3000"
    depends_on:
      - prometheus
```

## 2. Integrasi Python dengan Prometheus

```python
from prometheus_client import Counter, Histogram, generate_latest
from fastapi import FastAPI, Response
import time

app = FastAPI()

REQUEST_COUNT = Counter(
    'app_requests_total', 
    'Total HTTP requests'
)

REQUEST_DURATION = Histogram(
    'app_request_duration_seconds',
    'HTTP request duration'
)

@app.get("/")
def root():
    REQUEST_COUNT.inc()
    start = time.time()
    # ... proses request ...
    REQUEST_DURATION.observe(time.time() - start)
    return {"message": "OK"}

@app.get("/metrics")
def metrics():
    return Response(
        generate_latest(),
        media_type="text/plain"
    )
```

## 3. Setup Grafana

1. Buka `http://localhost:3000` (login: admin/admin)
2. **Configuration → Data Sources → Add Prometheus**
3. URL: `http://prometheus:9090`
4. Klik **Save & Test**

## 4. Buat Dashboard

Beberapa query yang berguna:

| Metric | Query | Kegunaan |
|--------|-------|----------|
| CPU Usage | `100 - (avg by(instance)(rate(node_cpu_seconds_total{mode="idle"}[5m])) * 100)` | CPU |
| Memory | `node_memory_MemTotal_bytes - node_memory_MemAvailable_bytes` | RAM |
| Requests | `rate(app_requests_total[5m])` | Request per detik |
| Duration | `histogram_quantile(0.95, rate(app_request_duration_seconds_bucket[5m]))` | Latency P95 |

### Tips Dashboard

- **Singlestat**: untuk angka penting (uptime, error rate)
- **Time series**: untuk trend (CPU, memory, requests)
- **Bar gauge**: untuk perbandingan
- **Table**: untuk data detail

## 5. Alerting

Grafana bisa kirim notifikasi ke:

- **Email**
- **Discord** (webhook)
- **Slack**
- **Telegram**

Contoh alert rule:

```yaml
alert: HighCPUUsage
expr: 100 - (avg by(instance)(rate(node_cpu_seconds_total{mode="idle"}[5m])) * 100) > 80
for: 5m
labels:
  severity: warning
annotations:
  summary: "CPU usage > 80%"
```

## Best Practices

1. **Labels yang konsisten** — `job`, `instance`, `app`
2. **Histogram** untuk latency, **Counter** untuk total
3. **Rate** untuk menghitung per detik dari counter
4. **Jangan terlalu banyak metrics** — mulai dari yang penting dulu

## Kesimpulan

Dengan Grafana + Prometheus, kamu bisa monitor aplikasi secara real-time tanpa perlu SSH. Semua terpusat di satu dashboard dengan alerting otomatis.