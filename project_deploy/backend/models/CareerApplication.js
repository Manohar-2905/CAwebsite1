const mongoose = require('mongoose');

const careerApplicationSchema = new mongoose.Schema({
  careerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Career',
    required: true
  },
  careerTitle: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true
  },
  phone: {
    type: String,
    required: true,
    trim: true
  },
  resume: {
    type: String,
    required: true
  },
  coverLetter: {
    type: String,
    default: ''
  },
  experience: {
    type: String,
    default: ''
  },
  status: {
    type: String,
    enum: ['pending', 'reviewed', 'shortlisted', 'rejected'],
    default: 'pending'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('CareerApplication', careerApplicationSchema);

