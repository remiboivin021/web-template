# Database Guide

This guide covers everything you need to know about the PostgreSQL database in the Web Template.

## Database Overview

- **DBMS:** PostgreSQL 16
- **Client Library:** `pg` (node-postgres)
- **Connection:** Connection pooling
- **Default Name:** `webtemplate`

## Connection Configuration

### Environment Variables

```bash
DB_HOST=postgres      # Database host
DB_PORT=5432         # Database port
DB_NAME=webtemplate  # Database name
DB_USER=postgres     # Database user
DB_PASSWORD=postgres # Database password
```

### Connection Pool

The application uses connection pooling for efficient database access:

```typescript
const pool = new Pool({
  host: process.env.DB_HOST ?? 'localhost',
  port: parseInt(process.env.DB_PORT ?? '5432', 10),
  database: process.env.DB_NAME ?? 'webtemplate',
  user: process.env.DB_USER ?? 'postgres',
  password: process.env.DB_PASSWORD ?? 'postgres',
  max: 20,                      // Max connections
  idleTimeoutMillis: 30000,     // Close idle connections
  connectionTimeoutMillis: 2000, // Connection timeout
})
```

## Schema Management

### Current Schema

The application includes a sample `health_checks` table:

```sql
CREATE TABLE health_checks (
  id SERIAL PRIMARY KEY,
  timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  status TEXT NOT NULL
);
```

### Adding Tables

Create initialization scripts in `init-db/` directory:

**Example: `init-db/01-create-users.sql`**
```sql
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(255) UNIQUE NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Add indexes for performance
CREATE INDEX idx_users_username ON users(username);
CREATE INDEX idx_users_email ON users(email);

-- Add comments for documentation
COMMENT ON TABLE users IS 'Application users';
COMMENT ON COLUMN users.password_hash IS 'Bcrypt hashed password';
```

Mount this directory in `docker-compose.yml`:

```yaml
postgres:
  volumes:
    - postgres_data:/var/lib/postgresql/data
    - ./init-db:/docker-entrypoint-initdb.d
```

## Migrations

### Manual Migrations

For now, migrations are manual. Create timestamped SQL files:

```
init-db/
├── 01-create-users.sql
├── 02-create-posts.sql
└── 03-add-user-roles.sql
```

### Future: Automated Migrations

Consider using migration tools:
- **Prisma:** Type-safe ORM with migrations
- **TypeORM:** Decorators and migrations
- **node-pg-migrate:** Simple migration tool
- **Knex.js:** Query builder with migrations

## Querying the Database

### Basic Queries

```typescript
// SELECT query
const result = await pool.query('SELECT * FROM users WHERE id = $1', [userId])
const user = result.rows[0]

// INSERT query
const result = await pool.query(
  'INSERT INTO users (username, email) VALUES ($1, $2) RETURNING *',
  [username, email]
)
const newUser = result.rows[0]

// UPDATE query
await pool.query(
  'UPDATE users SET username = $1 WHERE id = $2',
  [newUsername, userId]
)

// DELETE query
await pool.query('DELETE FROM users WHERE id = $1', [userId])
```

### Using Transactions

```typescript
const client = await pool.connect()
try {
  await client.query('BEGIN')
  
  await client.query('INSERT INTO users (...) VALUES (...)')
  await client.query('INSERT INTO user_roles (...) VALUES (...)')
  
  await client.query('COMMIT')
} catch (error) {
  await client.query('ROLLBACK')
  throw error
} finally {
  client.release()
}
```

### Prepared Statements

Always use parameterized queries to prevent SQL injection:

```typescript
// ❌ NEVER do this (SQL injection vulnerability)
const query = `SELECT * FROM users WHERE username = '${username}'`
await pool.query(query)

// ✅ Always use parameterized queries
await pool.query(
  'SELECT * FROM users WHERE username = $1',
  [username]
)
```

## Repository Pattern

Create repository classes for database access:

```typescript
// src/server/db/repositories/UserRepository.ts
import { Pool } from 'pg'

interface User {
  id: number
  username: string
  email: string
  created_at: Date
}

export class UserRepository {
  constructor(private pool: Pool) {}
  
  async findById(id: number): Promise<User | null> {
    const result = await this.pool.query(
      'SELECT * FROM users WHERE id = $1',
      [id]
    )
    return result.rows[0] ?? null
  }
  
  async findByUsername(username: string): Promise<User | null> {
    const result = await this.pool.query(
      'SELECT * FROM users WHERE username = $1',
      [username]
    )
    return result.rows[0] ?? null
  }
  
  async create(username: string, email: string): Promise<User> {
    const result = await this.pool.query(
      'INSERT INTO users (username, email) VALUES ($1, $2) RETURNING *',
      [username, email]
    )
    return result.rows[0] as User
  }
  
  async update(id: number, data: Partial<User>): Promise<User | null> {
    const fields: string[] = []
    const values: unknown[] = []
    let paramCount = 1
    
    if (data.username) {
      fields.push(`username = $${paramCount++}`)
      values.push(data.username)
    }
    if (data.email) {
      fields.push(`email = $${paramCount++}`)
      values.push(data.email)
    }
    
    if (fields.length === 0) return null
    
    values.push(id)
    const result = await this.pool.query(
      `UPDATE users SET ${fields.join(', ')} WHERE id = $${paramCount} RETURNING *`,
      values
    )
    return result.rows[0] ?? null
  }
  
  async delete(id: number): Promise<boolean> {
    const result = await this.pool.query(
      'DELETE FROM users WHERE id = $1',
      [id]
    )
    return result.rowCount > 0
  }
  
  async list(limit = 10, offset = 0): Promise<User[]> {
    const result = await this.pool.query(
      'SELECT * FROM users ORDER BY created_at DESC LIMIT $1 OFFSET $2',
      [limit, offset]
    )
    return result.rows as User[]
  }
}
```

## Database Management

### Accessing PostgreSQL Shell

```bash
# Via Docker
docker compose exec postgres psql -U postgres -d webtemplate

# Via local psql
psql -h localhost -p 5432 -U postgres -d webtemplate
```

### Common Commands

```sql
-- List all tables
\dt

-- Describe a table
\d users

-- List all databases
\l

-- List all users
\du

-- View table indexes
\di

-- Execute SQL file
\i /path/to/file.sql

-- Exit
\q
```

### Backup and Restore

**Backup:**
```bash
# Full database backup
docker compose exec postgres pg_dump -U postgres webtemplate > backup.sql

# Compressed backup
docker compose exec postgres pg_dump -U postgres webtemplate | gzip > backup.sql.gz

# Specific tables
docker compose exec postgres pg_dump -U postgres -t users -t posts webtemplate > tables_backup.sql
```

**Restore:**
```bash
# Restore from backup
docker compose exec -T postgres psql -U postgres webtemplate < backup.sql

# Restore compressed backup
gunzip -c backup.sql.gz | docker compose exec -T postgres psql -U postgres webtemplate
```

## Performance Optimization

### Indexes

Add indexes for frequently queried columns:

```sql
-- Single column index
CREATE INDEX idx_users_email ON users(email);

-- Composite index
CREATE INDEX idx_posts_user_created ON posts(user_id, created_at);

-- Unique index
CREATE UNIQUE INDEX idx_users_username ON users(username);

-- Partial index
CREATE INDEX idx_active_users ON users(email) WHERE active = true;
```

### Query Optimization

Use `EXPLAIN ANALYZE` to understand query performance:

```sql
EXPLAIN ANALYZE SELECT * FROM users WHERE email = 'user@example.com';
```

### Connection Pooling Best Practices

```typescript
// Configure pool size based on workload
const pool = new Pool({
  // For web applications
  max: 20,                    // Max connections
  min: 5,                     // Min idle connections
  
  // Timeouts
  idleTimeoutMillis: 30000,   // Close idle after 30s
  connectionTimeoutMillis: 2000, // Fail fast
  
  // Statement timeout
  statement_timeout: 30000,   // 30s query timeout
})
```

## Data Validation

Use Zod for validating database results:

```typescript
import { z } from 'zod'

const UserSchema = z.object({
  id: z.number(),
  username: z.string().min(3).max(50),
  email: z.string().email(),
  created_at: z.date(),
})

type User = z.infer<typeof UserSchema>

async function getUser(id: number): Promise<User> {
  const result = await pool.query('SELECT * FROM users WHERE id = $1', [id])
  return UserSchema.parse(result.rows[0])
}
```

## Security Best Practices

### 1. SQL Injection Prevention

Always use parameterized queries:

```typescript
// ✅ Safe
await pool.query('SELECT * FROM users WHERE id = $1', [userId])

// ❌ Unsafe
await pool.query(`SELECT * FROM users WHERE id = ${userId}`)
```

### 2. Least Privilege Principle

Create separate database users for different purposes:

```sql
-- Application user with limited permissions
CREATE USER app_user WITH PASSWORD 'secure_password';
GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA public TO app_user;

-- Read-only user for reports
CREATE USER report_user WITH PASSWORD 'secure_password';
GRANT SELECT ON ALL TABLES IN SCHEMA public TO report_user;
```

### 3. Password Storage

Never store plain text passwords:

```typescript
import bcrypt from 'bcrypt'

// Hash password
const passwordHash = await bcrypt.hash(password, 10)
await pool.query(
  'INSERT INTO users (username, password_hash) VALUES ($1, $2)',
  [username, passwordHash]
)

// Verify password
const user = await pool.query('SELECT password_hash FROM users WHERE username = $1', [username])
const isValid = await bcrypt.compare(password, user.rows[0].password_hash)
```

## Monitoring

### Connection Monitoring

```typescript
pool.on('connect', (client) => {
  console.log('New client connected')
})

pool.on('error', (err, client) => {
  console.error('Unexpected error on idle client', err)
})

pool.on('remove', (client) => {
  console.log('Client removed from pool')
})
```

### Query Logging

Enable query logging for development:

```typescript
const pool = new Pool({
  // ...config
  log: (msg) => console.log('PG:', msg),
})
```

## Testing

### Test Database Setup

Use a separate database for testing:

```typescript
// test/setup.ts
const testPool = new Pool({
  database: 'webtemplate_test',
  // ...other config
})

beforeEach(async () => {
  // Clean database
  await testPool.query('TRUNCATE users RESTART IDENTITY CASCADE')
})

afterAll(async () => {
  await testPool.end()
})
```

## Troubleshooting

### Connection Issues

```bash
# Check if PostgreSQL is running
docker compose ps postgres

# View PostgreSQL logs
docker compose logs postgres

# Test connection
docker compose exec postgres pg_isready -U postgres
```

### Performance Issues

```sql
-- Find slow queries
SELECT query, calls, total_time, mean_time
FROM pg_stat_statements
ORDER BY mean_time DESC
LIMIT 10;

-- Find missing indexes
SELECT schemaname, tablename, attname, n_distinct, correlation
FROM pg_stats
WHERE schemaname = 'public'
ORDER BY n_distinct DESC;
```

### Disk Space

```bash
# Check database size
docker compose exec postgres psql -U postgres -c "SELECT pg_database.datname, pg_size_pretty(pg_database_size(pg_database.datname)) FROM pg_database;"

# Check table sizes
docker compose exec postgres psql -U postgres webtemplate -c "SELECT tablename, pg_size_pretty(pg_total_relation_size(schemaname||'.'||tablename)) FROM pg_tables WHERE schemaname = 'public' ORDER BY pg_total_relation_size(schemaname||'.'||tablename) DESC;"
```

## Next Steps

- [API Reference](api.md)
- [TypeScript Guide](typescript.md)
- [Deployment Guide](../deployment/production.md)
