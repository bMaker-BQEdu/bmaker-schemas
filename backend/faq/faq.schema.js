const mongoose = require('mongoose')
const Schema = mongoose.Schema

/**
 * Faq schema
 */
const FaqSchema = new Schema({
  title: String,
  description: String
}, { timestamps: true })

module.exports = FaqSchema
