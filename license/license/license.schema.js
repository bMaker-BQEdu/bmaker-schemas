const ISBNSchema = require('../isbn/isbn.schema')
const mongoose = require('mongoose')
const Schema = mongoose.Schema

/**
 * License schema
 */
const LicenseSchema = new Schema({
  hash: String,
  ISBN: {
    type: ISBNSchema,
    required: true
  },
  classroom: Schema.Types.ObjectId,
  requestId: {
    type: Number,
    required: true
  },
  expireAt: Date,
  used: {
    type: Boolean,
    default: false
  },
  activatedAt: Date,
  deactivated: Boolean,
  deactivatedAt: Date,
  reason: String,
  deleted: Boolean
}, { timestamps: true })

module.exports = LicenseSchema
