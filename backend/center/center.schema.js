const mongoose = require('mongoose')
const Schema = mongoose.Schema

/**
 * CenterBackend schema
 */
const CenterBackendSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  address: {
    type: String,
    required: true,
    trim: true
  },
  city: {
    type: String,
    required: true,
    trim: true
  },
  postal_code: {
    type: String,
    required: true,
    trim: true
  },
  province: {
    type: String,
    required: true,
    trim: true
  },
  country: {
    type: String,
    trim: true,
    required: true
  },
  deleted: Boolean
}, { timestamps: true, versionKey: false })


module.exports = CenterBackendSchema
