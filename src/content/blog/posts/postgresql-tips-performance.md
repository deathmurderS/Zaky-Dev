---
title: "PostgreSQL Performance Tips — Query Optimization & Indexing"
slug: "postgresql-tips-performance"
date: "2026-05-20"
tags: ["PostgreSQL", "Database", "Performance"]
readTime: 7
---

## Kenapa PostgreSQL?

PostgreSQL adalah database relasional paling canggih yang open-source. Dengan fitur seperti indexing lanjutan, partitioning, dan query parallelization, PostgreSQL cocok untuk aplikasi skala kecil hingga enterprise.

## 1. Index yang Tepat

Index adalah cara tercepat untuk mempercepat query. Tapi index juga punya cost — dia makan disk dan memperlambat write.

### Jenis Index

```sql
-- B-tree (default) — untuk equality & range query
CREATE INDEX idx_users_email ON users(email);

-- Hash — untuk equality saja (lebih kecil)
CREATE INDEX idx_users_status ON users USING hash(status);

-- GIN — untuk array & JSONB
CREATE INDEX idx_products_tags ON products USING gin(tags);

-- BRIN — untuk data yang terurut secara fisik
CREATE INDEX idx_orders_created ON orders USING brin(created_at);
```

### Tips Index

- **Jangan over-index** — tiap index memperlambat INSERT/UPDATE
- **Gunakan partial index** untuk data spesifik:

```sql
CREATE INDEX idx_active_users ON users(email) WHERE is_active = true;
```

- **Gunakan composite index** untuk query multi-kolom:

```sql
CREATE INDEX idx_users_status_created 
ON users(status, created_at DESC);
```

## 2. Query Optimization

### EXPLAIN ANALYZE

Sebelum optimasi, cek dulu:

```sql
EXPLAIN ANALYZE
SELECT * FROM orders 
WHERE user_id = 123 
ORDER BY created_at DESC 
LIMIT 10;
```

Hasilnya akan menunjukkan:
- **Seq Scan** → berarti full table scan (lambat)
- **Index Scan** → pakai index (cepat)
- **Sort** → mungkin perlu index untuk sorting

### Common Anti-Patterns

```sql
-- ❌ BURUK: fungsi di kolom menyebabkan index tidak terpakai
SELECT * FROM users WHERE LOWER(email) = 'test@test.com';

-- ✅ BAIK: pakai index functional
CREATE INDEX idx_users_email_lower ON users(LOWER(email));

-- ❌ BURUK: SELECT * untuk data besar
SELECT * FROM orders WHERE status = 'pending';

-- ✅ BAIK: SELECT kolom yang diperlukan saja
SELECT id, user_id, total FROM orders WHERE status = 'pending';
```

## 3. Connection Pooling

Setiap koneksi ke PostgreSQL makan memory (~10MB). Untuk production, selalu gunakan **connection pooler**:

### Dengan PgBouncer

```ini
# pgbouncer.ini
[databases]
mydb = host=localhost port=5432 dbname=mydb

[pgbouncer]
pool_mode = transaction
max_client_conn = 200
default_pool_size = 20
```

### Di Aplikasi Python

```python
from psycopg2 import pool

connection_pool = psycopg2.pool.ThreadedConnectionPool(
    minconn=2,
    maxconn=10,
    dsn="postgresql://user:pass@localhost/mydb"
)

# Pakai context manager
with connection_pool.getconn() as conn:
    with conn.cursor() as cur:
        cur.execute("SELECT * FROM users")
```

## 4. Vacuum & Maintenance

PostgreSQL menggunakan MVCC — data lama tetap ada sampai di-vacuum:

```sql
-- Cek kapan terakhir vacuum
SELECT relname, last_vacuum, last_autovacuum 
FROM pg_stat_user_tables;

-- Manual vacuum (tidak blocking)
VACUUM ANALYZE orders;

-- Full vacuum (blocking — hindari di production)
VACUUM FULL orders;
```

### Auto-Vacuum Configuration

```ini
# postgresql.conf
autovacuum = on
autovacuum_vacuum_threshold = 50
autovacuum_vacuum_scale_factor = 0.2
autovacuum_analyze_threshold = 50
autovacuum_analyze_scale_factor = 0.1
```

## 5. Monitoring Query Performance

```sql
-- 5 query paling lambat
SELECT query, calls, total_time, mean_time 
FROM pg_stat_statements 
ORDER BY total_time DESC 
LIMIT 5;

-- Bloating index
SELECT schemaname, tablename, indexname, 
       pg_size_pretty(pg_relation_size(indexrelid)) 
FROM pg_stat_user_indexes 
WHERE idx_scan = 0;
```

## Kesimpulan

Performa PostgreSQL bukan soal "database-nya lemah", tapi soal bagaimana kita menggunakannya. Dengan index yang tepat, query yang efisien, dan maintenance rutin, PostgreSQL bisa handle jutaan row dengan respons di bawah milidetik.