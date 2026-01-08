# Development Guide

This guide covers the development setup, workflow, and best practices for working on this TypeScript web project using Docker.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Initial Setup](#initial-setup)
- [Docker Development Environment](#docker-development-environment)
- [Project Structure](#project-structure)
- [Development Workflow](#development-workflow)
- [Building and Testing](#building-and-testing)
- [Code Quality](#code-quality)
- [Troubleshooting](#troubleshooting)

## Prerequisites

Before you begin, ensure you have the following installed:

- **Docker**: Version 20.x or higher
- **Docker Compose**: Version 2.x or higher
- **Git**: Version 2.x or higher
- **Code Editor**: VS Code recommended with the following extensions:
  - Docker
  - Dev Containers (Remote - Containers)
  - ESLint
  - Prettier
  - TypeScript and JavaScript Language Features
  - React Developer Tools

### Verify Installation

```bash
docker --version          # Should be 20.x or higher
docker compose version    # Should be v2.x or higher
git --version            # Should be v2.x or higher
```

## Initial Setup

### 1. Fork and Clone

Follow the instructions in [GIT.md](./GIT.md) to fork the repository and clone it locally.

### 2. Environment Configuration

If the project requires environment variables, copy the example file:

```bash
cp .env.example .env
```

Edit `.env` and configure the necessary values for your local environment.

### 3. Build and Start Docker Containers

```bash
# Build the Docker images
docker compose build

# Start the development environment
docker compose up -d

# View logs
docker compose logs -f
```

The application should start and be accessible at `http://localhost:3000` (or the port specified in `docker-compose.yml`).

### 4. Verify Setup

Check that all containers are running:

```bash
docker compose ps
```

You should see the containers running (web, database, etc.).

## Docker Development Environment

### Docker Compose Services

The `docker-compose.yml` file defines the following services:

- **web**: The main TypeScript/React application
- **db**: PostgreSQL database (if applicable)
- **redis**: Redis cache (if applicable)

### Starting and Stopping

```bash
# Start all services
docker compose up -d

# Start specific service
docker compose up -d web

# Stop all services
docker compose down

# Stop and remove volumes (clean slate)
docker compose down -v

# Restart a service
docker compose restart web
```

### Accessing Container Shell

```bash
# Access the web container shell
docker compose exec web sh

# Run commands inside the container
docker compose exec web npm run lint
docker compose exec web npm run test
```

### Installing Dependencies

When adding new npm packages:

```bash
# Install inside the running container
docker compose exec web npm install <package-name>

# Or rebuild the image
docker compose build web
docker compose up -d web
```

### Hot Reload

The Docker development environment is configured with volume mounts for hot reload:

- Code changes are automatically detected
- The application reloads without restarting the container
- Node modules are persisted in a Docker volume for performance

## Project Structure

This project follows a modular architecture with clear separation of concerns:

```
web-template/
├── src/
│   ├── components/        # UI Layer - Presentation components
│   │   ├── atoms/         # Smallest reusable components
│   │   ├── molecules/     # Composition of atoms
│   │   ├── organisms/     # Complex UI sections
│   │   └── templates/     # Page layouts
│   ├── hooks/             # Hook Layer - Custom React hooks
│   ├── models/            # Domain Layer - Types, interfaces, business logic
│   ├── services/          # Infrastructure Layer - API clients
│   ├── store/             # Infrastructure Layer - Global state management
│   ├── utils/             # Shared utilities
│   ├── App.tsx            # Main application component
│   └── main.tsx           # Application entry point
├── public/                # Static assets
├── tests/                 # Test files
├── .github/               # GitHub configuration
├── package.json           # Project dependencies and scripts
├── tsconfig.json          # TypeScript configuration
├── vite.config.ts         # Vite configuration
└── README.md              # Project overview
```

### Layer Responsibilities

- **UI Layer**: Only presentation logic. No side effects, no API calls, no business logic
- **Hook Layer**: Business logic, state orchestration, side effects
- **Domain Layer**: Pure TypeScript. No React dependencies. Business rules and types
- **Infrastructure Layer**: External services, API communication, global state

## Development Workflow

### Daily Workflow

1. **Pull latest changes** from upstream:
   ```bash
   git fetch upstream
   git checkout main
   git rebase upstream/main
   ```

2. **Create a feature branch** (see [GIT.md](./GIT.md) for branch naming):
   ```bash
   git checkout -b feat/#issue_id-issue-title
   ```

3. **Start Docker environment**:
   ```bash
   docker compose up -d
   ```

4. **Make changes** following the code guidelines in [CONTRIBUTING.md](./CONTRIBUTING.md)

5. **Test your changes** frequently:
   ```bash
   docker compose exec web npm run lint     # Check code style
   docker compose exec web npm run build    # Ensure it builds
   docker compose exec web npm run test     # Run tests
   ```

6. **Commit with proper format** (see CONTRIBUTING.md for commit message guidelines)

7. **Push to your fork** and create a pull request (see [GIT.md](./GIT.md))

### Hot Reload Development

The Docker development environment supports hot module replacement (HMR):

```bash
# Start the dev environment
docker compose up -d

# View logs in real-time
docker compose logs -f web
```

Changes to your code will automatically reload in the browser without losing application state.

### Type Checking

TypeScript is configured with strict mode. Always run type checking:

```bash
docker compose exec web npm run type-check
```

Fix all type errors before committing. Never use `any` or `@ts-ignore` without proper justification.

## Building and Testing

### Development Build

```bash
# Using Docker (recommended)
docker compose up -d
```

The development server starts with hot reload inside the container.

### Production Build

```bash
# Build inside Docker container
docker compose exec web npm run build

# Or build a production Docker image
docker compose -f docker-compose.prod.yml build
```

Creates an optimized production build in the `dist/` directory.

### Preview Production Build

```bash
docker compose exec web npm run preview
```

Serves the production build locally for testing before deployment.

### Running Tests

```bash
# Run all tests
docker compose exec web npm run test

# Run tests in watch mode (for TDD)
docker compose exec web npm run test:watch

# Run tests with coverage report
docker compose exec web npm run test:coverage
```

### Test Coverage

Aim to maintain at least 80% code coverage. View the coverage report:

```bash
docker compose exec web npm run test:coverage

# Copy coverage report to host (if needed)
docker compose cp web:/app/coverage ./coverage
open coverage/index.html  # macOS
xdg-open coverage/index.html  # Linux
start coverage/index.html  # Windows
```

## Code Quality

### Linting

The project uses ESLint for code quality:

```bash
# Check for linting errors
docker compose exec web npm run lint

# Auto-fix linting errors
docker compose exec web npm run lint:fix
```

### Code Formatting

Prettier is configured for consistent code formatting:

```bash
# Check formatting
docker compose exec web npm run format:check

# Auto-format code
docker compose exec web npm run format
```

### Pre-commit Hooks

Husky is configured to run checks before commits:

- Linting
- Type checking
- Running tests

If pre-commit hooks fail, fix the issues before committing.

### Editor Configuration

For VS Code with Docker, add these settings to `.vscode/settings.json`:

```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "typescript.tsdk": "node_modules/typescript/lib",
  "typescript.enablePromptUseWorkspaceTsdk": true
}
```

## Troubleshooting

### Common Issues

#### Docker Container Issues

If containers fail to start or behave unexpectedly:

```bash
# Check container status
docker compose ps

# View logs
docker compose logs web

# Restart containers
docker compose restart

# Full rebuild (clean slate)
docker compose down -v
docker compose build --no-cache
docker compose up -d
```

#### Dependency Issues

If you encounter dependency issues inside the container:

```bash
# Rebuild the container with fresh dependencies
docker compose down
docker compose build --no-cache web
docker compose up -d
```

#### Port Already in Use

If the Docker port is occupied:

```bash
# Check what's using the port
lsof -i :3000  # macOS/Linux
netstat -ano | findstr :3000  # Windows

# Stop the conflicting service or change the port in docker-compose.yml
```

Or modify the port mapping in `docker-compose.yml`:

```yaml
services:
  web:
    ports:
      - "3001:3000"  # Change host port to 3001
```

#### TypeScript Errors

If you see unexpected TypeScript errors:

```bash
# Restart the container
docker compose restart web

# Or clear cache inside container
docker compose exec web rm -rf node_modules/.cache
docker compose restart web
```

#### Build Fails

If the build fails:

1. Ensure all TypeScript errors are fixed
2. Check for missing dependencies
3. Clear cache and rebuild:
   ```bash
   docker compose down
   docker compose build --no-cache
   docker compose up -d
   ```

#### Volume Permission Issues

On Linux, if you encounter permission issues:

```bash
# Fix permissions
sudo chown -R $USER:$USER .

# Or run containers with your user ID
# Add to docker-compose.yml:
# user: "${UID}:${GID}"
```

### Getting Help

If you encounter issues not covered here:

1. Check existing [issues](https://github.com/codesphere-dev/web-template/issues)
2. Review [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines
3. Ask questions in a new issue with the `question` label

## Performance Tips

### Bundle Size Analysis

Analyze what's in your production bundle:

```bash
docker compose exec web npm run build -- --report
```

### React DevTools Profiler

Use React DevTools Profiler to identify performance bottlenecks:

1. Install React DevTools browser extension
2. Open DevTools -> Profiler tab
3. Record a session while interacting with your app
4. Analyze component render times

### Performance Checklist

- [ ] Use `React.memo()` for expensive components
- [ ] Avoid inline function definitions in props
- [ ] Use `useCallback` for event handlers passed as props
- [ ] Use `useMemo` for expensive computations
- [ ] Lazy load routes and heavy components
- [ ] Optimize images and assets
- [ ] Use code splitting for large dependencies

## Best Practices

### Component Development

1. **Start with types**: Define props interface first
2. **Extract logic**: Move business logic to custom hooks
3. **Keep it simple**: One component, one responsibility
4. **Test early**: Write tests as you develop
5. **Accessibility first**: Add ARIA labels, keyboard navigation

### State Management

1. **Local state first**: Use `useState` for component-specific state
2. **Lift state up**: Share state at the lowest common ancestor
3. **Context wisely**: Use Context for truly global state
4. **Consider libraries**: Zustand/Redux for complex global state

### API Integration

1. **Use React Query**: For server state management
2. **Validate responses**: Use Zod schemas
3. **Handle errors**: Graceful error handling with user feedback
4. **Loading states**: Always show loading indicators
5. **Optimistic updates**: For better UX

## Additional Resources

- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- [React Documentation](https://react.dev/)
- [Vite Documentation](https://vitejs.dev/)
- [Testing Library](https://testing-library.com/react)
- [Web Accessibility](https://www.w3.org/WAI/WCAG21/quickref/)

Happy coding! 🚀
