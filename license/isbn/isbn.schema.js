const mongoose = require('mongoose')
const Schema = mongoose.Schema

/**
 * ISBN schema
 */
const ISBNSchema = new Schema({
  code: String,
  level: Number,
  projects: [Number],
  seats: Number,
  expiration: Number,
  kind: String,
  language: String
}, { _id: false }) // Ignore _id field when using ISBNs as subdocuments

module.exports = ISBNSchema
