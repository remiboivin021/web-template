import express, { type Request, type Response, type NextFunction } from 'express'
import { healthRouter } from './routes/health'

const app = express()
const PORT = process.env.PORT ?? 3001

// Middleware
app.use(express.json())

// CORS for development (restrict in production)
if (process.env.NODE_ENV !== 'production') {
  app.use((_req: Request, res: Response, next: NextFunction) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000')
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
    next()
  })
}

// Routes
app.use('/api/health', healthRouter)

// Error handling
app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  console.error('Error:', err)
  res.status(500).json({ error: 'Internal server error', message: err.message })
})

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`)
  console.log(`📊 Health check available at http://localhost:${PORT}/api/health`)
})
