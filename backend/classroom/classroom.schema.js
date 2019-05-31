const mongoose = require('mongoose')
const Schema = mongoose.Schema
const LicenseSchema = require('../license/license.schema')

/**
 * Classroom schema
 */
const ClassroomSchema = new Schema({
  teacher: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  name: {
    type: String,
    validate: {
      validator: function (name) { return name.length <= 60 },
      message: 'Classroom name can have a maximum of 60 characters'
    },
    required: true
  },
  license: {
    type: LicenseSchema,
    required: true
  },
  center: {
    type: Schema.Types.ObjectId,
    ref: 'Center'
  },
  projects: {
    type: [{
      _id: {
        type: Schema.Types.ObjectId,
        required: true
      },
      number: {
        type: Number,
        required: true
      },
      title: {
        type: String,
        required: true
      },
      level: {
        _id: {
          type: Schema.Types.ObjectId,
          required: true
        },
        number: {
          type: Number,
          required: true
        },
        title: {
          type: String,
          required: true
        },
        difficulty: {
          type: String
        }
      },
      isBlocked: {
        type: Boolean,
        default: true
      }
    }],
    required: true
  },
  levels: {
    type: [{
      _id: Schema.Types.ObjectId,
      number: Number,
      difficulty: String,
      title: String
    }],
    required: true
  },
  isOpen: {
    type: Boolean,
    default: true
  },
  image: String,
  PIN: {
    uppercase: true,
    type: String
  },
  students: [ Schema.Types.ObjectId ],
  waitList: [ Schema.Types.ObjectId ],
  blockedStudents: [ Schema.Types.ObjectId ],
  archived: Boolean,
  deleted: Boolean
}, { timestamps: true })

module.exports = ClassroomSchema
