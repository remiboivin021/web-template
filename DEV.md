# Development Guide

This guide covers the development setup, workflow, and best practices for working on this TypeScript web project.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Initial Setup](#initial-setup)
- [Project Structure](#project-structure)
- [Development Workflow](#development-workflow)
- [Building and Testing](#building-and-testing)
- [Code Quality](#code-quality)
- [Troubleshooting](#troubleshooting)

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js**: Version 18.x or higher (LTS recommended)
- **npm**: Version 9.x or higher (comes with Node.js)
- **Git**: Version 2.x or higher
- **Code Editor**: VS Code recommended with the following extensions:
  - ESLint
  - Prettier
  - TypeScript and JavaScript Language Features
  - React Developer Tools

### Verify Installation

```bash
node --version  # Should be v18.x or higher
npm --version   # Should be v9.x or higher
git --version   # Should be v2.x or higher
```

## Initial Setup

### 1. Fork and Clone

Follow the instructions in [GIT.md](./GIT.md) to fork the repository and clone it locally.

### 2. Install Dependencies

```bash
cd web-template
npm install
```

This will install all project dependencies defined in `package.json`.

### 3. Environment Configuration

If the project requires environment variables, copy the example file:

```bash
cp .env.example .env
```

Edit `.env` and configure the necessary values for your local environment.

### 4. Verify Setup

Run the development server to ensure everything is working:

```bash
npm run dev
```

The application should start and be accessible at `http://localhost:5173` (or the port specified in the console).

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
   git merge upstream/main
   ```

2. **Create a feature branch**:
   ```bash
   git checkout -b feat/your-feature-name
   ```

3. **Make changes** following the code guidelines in [CONTRIBUTING.md](./CONTRIBUTING.md)

4. **Test your changes** frequently:
   ```bash
   npm run lint     # Check code style
   npm run build    # Ensure it builds
   npm run test     # Run tests
   ```

5. **Commit with proper format** (see CONTRIBUTING.md for commit message guidelines)

6. **Push to your fork** and create a pull request (see [GIT.md](./GIT.md))

### Hot Reload Development

The development server supports hot module replacement (HMR):

```bash
npm run dev
```

Changes to your code will automatically reload in the browser without losing application state.

### Type Checking

TypeScript is configured with strict mode. Always run type checking:

```bash
npm run type-check
```

Fix all type errors before committing. Never use `any` or `@ts-ignore` without proper justification.

## Building and Testing

### Development Build

```bash
npm run dev
```

Starts the development server with hot reload.

### Production Build

```bash
npm run build
```

Creates an optimized production build in the `dist/` directory.

### Preview Production Build

```bash
npm run preview
```

Serves the production build locally for testing before deployment.

### Running Tests

```bash
# Run all tests
npm run test

# Run tests in watch mode (for TDD)
npm run test:watch

# Run tests with coverage report
npm run test:coverage
```

### Test Coverage

Aim to maintain at least 80% code coverage. View the coverage report:

```bash
npm run test:coverage
open coverage/index.html  # macOS
xdg-open coverage/index.html  # Linux
start coverage/index.html  # Windows
```

## Code Quality

### Linting

The project uses ESLint for code quality:

```bash
# Check for linting errors
npm run lint

# Auto-fix linting errors
npm run lint:fix
```

### Code Formatting

Prettier is configured for consistent code formatting:

```bash
# Check formatting
npm run format:check

# Auto-format code
npm run format
```

### Pre-commit Hooks

Husky is configured to run checks before commits:

- Linting
- Type checking
- Running tests

If pre-commit hooks fail, fix the issues before committing.

### Editor Configuration

For VS Code, add these settings to `.vscode/settings.json`:

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

#### Node Modules Issues

If you encounter dependency issues:

```bash
rm -rf node_modules package-lock.json
npm install
```

#### Port Already in Use

If the development server port is occupied:

```bash
# Kill the process using the port (example for port 5173)
# macOS/Linux:
lsof -ti:5173 | xargs kill -9

# Windows:
netstat -ano | findstr :5173
taskkill /PID <PID> /F
```

Or specify a different port:

```bash
npm run dev -- --port 3000
```

#### TypeScript Errors

If you see unexpected TypeScript errors:

```bash
# Restart the TypeScript server in VS Code
# Command Palette (Ctrl+Shift+P / Cmd+Shift+P) -> "TypeScript: Restart TS Server"

# Or delete TypeScript cache
rm -rf node_modules/.cache
```

#### Build Fails

If the build fails:

1. Ensure all TypeScript errors are fixed
2. Check for missing dependencies
3. Clear cache and rebuild:
   ```bash
   npm run clean  # If available
   npm run build
   ```

### Getting Help

If you encounter issues not covered here:

1. Check existing [issues](https://github.com/remiboivin021/web-template/issues)
2. Review [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines
3. Ask questions in a new issue with the `question` label

## Performance Tips

### Bundle Size Analysis

Analyze what's in your production bundle:

```bash
npm run build -- --report
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
