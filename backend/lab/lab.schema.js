const mongoose = require('mongoose')
const Schema = mongoose.Schema

/**
 * Lab schema
 */
const LabSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  submitter: { // User that submitted the lab
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  project: {
    type: Schema.Types.ObjectId,
    ref: 'Project',
    required: true
  },
  classroom: {
    type: Schema.Types.ObjectId,
    ref: 'Classroom',
    required: true
  },
  title: {
    type: String,
    validate: {
      validator: function () {
        return this.title.length <= 60
      },
      message: 'Field `title` cannot be longer than 60 characters.'
    },
    required: true
  },
  file: {
    name: String,
    url: String
  },
  comment: {
    type: String,
    validate: {
      validator: function () {
        return this.comment.length <= 240
      },
      message: 'Field `comment` cannot be longer than 240 characters.'
    }
  },
  remark: {
    teacher: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    text: String
  },
  deleted: Boolean
}, { timestamps: true })

module.exports = LabSchema
