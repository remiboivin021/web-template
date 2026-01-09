# Configuration

This guide covers configuration options for the Web Template.

## Environment Variables

The application uses environment variables for configuration. You can set these in:
- `.env` file (for local development)
- `docker-compose.yml` (for Docker deployments)

### Available Variables

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

## Docker Configuration

### Dockerfile

The Dockerfile is used for building the production container.

**For Production:**
- Uses the main `Dockerfile`
- Multi-stage build for smaller images

**For Development:**
- Uses `docker-compose.dev.yml` for development setup
- Includes volume mounts for live code updates

### Docker Compose

The `docker-compose.yml` file uses environment variables from a `.env` file when available, and falls back to default values if the `.env` file is not present.

Example:
```yaml
services:
  postgres:
    environment:
      POSTGRES_DB: ${DB_NAME:-webtemplate}
      POSTGRES_USER: ${DB_USER:-postgres}
      POSTGRES_PASSWORD: ${DB_PASSWORD:-postgres}
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

This file is automatically executed when the PostgreSQL container starts.

## Security Configuration

### Production Security Checklist

- [ ] Change default database password
- [ ] Use environment-specific `.env` files
- [ ] Enable HTTPS/TLS
- [ ] Configure proper network security
- [ ] Use secrets management (not `.env` in production)

### Example: Changing Database Password

1. **Create or update `.env` file:**
   ```bash
   DB_PASSWORD=your-secure-password-here
   ```

2. **Restart services:**
   ```bash
   docker compose down
   docker compose up -d
   ```
