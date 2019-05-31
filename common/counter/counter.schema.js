const mongoose = require('mongoose')
const Schema = mongoose.Schema

/**
 * Counter schema
 */
const CounterSchema = new Schema({
  type: String,
  seq: {
    type: Number,
    default: 0
  }
})

module.exports = CounterSchema
