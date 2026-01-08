# TypeScript Guide

Best practices and guidelines for TypeScript in the Web Template.

## TypeScript Configuration

The project uses **strict TypeScript** configuration for maximum type safety.

### Key Settings

```json
{
  "compilerOptions": {
    "strict": true,                      // Enable all strict checks
    "noImplicitAny": true,              // Error on implicit 'any'
    "strictNullChecks": true,            // Strict null checking
    "noUnusedLocals": true,              // Error on unused variables
    "noUnusedParameters": true,          // Error on unused parameters
    "noImplicitReturns": true,           // Error on missing returns
    "noFallthroughCasesInSwitch": true, // Error on fallthrough cases
    "noUncheckedIndexedAccess": true     // Add undefined to index access
  }
}
```

## Type Safety Rules

### 1. Never Use `any`

❌ **Bad:**
```typescript
function process(data: any) {
  return data.value
}
```

✅ **Good:**
```typescript
function process(data: unknown) {
  if (typeof data === 'object' && data !== null && 'value' in data) {
    return data.value
  }
  throw new Error('Invalid data')
}
```

### 2. Explicit Function Return Types

❌ **Bad:**
```typescript
function getUser(id: number) {
  return db.query('SELECT * FROM users WHERE id = $1', [id])
}
```

✅ **Good:**
```typescript
async function getUser(id: number): Promise<User | null> {
  const result = await db.query('SELECT * FROM users WHERE id = $1', [id])
  return result.rows[0] ?? null
}
```

### 3. Strict Null Checks

✅ **Handle null/undefined:**
```typescript
const user = await getUser(id)
if (!user) {
  throw new Error('User not found')
}
// TypeScript knows user is not null here
console.log(user.username)
```

### 4. Type Guards

```typescript
function isString(value: unknown): value is string {
  return typeof value === 'string'
}

function processValue(value: unknown) {
  if (isString(value)) {
    // TypeScript knows value is string
    console.log(value.toUpperCase())
  }
}
```

## React TypeScript Patterns

### Component Props

```typescript
interface ButtonProps {
  label: string
  onClick: () => void
  disabled?: boolean
}

const Button: React.FC<ButtonProps> = ({ label, onClick, disabled = false }) => {
  return (
    <button onClick={onClick} disabled={disabled}>
      {label}
    </button>
  )
}
```

### Event Handlers

```typescript
const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
  event.preventDefault()
  // Handle click
}

const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  const value = event.target.value
  // Handle change
}
```

### Hooks

```typescript
// useState with explicit type
const [count, setCount] = useState<number>(0)

// useState with inferred type
const [user, setUser] = useState<User | null>(null)

// useEffect with cleanup
useEffect(() => {
  const timer = setTimeout(() => {
    console.log('Timer')
  }, 1000)
  
  return () => clearTimeout(timer)
}, [])
```

### Custom Hooks

```typescript
interface UseApiResult<T> {
  data: T | null
  loading: boolean
  error: string | null
}

function useApi<T>(url: string): UseApiResult<T> {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(url)
        const json = await response.json() as T
        setData(json)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error')
      } finally {
        setLoading(false)
      }
    }
    
    void fetchData()
  }, [url])
  
  return { data, loading, error }
}
```

## Backend TypeScript Patterns

### Express Route Handlers

```typescript
import { Request, Response, NextFunction } from 'express'

interface UserParams {
  id: string
}

interface UserBody {
  username: string
  email: string
}

router.post('/users/:id', async (
  req: Request<UserParams, {}, UserBody>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params
    const { username, email } = req.body
    // Handle request
    res.json({ success: true })
  } catch (error) {
    next(error)
  }
})
```

### Database Types

```typescript
interface User {
  id: number
  username: string
  email: string
  created_at: Date
  updated_at: Date
}

type CreateUserInput = Omit<User, 'id' | 'created_at' | 'updated_at'>
type UpdateUserInput = Partial<CreateUserInput>
```

## Utility Types

### Pick and Omit

```typescript
interface User {
  id: number
  username: string
  email: string
  password: string
}

// Pick specific properties
type PublicUser = Pick<User, 'id' | 'username' | 'email'>

// Omit specific properties
type UserWithoutPassword = Omit<User, 'password'>
```

### Partial and Required

```typescript
// All properties optional
type PartialUser = Partial<User>

// All properties required
type RequiredUser = Required<User>
```

### Record

```typescript
// Object with string keys and User values
type UsersById = Record<string, User>

// Example
const users: UsersById = {
  '1': { id: 1, username: 'alice', /* ... */ },
  '2': { id: 2, username: 'bob', /* ... */ },
}
```

## Validation with Zod

```typescript
import { z } from 'zod'

// Define schema
const UserSchema = z.object({
  id: z.number(),
  username: z.string().min(3).max(50),
  email: z.string().email(),
  created_at: z.coerce.date(),
})

// Infer TypeScript type from schema
type User = z.infer<typeof UserSchema>

// Validate data
function validateUser(data: unknown): User {
  return UserSchema.parse(data)
}

// Safe validation
function safeValidateUser(data: unknown): User | null {
  const result = UserSchema.safeParse(data)
  return result.success ? result.data : null
}
```

## Error Handling

### Custom Error Classes

```typescript
class AppError extends Error {
  constructor(
    message: string,
    public statusCode: number = 500,
    public code?: string
  ) {
    super(message)
    this.name = 'AppError'
  }
}

class NotFoundError extends AppError {
  constructor(message: string) {
    super(message, 404, 'NOT_FOUND')
    this.name = 'NotFoundError'
  }
}
```

### Error Type Guards

```typescript
function isAppError(error: unknown): error is AppError {
  return error instanceof AppError
}

try {
  // Code
} catch (error) {
  if (isAppError(error)) {
    res.status(error.statusCode).json({ error: error.message })
  } else {
    res.status(500).json({ error: 'Internal server error' })
  }
}
```

## Async/Await Best Practices

### Handle Promises Properly

✅ **Good:**
```typescript
async function fetchData(): Promise<Data> {
  try {
    const response = await fetch('/api/data')
    return await response.json() as Data
  } catch (error) {
    console.error('Fetch error:', error)
    throw error
  }
}
```

### Void for Fire-and-Forget

```typescript
// When you intentionally don't await
void fetchData()

// Or in useEffect
useEffect(() => {
  void fetchData()
}, [])
```

## Type-Safe Environment Variables

```typescript
// src/server/config.ts
function getEnvVar(key: string, defaultValue?: string): string {
  const value = process.env[key]
  if (!value && !defaultValue) {
    throw new Error(`Missing required environment variable: ${key}`)
  }
  return value ?? defaultValue ?? ''
}

export const config = {
  port: parseInt(getEnvVar('PORT', '3001'), 10),
  dbHost: getEnvVar('DB_HOST', 'localhost'),
  dbPort: parseInt(getEnvVar('DB_PORT', '5432'), 10),
  dbName: getEnvVar('DB_NAME', 'webtemplate'),
  dbUser: getEnvVar('DB_USER', 'postgres'),
  dbPassword: getEnvVar('DB_PASSWORD'),
} as const
```

## Testing Types

```typescript
// Type assertions in tests
const user = await getUser(1)
expect(user).toBeDefined()
// After this check, TypeScript knows user is not null
expect(user!.username).toBe('alice')

// Type narrowing in tests
if (user) {
  expect(user.username).toBe('alice')
}
```

## IDE Setup

### VS Code Settings

```json
{
  "typescript.tsdk": "node_modules/typescript/lib",
  "typescript.enablePromptUseWorkspaceTsdk": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  }
}
```

## Common Pitfalls

### 1. Array Index Access

```typescript
// Problem: arr[0] might be undefined
const arr: string[] = []
const first = arr[0] // Type: string | undefined (with noUncheckedIndexedAccess)

// Solution: Check first
const first = arr[0]
if (first) {
  console.log(first.toUpperCase())
}
```

### 2. JSON.parse

```typescript
// Problem: JSON.parse returns 'any'
const data = JSON.parse(jsonString)

// Solution: Validate with Zod
const data = MySchema.parse(JSON.parse(jsonString))
```

### 3. Async Functions in useEffect

```typescript
// ❌ Don't do this
useEffect(async () => {
  await fetchData()
}, [])

// ✅ Do this
useEffect(() => {
  async function loadData() {
    await fetchData()
  }
  void loadData()
}, [])
```

## Next Steps

- [Architecture Guide](architecture.md)
- [Database Guide](database.md)
- [API Reference](api.md)
