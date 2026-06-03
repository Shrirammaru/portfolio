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
    const Testimonial = require('../models/Testimonial')
    const testimonials = await Testimonial.find().sort({ order: 1, createdAt: -1 })
    res.json({ success: true, data: testimonials })
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error' })
  }
})

router.post('/', async (req, res) => {
  if (!isMongoConnected()) return res.status(503).json({ success: false, message: 'DB not connected' })
  try {
    const Testimonial = require('../models/Testimonial')
    const t = new Testimonial(req.body)
    await t.save()
    res.status(201).json({ success: true, data: t })
  } catch (err) {
    res.status(400).json({ success: false, message: err.message })
  }
})

module.exports = router
