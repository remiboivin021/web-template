-- Initialize the database schema
-- This file is executed when the PostgreSQL container starts for the first time

-- Create health_checks table
CREATE TABLE IF NOT EXISTS health_checks (
  id SERIAL PRIMARY KEY,
  timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  status TEXT NOT NULL
);

-- Create index on timestamp for better query performance
CREATE INDEX IF NOT EXISTS idx_health_checks_timestamp ON health_checks(timestamp DESC);

-- Add a comment to document the table
COMMENT ON TABLE health_checks IS 'Stores API health check records for monitoring';

-- Example: Create users table (commented out - uncomment if needed)
-- CREATE TABLE IF NOT EXISTS users (
--   id SERIAL PRIMARY KEY,
--   username VARCHAR(255) UNIQUE NOT NULL,
--   email VARCHAR(255) UNIQUE NOT NULL,
--   created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
--   updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
-- );
-- 
-- CREATE INDEX IF NOT EXISTS idx_users_username ON users(username);
-- CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
-- 
-- COMMENT ON TABLE users IS 'Application users';
