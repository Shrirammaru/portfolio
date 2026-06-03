const express = require('express')
const router  = express.Router()

const isMongoConnected = () => {
  try {
    const mongoose = require('mongoose')
    return mongoose.connection.readyState === 1
  } catch { return false }
}

router.get('/', async (req, res) => {
  if (!isMongoConnected()) return res.json({ success: true, data: [] })
  try {
    const Work = require('../models/Work')
    const { category } = req.query
    const filter = category && category !== 'All' ? { category } : {}
    const works = await Work.find(filter).sort({ featured: -1, order: 1, createdAt: -1 })
    res.json({ success: true, data: works })
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error' })
  }
})

router.post('/', async (req, res) => {
  if (!isMongoConnected()) return res.status(503).json({ success: false, message: 'DB not connected' })
  try {
    const Work = require('../models/Work')
    const work = new Work(req.body)
    await work.save()
    res.status(201).json({ success: true, data: work })
  } catch (err) {
    res.status(400).json({ success: false, message: err.message })
  }
})

module.exports = router
