# Installation

This guide will walk you through setting up the Web Template on your local machine.

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v20 or higher)
- **npm** (v10 or higher)
- **Docker** (v24 or higher)
- **Docker Compose** (v2.20 or higher)
- **Git**

### Checking Prerequisites

Run these commands to verify your installations:

```bash
node --version    # Should show v20.x.x or higher
npm --version     # Should show v10.x.x or higher
docker --version  # Should show Docker version 24.x.x or higher
docker compose version  # Should show Docker Compose version v2.20.x or higher
```

## Installation Methods

You can set up the project in two ways:

### Method 1: Using Docker (Recommended)

This is the easiest method and doesn't require installing Node.js dependencies locally.

1. **Clone the repository**
   ```bash
   git clone https://github.com/remiboivin021/web-template.git
   cd web-template
   ```

2. **Start the services**
   ```bash
   docker compose up -d
   ```

That's it! The application will be available at:
- Frontend: http://localhost:3000
- Backend API: http://localhost:3001
- Documentation: http://localhost:8000

### Method 2: Local Development

For local development without Docker:

1. **Clone the repository**
   ```bash
   git clone https://github.com/remiboivin021/web-template.git
   cd web-template
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up PostgreSQL**
   
   You can either:
   - Install PostgreSQL locally, or
   - Use Docker for just the database:
     ```bash
     docker run -d \
       --name postgres \
       -e POSTGRES_DB=webtemplate \
       -e POSTGRES_USER=postgres \
       -e POSTGRES_PASSWORD=postgres \
       -p 5432:5432 \
       postgres:16-alpine
     ```

4. **Configure environment variables**
   ```bash
   cp .env.example .env
   # Edit .env if needed
   ```

5. **Start the development servers**
   
   In separate terminals:
   ```bash
   # Terminal 1: Frontend
   npm run dev
   
   # Terminal 2: Backend
   npm run server:dev
   ```

## Verify Installation

After installation, verify everything is working:

1. **Check the frontend**: Navigate to http://localhost:3000
2. **Check the API**: Visit http://localhost:3001/api/health
3. **Check the docs**: Open http://localhost:8000 (if using Docker)

You should see:
- A React application with a health status card
- A JSON response from the health endpoint showing database connection status
- Beautiful documentation site

## Troubleshooting

### Port Already in Use

If you see errors about ports being in use:

```bash
# Check what's using the port
lsof -i :3000  # or :3001, :5432, :8000

# Stop Docker containers
docker compose down

# Restart with fresh containers
docker compose up -d --force-recreate
```

### Database Connection Issues

If the application can't connect to PostgreSQL:

1. Ensure PostgreSQL is running:
   ```bash
   docker compose ps
   ```

2. Check PostgreSQL logs:
   ```bash
   docker compose logs postgres
   ```

3. Verify environment variables in `.env` or `docker-compose.yml`

### Build Failures

If you encounter build errors:

```bash
# Clean node_modules and reinstall
rm -rf node_modules package-lock.json
npm install

# Or with Docker
docker compose down
docker compose build --no-cache
docker compose up -d
```

## Next Steps

Now that you have the application installed, proceed to the [Quick Start](quick-start.md) guide to learn how to use it.
