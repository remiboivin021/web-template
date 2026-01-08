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
- Web application on ports 3000 (frontend) and 3001 (backend)
- MkDocs documentation server on port 8000

Check the status:
```bash
docker compose ps
```

View logs:
```bash
docker compose logs -f
```

### Using Development Mode

For active development with hot-reloading:

```bash
docker compose -f docker-compose.dev.yml up -d
```

Or locally:
```bash
# Terminal 1: Backend
npm run server:dev

# Terminal 2: Frontend
npm run dev
```

## Accessing the Application

Once started, you can access:

| Service | URL | Description |
|---------|-----|-------------|
| Frontend | http://localhost:3000 | React application |
| Backend API | http://localhost:3001/api | REST API endpoints |
| Health Check | http://localhost:3001/api/health | API health status |
| Documentation | http://localhost:8000 | MkDocs documentation |

## First Steps

### 1. Check Health Status

Visit http://localhost:3000 to see the application. The home page displays a health check that verifies:
- ✅ Backend API is running
- ✅ PostgreSQL database is connected
- ✅ Application timestamp

### 2. Explore the API

The application includes a health check API endpoint:

```bash
curl http://localhost:3001/api/health
```

Response:
```json
{
  "status": "healthy",
  "database": "connected",
  "timestamp": "2024-01-08T10:30:00.000Z"
}
```

### 3. Check the Database

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

## Development Workflow

### Making Changes

#### Frontend Changes

1. Edit files in `src/client/`
2. Changes will hot-reload automatically in development mode
3. Check the browser at http://localhost:3000

#### Backend Changes

1. Edit files in `src/server/`
2. The server will restart automatically with `tsx watch`
3. Test your API changes at http://localhost:3001/api

### Building for Production

Build the TypeScript application:

```bash
npm run build
```

The compiled output will be in the `dist/` directory.

### Running Tests

```bash
# Type checking
npm run type-check

# Linting
npm run lint
```

## Stopping the Application

### Docker Compose

```bash
# Stop services
docker compose down

# Stop and remove volumes (deletes database data)
docker compose down -v
```

### Local Development

Press `Ctrl+C` in each terminal where you're running services.

## Common Tasks

### Viewing Logs

```bash
# All services
docker compose logs -f

# Specific service
docker compose logs -f web
docker compose logs -f postgres
docker compose logs -f docs
```

### Restarting Services

```bash
# Restart all services
docker compose restart

# Restart specific service
docker compose restart web
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
# Web application shell
docker compose exec web sh

# Database shell
docker compose exec postgres sh

# PostgreSQL interactive terminal
docker compose exec postgres psql -U postgres -d webtemplate
```

## Environment Variables

Key environment variables (defined in `docker-compose.yml`):

| Variable | Default | Description |
|----------|---------|-------------|
| `DB_HOST` | postgres | Database host |
| `DB_PORT` | 5432 | Database port |
| `DB_NAME` | webtemplate | Database name |
| `DB_USER` | postgres | Database user |
| `DB_PASSWORD` | postgres | Database password |
| `PORT` | 3001 | Backend server port |
| `NODE_ENV` | production | Node environment |

To override, create a `.env` file or modify `docker-compose.yml`.

## Next Steps

- [Learn about the architecture](../development/architecture.md)
- [Explore the database structure](../development/database.md)
- [Read the API reference](../development/api.md)
- [Deploy to production](../deployment/production.md)
