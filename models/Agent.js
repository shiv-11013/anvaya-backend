const mongoose = require('mongoose')

const agentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Agent name is required'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    trim: true
  }
}, {
  timestamps: true  
})

module.exports = mongoose.model('Agent', agentSchema)