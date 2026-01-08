import React, { useEffect, useState } from 'react'
import './App.css'

interface HealthStatus {
  status: string
  database: string
  timestamp: string
}

const App: React.FC = () => {
  const [health, setHealth] = useState<HealthStatus | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchHealth = async () => {
      try {
        const response = await fetch('/api/health')
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        const data = await response.json() as HealthStatus
        setHealth(data)
        setError(null)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error')
        setHealth(null)
      } finally {
        setLoading(false)
      }
    }

    void fetchHealth()
  }, [])

  return (
    <div className="app">
      <header className="app-header">
        <h1>Web Template</h1>
        <p>TypeScript + React + PostgreSQL + Docker</p>
      </header>

      <main className="app-main">
        <section className="status-card">
          <h2>API Health Status</h2>
          {loading && <p>Loading...</p>}
          {error && (
            <div className="error">
              <p>Error: {error}</p>
              <p className="hint">
                Make sure the backend server is running on port 3001
              </p>
            </div>
          )}
          {health && (
            <div className="success">
              <p>✅ Status: {health.status}</p>
              <p>🗄️ Database: {health.database}</p>
              <p>🕐 Timestamp: {new Date(health.timestamp).toLocaleString()}</p>
            </div>
          )}
        </section>
      </main>

      <footer className="app-footer">
        <p>Built with ⚛️ React and TypeScript</p>
      </footer>
    </div>
  )
}

export default App
