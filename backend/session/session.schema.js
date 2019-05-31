const mongoose = require('mongoose')
const SlideSchema = require('../slide/slide.schema')
const Schema = mongoose.Schema

/**
 * Achievement schema
 */
const SessionSchema = new Schema({
  project: {
    type: Schema.Types.ObjectId,
    ref: 'Project',
    required: true
  },
  number: {
    type: Number,
    required: true,
    validate: {
      validator: function(n) {
        return n > 0
      },
      message: 'Number of the session must be a postive integer'
    }
  },
  slides: [ SlideSchema ],
  title: String,
  dashboardImage: String,
  description: String,
  deleted: Boolean
}, { timestamps: true })


module.exports = SessionSchema
