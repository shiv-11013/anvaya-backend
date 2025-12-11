const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const connectDB = require('./config/db')
const leadRoutes = require('./routes/leadRoutes')      // ✨ Add
const agentRoutes = require('./routes/agentRoutes')    // ✨ Add

// Load environment variables
dotenv.config()

// Connect to database
connectDB()

// Initialize express
const app = express()

// Middleware
app.use(cors())
app.use(express.json())

// Routes
app.use('/api/leads', leadRoutes)    // ✨ Add
app.use('/api/agents', agentRoutes)  // ✨ Add

// Test route
app.get('/', (req, res) => {
  res.json({ message: 'Anvaya CRM API is running!' })
})

// Port
const PORT = process.env.PORT || 5000

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})