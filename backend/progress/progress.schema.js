const mongoose = require('mongoose')
const Schema = mongoose.Schema

const options = {
  discriminatorKey: 'kind',
  timestamps: true
}

/**
 * BaseProgress schema
 */
const BaseProgressSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  classroom: {
    type: Schema.Types.ObjectId,
    ref: 'Classroom',
    required: true
  },
  project: {
    type: Schema.Types.ObjectId,
    ref: 'Project',
    required: true
  },
  kind: {
    type: String,
    enum: [ 'session', 'item' ],
    required: true
  },
  deleted: Boolean
}, options)

/**
 * SessionProgress schema
 */
const SessionProgressSchema = new Schema({
  session: {
    type: Schema.Types.ObjectId,
    ref: 'Session',
    required: true
  },
  slides: {
    type: [ Schema.Types.ObjectId ]
  },
  stars: {
    type: Number,
    default: 0
  },
  completed: Boolean
}, options)

/**
 * ActivityProgress schema
 */
const ActivityProgressSchema = new Schema({
  slide: {
    type: Schema.Types.ObjectId,
    ref: 'Session.slide',
    required: true
  },
  session: {
    type: Schema.Types.ObjectId,
    ref: 'Session',
    required: true
  },
  number: {
    type: Number,
    validate: {
      validator: function(num) { return num > 0 },
      message: 'Activity `number` must be greater than 0.'
    },
    required: true
  },
  attempts: {
    type: Number,
    validate: {
      validator: function(num) { return num > 0 },
      message: 'Activity `attempts` must be greater 0.'
    },
    default: 0
  },
  stars: {
    type: Number,
    validate: {
      validator: function(num) { return num >= 0 },
      message: 'Activity `stars` must be greater or equal 0.'
    }
  }
}, { _id: false })

/**
 * Rubric schema
 */
const RubricProgressSchema = new Schema({
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
          performances: [String],
          score: Number
        }
      ]
    }
  ]
}, { _id: false })

/**
 * Evaluation schema
 */
const EvaluationProgressSchema = new Schema({
  questions : [
    {
      text: String,
      answers: [{
        type: String,
        trim: true
      }],
      answerPlaceholders: [String]    // Can be more than 1 answer per question
    }
  ]
}, { _id: false })

/**
 * ItemProgress schema
 */
const ItemProgressSchema = new Schema({
  lab: {
    type: Schema.Types.ObjectId,
    ref: 'Lab',
    validate: {
      validator: function() { return !this.evaluation && !this.activity && !this.rubric},
      message: 'Must provide either `lab`, `evaluation`, `rubric` or `activity`'
    }
  },
  evaluation: {
    type: EvaluationProgressSchema,
    validate: {
      validator: function() { return !this.lab && !this.activity && !this.rubric},
      message: 'Must provide either `lab`, `evaluation`, `rubric` or `activity`'
    }
  },
  activity: {
    type: ActivityProgressSchema,
    validate: {
      validator: function() { return !this.evaluation && !this.lab && !this.rubric},
      message: 'Must provide either `lab`, `evaluation`, `rubric` or `activity`'
    }
  },
  rubric: {
    type: RubricProgressSchema,
    validate: {
      validator: function() { return !this.evaluation && !this.lab && !this.activity},
      message: 'Must provide either `lab`, `evaluation`, `rubric` or `activity`'
    }
  }
}, options)


module.exports = {
  BaseProgressSchema: BaseProgressSchema,
  SessionProgressSchema: SessionProgressSchema,
  ActivityProgressSchema: ActivityProgressSchema,
  RubricProgressSchema: RubricProgressSchema,
  EvaluationProgressSchema: EvaluationProgressSchema,
  ItemProgressSchema: ItemProgressSchema
}
