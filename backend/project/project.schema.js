const mongoose = require('mongoose')
const Schema = mongoose.Schema

/**
 * Achievement schema
 */
const EvaluationFormSchema = new Schema({
  questions : [
    {
      text: String,
      answerPlaceholders: [String]    // Can be more than 1 answer per question
    }
  ]
})

/**
 * Rubric schema
 */
const RubricSchema = new Schema({
  evaluationCriteria : [
    {
      text: {
        type: String,
        required: true
      },
      learningStandards : [
        {
          text: {
            type: String,
            required: true
          },
          performances: [String]
        }
      ]
    }
  ]
})

/**
 * Project schema
 */
const ProjectSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  level: {
    type: Schema.Types.ObjectId,
    ref: 'Level',
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
  subject: {
    type: [String],
    required: true
  },
  description: String,
  tips: [String],
  goals: [[String]],
  syllabi: [[String]],
  thumbnail: String,
  dashboardImage: String,
  dashboardVideo: String,
  evaluationForm: EvaluationFormSchema,
  rubric: RubricSchema,
  isOpen: {
    type: Boolean,
    default: true
  },
  deleted: Boolean
}, { timestamps: true })

module.exports = {
  EvaluationFormSchema: EvaluationFormSchema,
  RubricSchema: RubricSchema,
  ProjectSchema: ProjectSchema
}
