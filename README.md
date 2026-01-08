# Web Template

A modern, production-ready web application template built with TypeScript, React, PostgreSQL, Docker, and MkDocs documentation.

[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)

## Features

- 🚀 **TypeScript** - Full type safety with strict configuration
- ⚛️ **React 18** - Modern React with hooks and functional components
- 🗄️ **PostgreSQL 16** - Robust relational database
- 🐳 **Docker** - Containerized application ready for deployment
- 📚 **MkDocs** - Beautiful documentation with Material theme
- 🎨 **Vite** - Lightning-fast development with HMR
- 🔒 **Type-Safe API** - Zod validation for runtime safety
- 🏗️ **Clean Architecture** - Layered architecture with separation of concerns

## Quick Start

### Prerequisites

- [Docker](https://docs.docker.com/get-docker/) 24.0+
- [Docker Compose](https://docs.docker.com/compose/install/) v2.20+
- [Node.js](https://nodejs.org/) 20+ (for local development)

### Using Docker (Recommended)

1. **Clone the repository**
   ```bash
   git clone https://github.com/remiboivin021/web-template.git
   cd web-template
   ```

2. **Start all services**
   ```bash
   docker compose up -d
   ```

3. **Access the application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:3001/api/health
   - Documentation: http://localhost:8000

That's it! The application is now running.

### Local Development

For local development without Docker:

```bash
# Install dependencies
npm install

# Start PostgreSQL (using Docker)
docker run -d \
  --name postgres \
  -e POSTGRES_DB=webtemplate \
  -e POSTGRES_USER=postgres \
  -e POSTGRES_PASSWORD=postgres \
  -p 5432:5432 \
  postgres:16-alpine

# Start backend (in one terminal)
npm run server:dev

# Start frontend (in another terminal)
npm run dev
```

## Project Structure

```
web-template/
├── src/
│   ├── client/              # React frontend
│   │   ├── App.tsx
│   │   ├── main.tsx
│   │   └── *.css
│   └── server/              # Express backend
│       ├── index.ts
│       ├── db/              # Database connection
│       └── routes/          # API routes
├── docs/                    # MkDocs documentation
├── public/                  # Static assets
├── Dockerfile               # Production container
├── Dockerfile.dev           # Development container
├── docker-compose.yml       # Production orchestration
├── docker-compose.dev.yml   # Development orchestration
├── package.json             # Dependencies
├── tsconfig.json            # TypeScript config
├── vite.config.ts           # Vite configuration
└── mkdocs.yml              # Documentation config
```

## Documentation

Comprehensive documentation is available in the `docs/` directory. To view it:

```bash
# Start documentation server
docker compose up docs

# Or with MkDocs installed locally
pip install mkdocs-material
mkdocs serve
```

Visit http://localhost:8000 to browse the documentation.

### Documentation Sections

- **Getting Started**
  - [Installation Guide](docs/getting-started/installation.md)
  - [Quick Start](docs/getting-started/quick-start.md)
  - [Configuration](docs/getting-started/configuration.md)

- **Development**
  - [Architecture Overview](docs/development/architecture.md)
  - [Database Guide](docs/development/database.md)
  - [API Reference](docs/development/api.md)
  - [TypeScript Guide](docs/development/typescript.md)

- **Deployment**
  - [Docker Deployment](docs/deployment/docker.md)
  - [Production Guide](docs/deployment/production.md)

## Available Scripts

### Development

- `npm run dev` - Start Vite development server
- `npm run server:dev` - Start backend server with hot-reload
- `npm run type-check` - Run TypeScript type checking
- `npm run lint` - Run ESLint

### Production

- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run server` - Start production server

### Docker

- `docker compose up -d` - Start all services
- `docker compose down` - Stop all services
- `docker compose logs -f` - View logs
- `docker compose ps` - Check service status

## Tech Stack

### Frontend
- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **CSS3** - Styling with modern features

### Backend
- **Express** - Web framework
- **Node.js 20** - Runtime environment
- **TypeScript** - Type safety
- **pg** - PostgreSQL client
- **Zod** - Runtime type validation

### Database
- **PostgreSQL 16** - Relational database

### DevOps
- **Docker** - Containerization
- **Docker Compose** - Multi-container orchestration
- **MkDocs Material** - Documentation

## Architecture

The application follows a layered architecture:

```
┌─────────────────────────────────────────┐
│         Presentation Layer              │
│         (React Components)              │
├─────────────────────────────────────────┤
│         Application Layer               │
│     (Express Routes & Handlers)         │
├─────────────────────────────────────────┤
│         Domain Layer                    │
│     (Business Logic & Types)            │
├─────────────────────────────────────────┤
│         Infrastructure Layer            │
│   (Database, External Services)         │
└─────────────────────────────────────────┘
```

See [Architecture Documentation](docs/development/architecture.md) for details.

## Configuration

### Environment Variables

Create a `.env` file based on `.env.example`:

```bash
cp .env.example .env
```

Key variables:

- `PORT` - Backend server port (default: 3001)
- `DB_HOST` - PostgreSQL host (default: postgres)
- `DB_PORT` - PostgreSQL port (default: 5432)
- `DB_NAME` - Database name (default: webtemplate)
- `DB_USER` - Database user (default: postgres)
- `DB_PASSWORD` - Database password (default: postgres)

See [Configuration Guide](docs/getting-started/configuration.md) for all options.

## TypeScript

This project uses **strict TypeScript** configuration:

- ✅ Strict null checks
- ✅ No implicit any
- ✅ Exhaustive switch cases
- ✅ Unused variable detection
- ✅ No unchecked indexed access

Example:

```typescript
interface User {
  id: number
  username: string
  email: string
}

async function getUser(id: number): Promise<User | null> {
  const result = await pool.query('SELECT * FROM users WHERE id = $1', [id])
  return result.rows[0] ?? null
}
```

See [TypeScript Guide](docs/development/typescript.md) for best practices.

## API

### Health Check

```bash
curl http://localhost:3001/api/health
```

Response:
```json
{
  "status": "healthy",
  "database": "connected",
  "timestamp": "2026-01-08T05:56:00.000Z"
}
```

See [API Reference](docs/development/api.md) for all endpoints.

## Database

The application uses PostgreSQL with connection pooling:

```typescript
// Example query
const result = await pool.query(
  'SELECT * FROM users WHERE id = $1',
  [userId]
)
```

See [Database Guide](docs/development/database.md) for schema and best practices.

## Deployment

### Production Deployment

```bash
# On your production server
git clone https://github.com/remiboivin021/web-template.git
cd web-template

# Configure environment
cp .env.example .env
nano .env  # Edit with production values

# Start services
docker compose up -d

# Verify
curl http://localhost:3001/api/health
```

See [Production Guide](docs/deployment/production.md) for complete deployment instructions.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the GNU General Public License v3.0 - see the [LICENSE](LICENSE) file for details.

## Support

- 📚 [Documentation](http://localhost:8000)
- 🐛 [Issue Tracker](https://github.com/remiboivin021/web-template/issues)
- 💬 [Discussions](https://github.com/remiboivin021/web-template/discussions)

## Acknowledgments

- React team for the amazing library
- PostgreSQL community for the robust database
- Docker for making containerization easy
- MkDocs Material for beautiful documentation
- Vite for blazing fast development

---

**Built with ❤️ using TypeScript, React, and PostgreSQL**
