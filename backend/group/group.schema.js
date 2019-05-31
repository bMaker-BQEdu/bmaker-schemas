const mongoose = require('mongoose')
const Schema = mongoose.Schema

/**
 * Group schema
 */
const GroupSchema = new Schema({
  users: {
    type: [{
      type: Schema.Types.ObjectId,
      ref: 'User'
    }],
    required: true,
    validate: {
      validator: function () {
        return this.users.length > 0 && this.users.length <= 2
      },
      message: 'Groups can only be formed by 1 or 2 students'
    }
  },
  classroom: {
    type: Schema.Types.ObjectId,
    ref: 'Classroom',
    required: true
  },
  deleted: Boolean
}, { timestamps: true })

module.exports = GroupSchema
