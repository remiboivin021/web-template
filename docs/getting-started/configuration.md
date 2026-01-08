# Configuration

This guide covers all configuration options for the Web Template.

## Environment Variables

The application uses environment variables for configuration. You can set these in:
- `.env` file (for local development)
- `docker-compose.yml` (for Docker deployments)
- System environment (for production servers)

### Available Variables

#### Server Configuration

```bash
# Port for the Express backend server
PORT=3001

# Node environment (development, production, test)
NODE_ENV=production
```

#### Database Configuration

```bash
# PostgreSQL host (use 'postgres' for Docker, 'localhost' for local)
DB_HOST=postgres

# PostgreSQL port
DB_PORT=5432

# Database name
DB_NAME=webtemplate

# Database user
DB_USER=postgres

# Database password (change in production!)
DB_PASSWORD=postgres
```

### Creating Your Configuration

1. **Copy the example file:**
   ```bash
   cp .env.example .env
   ```

2. **Edit `.env` with your values:**
   ```bash
   nano .env  # or use your preferred editor
   ```

3. **For Docker Compose**, edit the environment section in `docker-compose.yml`:
   ```yaml
   services:
     web:
       environment:
         - NODE_ENV=production
         - PORT=3001
         - DB_HOST=postgres
         # ... other variables
   ```

## TypeScript Configuration

### Main TypeScript Config (`tsconfig.json`)

The project uses strict TypeScript configuration:

```json
{
  "compilerOptions": {
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,
    "noImplicitReturns": true,
    "noUncheckedIndexedAccess": true,
    // ... more strict options
  }
}
```

Key features:
- ✅ Strict null checks
- ✅ No implicit any
- ✅ Unused variable detection
- ✅ Exhaustive switch cases
- ✅ Indexed access checking

### Server TypeScript Config (`tsconfig.server.json`)

Separate configuration for Node.js backend:

```json
{
  "extends": "./tsconfig.json",
  "compilerOptions": {
    "module": "commonjs",
    "moduleResolution": "node",
    "noEmit": false,
    "outDir": "./dist/server"
  }
}
```

## Vite Configuration

Frontend build tool configuration in `vite.config.ts`:

```typescript
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',  // Accessible from Docker
    port: 3000,
    proxy: {
      '/api': {
        target: 'http://localhost:3001',  // Proxy API requests
        changeOrigin: true,
      },
    },
  },
})
```

### Customizing Vite

You can modify:
- **Port**: Change `server.port`
- **Proxy target**: Update `/api` target for different backend URLs
- **Plugins**: Add more Vite plugins as needed

## ESLint Configuration

Code quality and style enforcement in `.eslintrc.cjs`:

```javascript
module.exports = {
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended-type-checked',
    'plugin:react-hooks/recommended',
  ],
  rules: {
    '@typescript-eslint/no-explicit-any': 'error',  // No 'any' types
    '@typescript-eslint/no-unused-vars': ['error', { 
      argsIgnorePattern: '^_' 
    }],
  },
}
```

## Docker Configuration

### Dockerfile

Production build configuration:

```dockerfile
# Two-stage build
FROM node:20-alpine AS builder
# Build stage...

FROM node:20-alpine AS production
# Production stage with minimal dependencies
```

Key features:
- Multi-stage build for smaller images
- Production-only dependencies in final image
- Health check endpoint
- Non-root user (recommended for production)

### Docker Compose

#### Production (`docker-compose.yml`)

```yaml
services:
  postgres:
    image: postgres:16-alpine
    volumes:
      - postgres_data:/var/lib/postgresql/data
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U postgres"]
```

#### Development (`docker-compose.dev.yml`)

```yaml
services:
  web-dev:
    volumes:
      - ./src:/app/src  # Live code sync
      - /app/node_modules  # Persist node_modules
```

## MkDocs Configuration

Documentation site configuration in `mkdocs.yml`:

```yaml
site_name: Web Template Documentation
theme:
  name: material
  palette:
    - scheme: default
      primary: deep purple
    - scheme: slate  # Dark mode
markdown_extensions:
  - pymdownx.highlight
  - pymdownx.superfences
  - admonition
```

### Customizing Documentation

Edit `mkdocs.yml` to:
- Change theme colors
- Add/remove navigation items
- Enable/disable features
- Add plugins

## Database Configuration

### Connection Pool Settings

In `src/server/db/index.ts`:

```typescript
const poolConfig: PoolConfig = {
  max: 20,                      // Maximum connections
  idleTimeoutMillis: 30000,     // Close idle connections
  connectionTimeoutMillis: 2000, // Connection timeout
}
```

### Initial Database Setup

Create `init-db/01-init.sql` for database initialization:

```sql
-- Create tables
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(255) UNIQUE NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes
CREATE INDEX idx_users_username ON users(username);
```

Mount this in `docker-compose.yml`:

```yaml
postgres:
  volumes:
    - ./init-db:/docker-entrypoint-initdb.d
```

## Security Configuration

### Production Security Checklist

- [ ] Change default database password
- [ ] Use environment-specific `.env` files
- [ ] Enable HTTPS/TLS
- [ ] Configure CORS properly
- [ ] Add rate limiting
- [ ] Enable security headers
- [ ] Use secrets management (not `.env` in production)

### Example: Changing Database Password

1. **Update `.env` or `docker-compose.yml`:**
   ```bash
   DB_PASSWORD=your-secure-password-here
   ```

2. **Restart services:**
   ```bash
   docker compose down
   docker compose up -d
   ```

## Performance Tuning

### Node.js

Set memory limits:
```bash
NODE_OPTIONS="--max-old-space-size=4096"
```

### PostgreSQL

Tune PostgreSQL settings in `docker-compose.yml`:

```yaml
postgres:
  command:
    - "postgres"
    - "-c"
    - "max_connections=100"
    - "-c"
    - "shared_buffers=256MB"
```

## Next Steps

- [Understand the architecture](../development/architecture.md)
- [Set up the database](../development/database.md)
- [Deploy to production](../deployment/production.md)
