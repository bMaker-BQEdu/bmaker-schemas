const mongoose = require('mongoose')
const Schema = mongoose.Schema

/**
 * SessionToken schema
 */
const SessionTokenSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  token: {
    type: String,
    required: true
  }
})

module.exports = SessionTokenSchema
