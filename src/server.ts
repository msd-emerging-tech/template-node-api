import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'

dotenv.config()

const app = express()
const port = process.env.PORT || 4000
const appName = process.env.APP_NAME || 'node-api-prototype'

// Middleware
app.use(cors())
app.use(express.json())

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok' })
})

// Root
app.get('/', (req, res) => {
  res.json({
    name: appName,
    version: '1.0.0',
    status: 'running',
  })
})

// API routes
app.get('/api', (req, res) => {
  res.json({
    message: 'API is running',
    endpoints: [
      'GET /',
      'GET /health',
      'GET /api',
      'GET /api/example',
    ],
  })
})

app.get('/api/example', (req, res) => {
  res.json({
    message: 'This is an example endpoint',
    timestamp: new Date().toISOString(),
    data: {
      id: 1,
      name: 'Example Item',
      description: 'This is sample data from the API',
    },
  })
})

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Not found' })
})

// Start server - MUST bind to 0.0.0.0 for Docker
app.listen(port, '0.0.0.0', () => {
  console.log(`${appName} listening on http://0.0.0.0:${port}`)
  console.log(`Health check: http://0.0.0.0:${port}/health`)
})
