import { Pool, type PoolConfig } from 'pg'

const poolConfig: PoolConfig = {
  host: process.env.DB_HOST ?? 'localhost',
  port: parseInt(process.env.DB_PORT ?? '5432', 10),
  database: process.env.DB_NAME ?? 'webtemplate',
  user: process.env.DB_USER ?? 'postgres',
  password: process.env.DB_PASSWORD ?? 'postgres',
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
}

export const pool = new Pool(poolConfig)

// Test connection
pool.on('connect', () => {
  console.log('✅ Connected to PostgreSQL database')
})

pool.on('error', (err) => {
  console.error('❌ Unexpected error on idle client', err)
  // Graceful error handling - log and notify, but don't exit immediately
  // In production, you might want to trigger alerting here
})

export const testConnection = async (): Promise<boolean> => {
  try {
    const client = await pool.connect()
    const result = await client.query('SELECT NOW()')
    client.release()
    console.log('Database connection test successful:', result.rows[0])
    return true
  } catch (error) {
    console.error('Database connection test failed:', error)
    return false
  }
}

export const initializeDatabase = async (): Promise<void> => {
  try {
    const client = await pool.connect()
    
    // Create a simple example table
    await client.query(`
      CREATE TABLE IF NOT EXISTS health_checks (
        id SERIAL PRIMARY KEY,
        timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        status TEXT NOT NULL
      )
    `)
    
    console.log('✅ Database initialized successfully')
    client.release()
  } catch (error) {
    console.error('❌ Database initialization failed:', error)
    throw error
  }
}
