# Quick Start Guide

This guide will help you get started with the Web Template boilerplate in under 5 minutes.

## Prerequisites

- Node.js 18 or higher
- npm or yarn

## Installation

```bash
# Install dependencies
npm install

# Copy environment variables
cp .env.example .env
```

## Development

```bash
# Start the development server
npm run dev

# The app will open at http://localhost:3000
```

## Available Features

### Pages
- **Home** (`/`) - Landing page with feature showcase
- **About** (`/about`) - Technology stack information
- **Login** (`/login`) - User authentication
- **Register** (`/register`) - User registration
- **Dashboard** (`/dashboard`) - Protected user dashboard (requires login)

### UI Components
All components are in `src/components/`:
- `Button` - Flexible button with variants
- `Input` - Form input with validation
- `Card` - Content container
- `Toast` - Notification system
- `Loading` - Loading indicator
- `ErrorBoundary` - Error handling

### Custom Hooks
Located in `src/hooks/`:
- `useAuth` - Authentication management
- `useForm` - Form handling with validation
- `useMediaQuery` - Responsive breakpoints
- `useLocalStorage` - Persistent storage

### State Management
Using Zustand stores in `src/store/`:
- `auth.store.ts` - User authentication state
- `ui.store.ts` - UI state (theme, toasts, sidebar)

## Common Tasks

### Running Tests
```bash
npm test              # Run all tests
npm run test:watch    # Watch mode
npm run test:coverage # With coverage
```

### Code Quality
```bash
npm run lint          # Check for issues
npm run lint:fix      # Auto-fix issues
npm run format        # Format code
npm run type-check    # TypeScript check
```

### Building
```bash
npm run build         # Production build
npm run preview       # Preview build locally
```

## Project Structure

```
src/
├── components/     # Reusable UI components
├── hooks/          # Custom React hooks
├── layouts/        # Page layouts
├── pages/          # Route pages
├── services/       # API services
├── store/          # Global state (Zustand)
├── styles/         # Global styles
├── types/          # TypeScript types
└── utils/          # Utility functions
```

## Tips

1. **Adding a new page**: Create in `src/pages/` and add route in `src/App.tsx`
2. **Creating components**: Use CSS Modules for styling (`.module.css`)
3. **API calls**: Use `apiClient` from `src/services/api.ts`
4. **Forms**: Use `useForm` hook with Zod validation
5. **Notifications**: Use `useUIStore().addToast()` for toast messages
6. **Theme**: Toggle with `useUIStore().setTheme()`

## Next Steps

1. Connect to your backend API (update `VITE_API_BASE_URL` in `.env`)
2. Customize the theme colors in `src/styles/index.css`
3. Add your business logic in `src/services/`
4. Create new pages and components as needed
5. Deploy to your hosting platform

## Need Help?

- Check the full [README.md](./README.md) for detailed documentation
- All code includes JSDoc comments for guidance
- Tests in `src/tests/` serve as usage examples

Happy coding! 🚀
