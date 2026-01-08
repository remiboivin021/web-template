# Web Template Documentation

Welcome to the Web Template documentation! This is a modern, production-ready web application template built with TypeScript, React, PostgreSQL, and Docker.

## Features

- 🚀 **TypeScript** - Full type safety with strict TypeScript configuration
- ⚛️ **React 18** - Modern React with hooks and functional components
- 🗄️ **PostgreSQL** - Robust relational database
- 🐳 **Docker** - Containerized application with Docker and Docker Compose
- 📚 **MkDocs** - Beautiful documentation with Material theme
- 🎨 **Vite** - Fast development with Hot Module Replacement (HMR)
- 🔒 **Type-Safe API** - Zod validation for API responses
- 🏗️ **Clean Architecture** - Separation of concerns with layered architecture

## Architecture Overview

```
web-template/
├── src/
│   ├── client/          # React frontend
│   │   ├── App.tsx
│   │   ├── main.tsx
│   │   └── *.css
│   └── server/          # Express backend
│       ├── index.ts
│       ├── db/          # Database connection
│       └── routes/      # API routes
├── docs/                # Documentation
├── public/              # Static assets
├── Dockerfile           # Production container
├── Dockerfile.dev       # Development container
├── docker-compose.yml   # Production orchestration
├── docker-compose.dev.yml # Development orchestration
└── mkdocs.yml          # Documentation configuration
```

## Quick Links

- [Installation Guide](getting-started/installation.md)
- [Quick Start](getting-started/quick-start.md)
- [Architecture Overview](development/architecture.md)
- [API Reference](development/api.md)
- [Deployment Guide](deployment/docker.md)

## Tech Stack

### Frontend
- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **CSS3** - Styling

### Backend
- **Express** - Web framework
- **Node.js** - Runtime environment
- **TypeScript** - Type safety
- **pg** - PostgreSQL client

### Database
- **PostgreSQL 16** - Relational database

### DevOps
- **Docker** - Containerization
- **Docker Compose** - Multi-container orchestration
- **MkDocs Material** - Documentation

## Getting Started

To get started with the template, check out the [Installation Guide](getting-started/installation.md) or jump straight to the [Quick Start](getting-started/quick-start.md) guide.

## License

This project is licensed under the GNU General Public License v3.0 - see the [LICENSE](https://github.com/remiboivin021/web-template/blob/main/LICENSE) file for details.
