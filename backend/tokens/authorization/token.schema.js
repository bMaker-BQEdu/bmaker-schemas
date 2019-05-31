const mongoose = require('mongoose')
const Schema = mongoose.Schema

/**
 * AutorizationToken schema
 */
const AutorizationTokenSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  token: String,
  createdAt: {
    type: Date,
    index: { expires: 60 * 60 * 24 * 15 }, // Expires after 2 weeks in seconds
    default: Date.now
  }
})

module.exports = AutorizationTokenSchema
