const mongoose = require('mongoose');

const workSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  description: { type: String, required: true },
  videoUrl: { type: String, required: true },
  thumbnail: { type: String, default: '' },
  category: {
    type: String,
    enum: ['Cinematography', 'Editing', 'Drone', 'Commercial', 'Short Film', 'Music Video'],
    default: 'Cinematography'
  },
  tags: [{ type: String }],
  featured: { type: Boolean, default: false },
  order: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Work', workSchema);
