# Installation

This guide will walk you through setting up the Web Template on your local machine.

## Prerequisites

Before you begin, ensure you have the following installed:

- **Docker** (v29 or higher)
- **Docker Compose** (v5 or higher)
- **Git**

### Checking Prerequisites

Run these commands to verify your installations:

```bash
docker --version  # Should show Docker version 29.x.x or higher
docker compose version  # Should show Docker Compose version v5.x.x or higher
```

## Installation

### Using Docker (Recommended)

1. **Clone the repository**
   ```bash
   git clone https://github.com/codesphere-dev/web-template.git
   cd web-template
   ```

2. **Start the services**
   ```bash
   docker compose up -d
   ```

That's it! The services will be available at:
- PostgreSQL: localhost:5432

## Verify Installation

After installation, verify everything is working:

1. **Check services**: Run `docker compose ps` to see running containers
2. **Check logs**: Run `docker compose logs` to view service logs

## Troubleshooting

### Port Already in Use

If you see errors about ports being in use:

```bash
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

## Next Steps

Now that you have the application installed, proceed to the [Quick Start](quick-start.md) guide to learn how to use it.
