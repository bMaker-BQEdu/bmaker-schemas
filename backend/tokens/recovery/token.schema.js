const mongoose = require('mongoose')
const Schema = mongoose.Schema

/**
 * RecoveryToken schema
 */
const RecoveryTokenSchema = new Schema({
  user: {
    _id: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    username: String
  },
  token: String,
  createdAt: {
    type: Date,
    index: { expires: 60 * 30 }, // Expires after 30 minutes in seconds
    default: Date.now
  }
})

module.exports = RecoveryTokenSchema
