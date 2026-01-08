# Docker Deployment

Guide for deploying the Web Template using Docker and Docker Compose.

## Prerequisites

- Docker Engine 24.0+
- Docker Compose v2.20+
- 2GB+ RAM available
- 10GB+ disk space

## Quick Start

### Production Deployment

```bash
# Clone the repository
git clone https://github.com/remiboivin021/web-template.git
cd web-template

# Start all services
docker compose up -d

# Check status
docker compose ps

# View logs
docker compose logs -f
```

Services will be available at:
- Web App: http://localhost:3000
- API: http://localhost:3001
- Documentation: http://localhost:8000
- PostgreSQL: localhost:5432

### Development Deployment

```bash
# Use development configuration
docker compose -f docker-compose.dev.yml up -d
```

Development mode includes:
- Hot module reloading
- Source code mounted as volumes
- Development dependencies

## Docker Compose Configuration

### Production (`docker-compose.yml`)

```yaml
services:
  postgres:
    image: postgres:16-alpine
    environment:
      POSTGRES_DB: webtemplate
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: postgres
    volumes:
      - postgres_data:/var/lib/postgresql/data
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U postgres"]
      interval: 10s
      timeout: 5s
      retries: 5

  web:
    build:
      context: .
      dockerfile: Dockerfile
    ports:
      - "3000:3000"
      - "3001:3001"
    depends_on:
      postgres:
        condition: service_healthy
    environment:
      - DB_HOST=postgres
      - DB_PORT=5432
      - DB_NAME=webtemplate
      - DB_USER=postgres
      - DB_PASSWORD=postgres

  docs:
    image: squidfunk/mkdocs-material:latest
    ports:
      - "8000:8000"
    volumes:
      - ./:/docs
    command: serve --dev-addr=0.0.0.0:8000
```

## Container Management

### Start Services

```bash
# Start in foreground
docker compose up

# Start in background (detached)
docker compose up -d

# Start specific service
docker compose up -d web
```

### Stop Services

```bash
# Stop all services
docker compose stop

# Stop specific service
docker compose stop web

# Stop and remove containers
docker compose down

# Stop and remove containers + volumes
docker compose down -v
```

### Restart Services

```bash
# Restart all services
docker compose restart

# Restart specific service
docker compose restart web
```

### Rebuild Containers

```bash
# Rebuild all services
docker compose build

# Rebuild without cache
docker compose build --no-cache

# Rebuild and restart
docker compose up -d --build
```

## Logs and Debugging

### View Logs

```bash
# All services
docker compose logs

# Follow logs (live)
docker compose logs -f

# Specific service
docker compose logs web
docker compose logs postgres

# Last 100 lines
docker compose logs --tail=100

# With timestamps
docker compose logs -t
```

### Execute Commands

```bash
# Shell in web container
docker compose exec web sh

# Shell in database container
docker compose exec postgres sh

# PostgreSQL shell
docker compose exec postgres psql -U postgres -d webtemplate

# Run npm command
docker compose exec web npm run build
```

## Environment Configuration

### Using .env File

Create `.env` file:

```bash
# Server
PORT=3001
NODE_ENV=production

# Database
DB_HOST=postgres
DB_PORT=5432
DB_NAME=webtemplate
DB_USER=postgres
DB_PASSWORD=your_secure_password_here
```

Reference in `docker-compose.yml`:

```yaml
web:
  env_file:
    - .env
```

### Overriding Configurations

```yaml
# docker-compose.override.yml
services:
  web:
    environment:
      - NODE_ENV=development
    ports:
      - "3002:3000"  # Different port
```

Docker Compose automatically merges `docker-compose.yml` and `docker-compose.override.yml`.

## Volume Management

### List Volumes

```bash
docker volume ls
```

### Inspect Volume

```bash
docker volume inspect web-template_postgres_data
```

### Backup Volume

```bash
# Backup PostgreSQL data
docker compose exec postgres pg_dump -U postgres webtemplate > backup.sql

# Or backup volume directory
docker run --rm -v web-template_postgres_data:/data -v $(pwd):/backup \
  alpine tar czf /backup/postgres-backup.tar.gz -C /data .
```

### Restore Volume

```bash
# Restore from SQL dump
docker compose exec -T postgres psql -U postgres webtemplate < backup.sql

# Or restore volume directory
docker run --rm -v web-template_postgres_data:/data -v $(pwd):/backup \
  alpine tar xzf /backup/postgres-backup.tar.gz -C /data
```

### Clean Up Volumes

```bash
# Remove all unused volumes
docker volume prune

# Remove specific volume
docker volume rm web-template_postgres_data
```

## Network Management

### Inspect Network

```bash
docker network ls
docker network inspect web-template_web-template-network
```

### Connect to Network

```bash
docker network connect web-template_web-template-network my-other-container
```

## Health Checks

### Application Health

```bash
# Check health endpoint
curl http://localhost:3001/api/health

# Check from another container
docker compose exec web wget -q -O- http://localhost:3001/api/health
```

### Container Health

```bash
# View health status
docker compose ps

# Inspect health details
docker inspect --format='{{json .State.Health}}' web-template-app | jq
```

## Resource Management

### Limit Resources

```yaml
services:
  web:
    deploy:
      resources:
        limits:
          cpus: '1.0'
          memory: 1G
        reservations:
          cpus: '0.5'
          memory: 512M
```

### Monitor Resources

```bash
# All containers
docker stats

# Specific container
docker stats web-template-app
```

## Security Best Practices

### 1. Change Default Passwords

```yaml
postgres:
  environment:
    POSTGRES_PASSWORD: ${DB_PASSWORD}  # From .env file
```

### 2. Use Secrets

```yaml
secrets:
  db_password:
    file: ./secrets/db_password.txt

services:
  postgres:
    secrets:
      - db_password
    environment:
      POSTGRES_PASSWORD_FILE: /run/secrets/db_password
```

### 3. Non-Root User

```dockerfile
# Add to Dockerfile
RUN addgroup -g 1001 -S nodejs && adduser -S nodejs -u 1001
USER nodejs
```

### 4. Read-Only Root Filesystem

```yaml
services:
  web:
    read_only: true
    tmpfs:
      - /tmp
```

## Multi-Stage Builds

The Dockerfile uses multi-stage builds for smaller images:

```dockerfile
# Build stage (large)
FROM node:20-alpine AS builder
WORKDIR /app
COPY . .
RUN npm ci && npm run build

# Production stage (small)
FROM node:20-alpine AS production
WORKDIR /app
COPY --from=builder /app/dist ./dist
COPY package*.json ./
RUN npm ci --only=production
CMD ["node", "dist/server/index.js"]
```

Benefits:
- Smaller final image
- Faster deployment
- More secure (no build tools)

## Troubleshooting

### Container Won't Start

```bash
# Check logs
docker compose logs web

# Check container status
docker compose ps

# Inspect container
docker inspect web-template-app
```

### Database Connection Issues

```bash
# Check database is ready
docker compose exec postgres pg_isready -U postgres

# Check environment variables
docker compose exec web env | grep DB_

# Test connection from web container
docker compose exec web sh
nc -zv postgres 5432
```

### Port Already in Use

```bash
# Find process using port
lsof -i :3000
lsof -i :5432

# Kill process
kill -9 <PID>

# Or use different ports in docker-compose.yml
```

### Out of Disk Space

```bash
# Clean up
docker system prune -a
docker volume prune

# Check disk usage
docker system df
```

## Production Checklist

- [ ] Change default passwords
- [ ] Use environment-specific configurations
- [ ] Set up automated backups
- [ ] Configure log rotation
- [ ] Set resource limits
- [ ] Enable health checks
- [ ] Use HTTPS/TLS
- [ ] Implement monitoring
- [ ] Configure firewall
- [ ] Set up CI/CD

## Next Steps

- [Production Deployment](production.md)
- [Architecture Overview](../development/architecture.md)
- [Configuration Guide](../getting-started/configuration.md)
