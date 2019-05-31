const mongoose = require('mongoose')
const Schema = mongoose.Schema

/**
 * LicenseBackend schema
 */
const LicenseBackendSchema = new Schema({
  hash: String,
  ISBN: {
    level: Number,
    projects: [Number],
    seats: Number,
    kind: String,
    language: String
  },
  expireAt: Date,
  activatedAt: Date,
  createdAt: Date,
  updatedAt: Date,
  deactivated: Boolean,
  deactivatedAt: Date,
  valid: Boolean,
  projects: {
    type: [ Schema.Types.ObjectId ],
    ref: 'Project'
  }
})

module.exports = LicenseBackendSchema
