const express = require('express')
const cors    = require('cors')
require('dotenv').config()

const app = express()

// ── Middleware ──
app.use(cors({
  origin: [
    process.env.FRONTEND_URL || 'http://localhost:3000',
    'http://localhost:3000',
    /\.vercel\.app$/,
  ],
  credentials: true,
}))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// ── Routes (always available) ──
app.use('/api/contact',      require('./routes/contact'))
app.use('/api/works',        require('./routes/works'))
app.use('/api/testimonials', require('./routes/testimonials'))

app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Shriram Portfolio API is running' })
})

// ── Start server immediately (no waiting for MongoDB) ──
const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`)
  console.log(`📧 Mail configured for: ${process.env.MAIL_USER}`)

  // Try MongoDB connection separately — server works even if Mongo is unavailable
  const MONGO_URI = process.env.MONGO_URI
  if (MONGO_URI && !MONGO_URI.includes('<username>')) {
    const mongoose = require('mongoose')
    mongoose.connect(MONGO_URI)
      .then(() => console.log('✅ MongoDB connected'))
      .catch(err => console.warn('⚠️  MongoDB unavailable (mail still works):', err.message))
  } else {
    console.log('ℹ️  MongoDB not configured — running in mail-only mode')
  }
})
