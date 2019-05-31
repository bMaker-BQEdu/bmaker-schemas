const mongoose = require('mongoose')
const LabSchema = require('../lab/lab.schema')
const Schema = mongoose.Schema

/**
 * Logbook schema
 */
const LogbookSchema = new Schema({
  lab: LabSchema,
  classroom: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'Classroom'
  },
  center: {
    type: Schema.Types.ObjectId,
    ref: 'Center'
  },
  deleted: Boolean
}, { timestamps: true })

module.exports = LogbookSchema
