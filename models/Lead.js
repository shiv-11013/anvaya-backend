const mongoose = require('mongoose')

const leadSchema = new mongoose.Schema({
  leadName: {
    type: String,
    required: [true, 'Lead name is required'],
    trim: true
  },
  leadSource: {
    type: String,
    required: true,
    enum: ['Website', 'Cold Call', 'Social Media', 'Referral']
  },
  assignedAgent: {
    type: String,
    required: true
  },
  leadStatus: {
    type: String,
    required: true,
    enum: ['New', 'Contacted', 'Qualified', 'Proposal Sent', 'Closed'],
    default: 'New'
  },
  tag: {
    type: String,
    enum: ['High Value', 'Follow-up', 'New Lead', 'Hot Lead', 'Cold Lead']
  },
  priority: {
    type: String,
    required: true,
    enum: ['High', 'Medium', 'Low'],
    default: 'Medium'
  },
  timeToClose: {
    type: Number,
    required: true
  },
  comments: [{
    author: {
      type: String,
      required: true
    },
    text: {
      type: String,
      required: true
    },
    timestamp: {
      type: Date,
      default: Date.now
    }
  }]
}, {
  timestamps: true
})

module.exports = mongoose.model('Lead', leadSchema)