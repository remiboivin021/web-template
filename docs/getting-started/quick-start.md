# Quick Start

Get up and running with the Web Template in minutes!

## Starting the Application

### Using Docker Compose (Recommended)

Start all services with a single command:

```bash
docker compose up -d
```

This will start:
- PostgreSQL database on port 5432

Check the status:
```bash
docker compose ps
```

View logs:
```bash
docker compose logs -f
```

## Accessing the Database

Connect to PostgreSQL:

```bash
docker compose exec postgres psql -U postgres -d webtemplate
```

List tables:
```sql
\dt
```

View health checks:
```sql
SELECT * FROM health_checks ORDER BY timestamp DESC LIMIT 5;
```

Exit:
```sql
\q
```

## Managing Services with Docker/Docker Compose

### Viewing Logs

```bash
# All services
docker compose logs -f

# Specific service
docker compose logs -f postgres
```

### Restarting Services

```bash
# Restart all services
docker compose restart

# Restart specific service
docker compose restart postgres
```

### Rebuilding After Changes

```bash
# Rebuild and restart
docker compose up -d --build

# Force rebuild from scratch
docker compose build --no-cache
docker compose up -d
```

### Accessing Service Shells

```bash
# Database shell
docker compose exec postgres sh

# PostgreSQL interactive terminal
docker compose exec postgres psql -U postgres -d webtemplate
```

## Stopping the Application

### Docker Compose

```bash
# Stop services
docker compose down

# Stop and remove volumes (deletes database data)
docker compose down -v
```

## Next Steps

- [Configuration](configuration.md)
