const mongoose = require('mongoose')
const Schema = mongoose.Schema

/**
 * Achievement schema
 */
const AchievementSchema = new Schema({
  classroom: {
    type: Schema.Types.ObjectId,
    ref: 'Classroom',
    required: true
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  project: {
    type: Schema.Types.ObjectId,
    ref: 'Project'
  },
  stars: {
    type: Number,
    validate: {
      validator: function (num) { return num > 0 },
      message: 'Number of `stars` must be greater than 0.'
    },
    required: true
  },
  reason: {
    type: String,
    required: true
  },
  teacher: {
    type: Schema.Types.ObjectId,
    ref: 'Teacher'
  },
  deleted: Boolean
}, { timestamps: true })

module.exports = AchievementSchema
