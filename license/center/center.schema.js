var mongoose = require('mongoose')
var Schema = mongoose.Schema

require('mongoose-long')(mongoose)

var CenterSchema = new Schema({
  center_id: {
    type: Number,
    required: true,
    min: 0,
    max: 2147483647
  },
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
  }
}, { timestamps: true, versionKey: false })

module.exports = CenterSchema
