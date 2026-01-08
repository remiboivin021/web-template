import { Router, type Request, type Response } from 'express'
import { pool, testConnection, initializeDatabase } from '../db'

export const healthRouter = Router()

healthRouter.get('/', async (_req: Request, res: Response) => {
  try {
    const isConnected = await testConnection()
    
    if (!isConnected) {
      return res.status(503).json({
        status: 'unhealthy',
        database: 'disconnected',
        timestamp: new Date().toISOString(),
      })
    }

    // Initialize database if not already done
    await initializeDatabase()

    // Insert a health check record
    await pool.query(
      'INSERT INTO health_checks (status) VALUES ($1)',
      ['healthy']
    )

    return res.json({
      status: 'healthy',
      database: 'connected',
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error('Health check error:', error)
    return res.status(503).json({
      status: 'unhealthy',
      database: 'error',
      error: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString(),
    })
  }
})
