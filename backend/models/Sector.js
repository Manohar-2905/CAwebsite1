const mongoose = require('mongoose');

const sectorSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  icon: {
    type: String, // Corresponds to Lucide icon name, e.g., 'Landmark'
    required: false, // Made optional as image might replace it visually, but keeping for fallback
    trim: true
  },
  imageURL: {
    type: String,
    required: false
  },
  order: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

sectorSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Sector', sectorSchema);

