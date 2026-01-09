# Web Template

A web application template with Docker, PostgreSQL, and MkDocs documentation setup.

[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)

## Features

- 🐳 **Docker** - Containerized application ready for deployment
- 🗄️ **PostgreSQL 16** - Robust relational database
- 📚 **MkDocs** - Beautiful documentation with Material theme

## Quick Start

### Prerequisites

- [Docker](https://docs.docker.com/get-docker/) 29.0+
- [Docker Compose](https://docs.docker.com/compose/install/) v5.0+

### Using Docker (Recommended)

1. **Clone the repository**
   ```bash
   git clone https://github.com/codesphere-dev/web-template.git
   cd web-template
   ```

2. **Start all services**
   ```bash
   docker compose up -d
   ```

That's it! The services are now running.

## Project Structure

```
web-template/
├── docs/                    # MkDocs documentation
├── init-db/                 # Database initialization scripts
├── Dockerfile               # Container configuration
├── docker-compose.yml       # Production orchestration
├── docker-compose.dev.yml   # Development orchestration (with docs)
└── mkdocs.yml              # Documentation config
```

## Documentation

Comprehensive documentation is available in the `docs/` directory. To view it (for development):

```bash
# Start documentation server
docker compose -f docker-compose.dev.yml up docs
```

Visit http://localhost:8000 to browse the documentation.

### Documentation Sections

- **Getting Started**
  - [Installation Guide](docs/getting-started/installation.md)
  - [Quick Start](docs/getting-started/quick-start.md)
  - [Configuration](docs/getting-started/configuration.md)

## Available Commands

### Docker

- `docker compose up -d` - Start services (production)
- `docker compose -f docker-compose.dev.yml up -d` - Start with docs (development)
- `docker compose down` - Stop all services
- `docker compose logs -f` - View logs
- `docker compose ps` - Check service status

## Tech Stack

- **PostgreSQL 16** - Relational database
- **Docker** - Containerization
- **Docker Compose** - Multi-container orchestration
- **MkDocs Material** - Documentation

## Configuration

### Environment Variables

Create a `.env` file for custom configuration:

```bash
# Database
DB_HOST=postgres
DB_PORT=5432
DB_NAME=webtemplate
DB_USER=postgres
DB_PASSWORD=postgres
```

See [Configuration Guide](docs/getting-started/configuration.md) for all options.

## Database

The application uses PostgreSQL with Docker:

```bash
# Connect to database
docker compose exec postgres psql -U postgres -d webtemplate
```

## Deployment

### Production Deployment

Production uses CI/CD pipeline for deployment. See documentation for details.

```bash
# On your production server
git clone https://github.com/codesphere-dev/web-template.git
cd web-template

# Configure environment
# Create .env file with production values

# Start services
docker compose up -d
```

## Contributing

Contributions are welcome! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the GNU General Public License v3.0 - see the [LICENSE](LICENSE) file for details.

## Support

- 📚 [Documentation](https://github.com/codesphere-dev/web-template)
- 🐛 [Issue Tracker](https://github.com/codesphere-dev/web-template/issues)
- 💬 [Discussions](https://github.com/codesphere-dev/web-template/discussions)

## Acknowledgments

- PostgreSQL community for the robust database
- Docker for making containerization easy
- MkDocs Material for beautiful documentation

---

**Built with ❤️ using Docker and PostgreSQL**
