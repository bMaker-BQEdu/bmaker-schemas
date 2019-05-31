const mongoose = require('mongoose')
const Schema = mongoose.Schema

/**
 * Level schema
 */
const LevelSchema = new Schema({
  title: {
    type: String,
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
  language: String,
  difficulty: {
    type: String,
    enum: ['basic', 'intermediate', 'advanced'],
    required: true
  },
  description: String,
  deleted: Boolean
}, { timestamps: true })

module.exports = LevelSchema
