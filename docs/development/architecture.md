# Architecture

This document describes the architecture and design principles of the Web Template.

## Overview

The Web Template follows a **layered architecture** with clear separation of concerns:

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

## Directory Structure

```
web-template/
├── src/
│   ├── client/              # Frontend application
│   │   ├── App.tsx          # Root component
│   │   ├── main.tsx         # React entry point
│   │   ├── App.css          # Component styles
│   │   └── index.css        # Global styles
│   │
│   └── server/              # Backend application
│       ├── index.ts         # Express server entry
│       ├── db/              # Database layer
│       │   └── index.ts     # PostgreSQL connection
│       ├── routes/          # API routes
│       │   └── health.ts    # Health check endpoint
│       └── types/           # TypeScript types
│
├── docs/                    # MkDocs documentation
├── public/                  # Static assets
├── Dockerfile               # Production container
├── Dockerfile.dev           # Development container
├── docker-compose.yml       # Production orchestration
├── docker-compose.dev.yml   # Development orchestration
├── package.json             # Dependencies
├── tsconfig.json            # TypeScript config (client)
├── tsconfig.server.json     # TypeScript config (server)
├── vite.config.ts           # Vite configuration
└── mkdocs.yml              # Documentation config
```

## Layer Responsibilities

### 1. Presentation Layer (Frontend)

**Location:** `src/client/`

**Responsibilities:**
- Render UI components
- Handle user interactions
- Manage local UI state
- Display data from API

**Key Principles:**
- ✅ Functional components only
- ✅ Strict TypeScript typing
- ✅ No business logic in components
- ✅ Props destructuring at signature level
- ✅ React hooks for side effects

**Example:**
```typescript
const App: React.FC = () => {
  const [health, setHealth] = useState<HealthStatus | null>(null)
  
  useEffect(() => {
    // Fetch from API
  }, [])
  
  return <div>{/* UI */}</div>
}
```

### 2. Application Layer (Backend Routes)

**Location:** `src/server/routes/`

**Responsibilities:**
- Handle HTTP requests
- Validate input data
- Coordinate business logic
- Format responses

**Key Principles:**
- ✅ Route handlers are thin
- ✅ Delegate to domain layer
- ✅ Proper error handling
- ✅ Type-safe request/response

**Example:**
```typescript
healthRouter.get('/', async (_req: Request, res: Response) => {
  try {
    const isConnected = await testConnection()
    return res.json({
      status: 'healthy',
      database: isConnected ? 'connected' : 'disconnected',
    })
  } catch (error) {
    return res.status(503).json({ error: 'Service unavailable' })
  }
})
```

### 3. Domain Layer

**Location:** `src/server/types/`, business logic

**Responsibilities:**
- Define business entities
- Implement business rules
- Type definitions
- Data validation (Zod schemas)

**Key Principles:**
- ✅ No framework dependencies
- ✅ Pure TypeScript
- ✅ Reusable across layers
- ✅ Strict types, no `any`

**Example:**
```typescript
interface HealthStatus {
  status: string
  database: string
  timestamp: string
}
```

### 4. Infrastructure Layer

**Location:** `src/server/db/`

**Responsibilities:**
- Database connections
- External API calls
- File system operations
- Caching

**Key Principles:**
- ✅ Abstract implementation details
- ✅ Connection pooling
- ✅ Error handling
- ✅ Resource cleanup

**Example:**
```typescript
export const pool = new Pool({
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT ?? '5432'),
  // ...
})
```

## Design Patterns

### 1. Dependency Injection

Dependencies are injected through function parameters:

```typescript
// Bad: Hard-coded dependency
function getUsers() {
  const db = new Database()
  return db.query('SELECT * FROM users')
}

// Good: Injected dependency
function getUsers(db: Database) {
  return db.query('SELECT * FROM users')
}
```

### 2. Repository Pattern

Database access is abstracted through repositories:

```typescript
// Future structure
class UserRepository {
  constructor(private pool: Pool) {}
  
  async findById(id: number): Promise<User | null> {
    const result = await this.pool.query(
      'SELECT * FROM users WHERE id = $1',
      [id]
    )
    return result.rows[0] ?? null
  }
}
```

### 3. Factory Pattern

For object creation:

```typescript
function createHealthStatus(dbConnected: boolean): HealthStatus {
  return {
    status: dbConnected ? 'healthy' : 'unhealthy',
    database: dbConnected ? 'connected' : 'disconnected',
    timestamp: new Date().toISOString(),
  }
}
```

## React Architecture

### Component Structure

```typescript
// Props interface
interface ComponentProps {
  title: string
  onAction: () => void
}

// Functional component with explicit typing
const Component: React.FC<ComponentProps> = ({ title, onAction }) => {
  // Hooks at top level
  const [state, setState] = useState<string>('')
  
  // Event handlers
  const handleClick = () => {
    onAction()
  }
  
  // Render
  return (
    <div onClick={handleClick}>
      {title}
    </div>
  )
}
```

### State Management

**Current:** Local state with `useState` and `useEffect`

**For Complex Apps:** Consider:
- Zustand for global state
- React Query for server state
- Context API for theme/auth

### Custom Hooks

Extract reusable logic:

```typescript
function useHealthCheck() {
  const [health, setHealth] = useState<HealthStatus | null>(null)
  const [loading, setLoading] = useState(true)
  
  useEffect(() => {
    async function fetchHealth() {
      const response = await fetch('/api/health')
      const data = await response.json() as HealthStatus
      setHealth(data)
      setLoading(false)
    }
    
    void fetchHealth()
  }, [])
  
  return { health, loading }
}
```

## API Design

### RESTful Endpoints

```
GET    /api/health         - Health check
GET    /api/users          - List users
GET    /api/users/:id      - Get user
POST   /api/users          - Create user
PUT    /api/users/:id      - Update user
DELETE /api/users/:id      - Delete user
```

### Response Format

```typescript
// Success
{
  "data": { /* resource */ },
  "timestamp": "2026-01-08T05:56:00Z"
}

// Error
{
  "error": "Error message",
  "code": "ERROR_CODE",
  "timestamp": "2026-01-08T05:56:00Z"
}
```

## Database Schema

### Naming Conventions

- Tables: `snake_case`, plural (e.g., `users`, `health_checks`)
- Columns: `snake_case` (e.g., `created_at`, `user_id`)
- Primary keys: `id`
- Foreign keys: `{table}_id` (e.g., `user_id`)
- Timestamps: `created_at`, `updated_at`

### Example Schema

```sql
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(255) UNIQUE NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_users_email ON users(email);
```

## Type Safety

### Strict TypeScript

All code must pass strict TypeScript checks:

```bash
npm run type-check
```

### No `any` Policy

❌ **Never use `any`:**
```typescript
function process(data: any) { /* Bad */ }
```

✅ **Use proper types:**
```typescript
function process(data: unknown) {
  if (typeof data === 'string') {
    // Type narrowing
  }
}
```

### Type Guards

```typescript
function isHealthStatus(obj: unknown): obj is HealthStatus {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    'status' in obj &&
    'database' in obj
  )
}
```

## Error Handling

### Frontend

```typescript
try {
  const response = await fetch('/api/endpoint')
  if (!response.ok) {
    throw new Error(`HTTP ${response.status}`)
  }
  const data = await response.json()
} catch (error) {
  if (error instanceof Error) {
    console.error(error.message)
  }
}
```

### Backend

```typescript
app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  console.error('Error:', err)
  res.status(500).json({
    error: 'Internal server error',
    message: err.message,
  })
})
```

## Testing Strategy

### Unit Tests

- Test pure functions
- Mock external dependencies
- Use Jest or Vitest

### Integration Tests

- Test API endpoints
- Use test database
- Reset state between tests

### E2E Tests

- Test user workflows
- Use Playwright or Cypress
- Test critical paths

## Performance Considerations

### Frontend

- ✅ Code splitting with React.lazy
- ✅ Memoization with React.memo
- ✅ Debounce user inputs
- ✅ Lazy load images

### Backend

- ✅ Connection pooling
- ✅ Query optimization
- ✅ Caching strategies
- ✅ Rate limiting

### Database

- ✅ Proper indexes
- ✅ Query plan analysis
- ✅ Prepared statements
- ✅ Connection limits

## Security Best Practices

1. ✅ Input validation (Zod)
2. ✅ Parameterized queries (SQL injection prevention)
3. ✅ Environment variables for secrets
4. ✅ HTTPS in production
5. ✅ CORS configuration
6. ✅ Rate limiting
7. ✅ Security headers

## Scalability

### Horizontal Scaling

- Load balancer
- Multiple app instances
- Session management
- Stateless services

### Database Scaling

- Read replicas
- Connection pooling
- Query optimization
- Caching layer (Redis)

## Next Steps

- [Database Guide](database.md)
- [API Reference](api.md)
- [TypeScript Guide](typescript.md)
