# Web Template - TypeScript React Boilerplate

A modern, production-ready TypeScript web application boilerplate with React, featuring all the essential tools and best practices for building scalable web applications.

## ✨ Features

- ⚡ **Fast Development** - Vite for instant HMR and optimized builds
- 🛡️ **Type Safety** - Strict TypeScript configuration throughout
- ⚛️ **React 19** - Latest React features and patterns
- 🎨 **Modern UI** - Responsive design with CSS Modules
- 🔐 **Authentication** - Complete auth flow with protected routes
- 📦 **State Management** - Zustand for simple, scalable state
- 🧪 **Testing** - Vitest + React Testing Library configured
- 🎯 **Form Validation** - Zod schemas for type-safe validation
- 🌙 **Dark Mode** - Built-in theme switching
- 🔔 **Notifications** - Toast notification system
- ♿ **Accessible** - ARIA labels and keyboard navigation
- 📱 **Responsive** - Mobile-first design approach
- 🚀 **Production Ready** - Error boundaries, lazy loading, and optimizations

## 🛠️ Tech Stack

### Core
- **React** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server

### Routing & State
- **React Router** - Client-side routing
- **Zustand** - State management

### HTTP & Validation
- **Axios** - HTTP client
- **Zod** - Schema validation

### Styling
- **CSS Modules** - Component-scoped styles
- **CSS Variables** - Themeable design system

### Testing & Quality
- **Vitest** - Unit testing framework
- **React Testing Library** - Component testing
- **ESLint** - Code linting
- **Prettier** - Code formatting

## 📦 Getting Started

### Prerequisites
- Node.js 18+ and npm

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/web-template.git
cd web-template
```

2. Install dependencies:
```bash
npm install
```

3. Copy environment variables:
```bash
cp .env.example .env
```

4. Start the development server:
```bash
npm run dev
```

The application will open at `http://localhost:3000`

## 📜 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Lint code
- `npm run lint:fix` - Fix linting issues
- `npm run format` - Format code with Prettier
- `npm run format:check` - Check code formatting
- `npm test` - Run tests
- `npm run test:watch` - Run tests in watch mode
- `npm run test:coverage` - Generate test coverage report
- `npm run type-check` - Check TypeScript types

## 📁 Project Structure

```
src/
├── components/       # Reusable UI components
│   ├── Button.tsx
│   ├── Input.tsx
│   ├── Card.tsx
│   ├── Loading.tsx
│   ├── Toast.tsx
│   ├── ProtectedRoute.tsx
│   └── ErrorBoundary.tsx
├── hooks/           # Custom React hooks
│   ├── useAuth.ts
│   ├── useForm.ts
│   ├── useLocalStorage.ts
│   └── useMediaQuery.ts
├── layouts/         # Layout components
│   ├── Header.tsx
│   ├── Footer.tsx
│   └── MainLayout.tsx
├── pages/           # Page components
│   ├── Home.tsx
│   ├── About.tsx
│   ├── Login.tsx
│   ├── Register.tsx
│   ├── Dashboard.tsx
│   └── NotFound.tsx
├── services/        # API services
│   ├── api.ts
│   └── auth.service.ts
├── store/           # Global state management
│   ├── auth.store.ts
│   └── ui.store.ts
├── styles/          # Global styles
│   └── index.css
├── types/           # TypeScript type definitions
│   ├── index.ts
│   └── env.d.ts
├── utils/           # Utility functions
│   ├── config.ts
│   ├── helpers.ts
│   ├── storage.ts
│   └── validation.ts
├── tests/           # Test files
│   ├── setup.ts
│   ├── Button.test.tsx
│   └── helpers.test.ts
├── App.tsx          # Router configuration
└── main.tsx         # Application entry point
```

## 🎨 Design System

The project uses CSS variables for a consistent, themeable design system:

- **Colors** - Primary, secondary, success, error, warning, info
- **Spacing** - Consistent spacing scale (xs, sm, md, lg, xl, 2xl)
- **Typography** - Font sizes and weights
- **Shadows** - Box shadow utilities
- **Border Radius** - Consistent rounded corners
- **Transitions** - Smooth animations

## 🔐 Authentication

The boilerplate includes a complete authentication flow:

1. **Login/Register** - Form validation and error handling
2. **Protected Routes** - Route guards for authenticated content
3. **Token Management** - Automatic token storage and refresh
4. **User State** - Global auth state with Zustand

## 🧪 Testing

Tests are written using Vitest and React Testing Library:

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Generate coverage report
npm run test:coverage
```

## 🚀 Building for Production

```bash
npm run build
```

The optimized production build will be in the `dist` folder, ready for deployment.

## 📝 Environment Variables

Create a `.env` file based on `.env.example`:

```env
VITE_API_BASE_URL=http://localhost:8080/api
VITE_API_TIMEOUT=30000
VITE_APP_NAME=Web Template
VITE_APP_VERSION=1.0.0
VITE_ENABLE_DARK_MODE=true
VITE_ENABLE_ANALYTICS=false
```

## 🎯 Best Practices

This boilerplate follows industry best practices:

- ✅ **Strict TypeScript** - No `any` types allowed
- ✅ **Component Architecture** - Atomic design principles
- ✅ **Custom Hooks** - Business logic separated from UI
- ✅ **Error Handling** - Error boundaries and try-catch blocks
- ✅ **Accessibility** - ARIA labels and semantic HTML
- ✅ **Performance** - Code splitting and lazy loading
- ✅ **Security** - Input validation and sanitization
- ✅ **Testing** - Unit tests for utilities and components

## 📚 Learn More

- [React Documentation](https://react.dev)
- [TypeScript Documentation](https://www.typescriptlang.org/docs)
- [Vite Documentation](https://vitejs.dev)
- [Zustand Documentation](https://docs.pmnd.rs/zustand)
- [React Router Documentation](https://reactrouter.com)
- [Vitest Documentation](https://vitest.dev)

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the ISC License - see the LICENSE file for details.

## 🙏 Acknowledgments

Built with modern tools and best practices to help you start your next web application quickly and efficiently.
