# API Reference

Complete reference for all API endpoints in the Web Template.

## Base URL

- **Development:** `http://localhost:3001/api`
- **Production:** `https://your-domain.com/api`

## Health Check

### GET /api/health

Check the health status of the application and database connection.

**Request:**
```http
GET /api/health HTTP/1.1
Host: localhost:3001
```

**Success Response (200):**
```json
{
  "status": "healthy",
  "database": "connected",
  "timestamp": "2026-01-08T05:56:00.000Z"
}
```

**Error Response (503):**
```json
{
  "status": "unhealthy",
  "database": "disconnected",
  "error": "Connection timeout",
  "timestamp": "2026-01-08T05:56:00.000Z"
}
```

**Example with cURL:**
```bash
curl http://localhost:3001/api/health
```

**Example with fetch:**
```typescript
const response = await fetch('/api/health')
const health = await response.json()
console.log(health)
```

## Error Handling

All API errors follow this format:

```json
{
  "error": "Error message",
  "message": "Detailed error description",
  "timestamp": "2026-01-08T05:56:00.000Z"
}
```

### HTTP Status Codes

- `200 OK` - Request successful
- `400 Bad Request` - Invalid input
- `401 Unauthorized` - Authentication required
- `403 Forbidden` - Insufficient permissions
- `404 Not Found` - Resource not found
- `500 Internal Server Error` - Server error
- `503 Service Unavailable` - Service down

## Future Endpoints

### Users API (Example)

#### GET /api/users
List all users.

#### GET /api/users/:id
Get a specific user.

#### POST /api/users
Create a new user.

#### PUT /api/users/:id
Update a user.

#### DELETE /api/users/:id
Delete a user.

## Authentication (Future)

Future authentication will use JWT tokens:

```http
Authorization: Bearer <token>
```

## Rate Limiting (Future)

API rate limits:
- 100 requests per minute per IP
- 1000 requests per hour per user

## Versioning (Future)

API versioning via URL:
- `/api/v1/...`
- `/api/v2/...`

## Next Steps

- [Architecture](architecture.md)
- [Database Guide](database.md)
- [TypeScript Guide](typescript.md)
