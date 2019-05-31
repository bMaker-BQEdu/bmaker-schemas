const mongoose = require('mongoose')
const Schema = mongoose.Schema
const { CodeHtmlSchema } = require('../module/code.schema')
const _ = require('lodash')

const options = {
  _id: false,
  discriminatorKey: 'type',
  setDefaultsOnInsert: true
}

/**
 * Activiy schema
 */
const ActivitySchema = new Schema({
  type: {
    type: String,
    enum: ['dragAndDrop', 'test', 'links', 'memory'],
    validate: {
      validator: function (string) {
        switch (string) {
        case 'dragAndDrop':
        case 'test':
        case 'links':
        case 'memory':
          return true
        default:
          return false
        }
      },
      message: 'Bad enum'
    },
    required: true
  },
  maxStars: {
    type: Number,
    default: 3
  },
  solution: {
    type: Schema.Types.Mixed,
    required: true
  }
}, options)

/**
 * Discriminators
 * DragAndDrop schema
 */
const DragAndDropSchema = new Schema({
  svg: {
    type: String,
    required: true
  },
  draggables: {
    type: [{
      _id: false,
      dragId: {
        type: String,
        required: true
      },
      content: {
        type: String,
        required: true
      },
      top: {
        type: Number,
        required: true
      },
      left: {
        type: Number,
        required: true
      }
    }],
    required: true
  },
  droppables: {
    type: [{
      _id: false,
      dropId: {
        type: String,
        required: true
      },
      top: {
        type: Number,
        required: true
      },
      left: {
        type: Number,
        required: true
      }
    }],
    required: true
  },
  elementsSize: {
    width: {
      type: Number,
      required: true,
    },
    height: {
      type: Number,
      requried: true
    }
  }
  // Solution schema should be { "dropId": "dragId" }
}, options)

/**
 * Discriminators
 * Test schema
 */
const TestSchema = new Schema({
  questions: {
    type: [
      {
        _id: false,
        questionId: {
          type: String,
          required: true
        },
        content: {
          type: String,
          required: true
        },
        answers: {
          type: [
            {
              _id: false,
              answerId: {
                type: String,
                required: true
              },
              content: {
                type: String,
                required: true
              }
            }
          ],
          validate: {
            validator: function (answers) {
              return _.uniqBy(answers, 'answerId').length === answers.length
            },
            message: 'All answers from a question must have unique IDs'
          },
          required: true
        }
      }
    ],
    validate: {
      validator: function (questions) {
        return _.uniqBy(questions, 'questionId').length === questions.length
      },
      message: 'All questions must have unique IDs'
    },
    required: true
  },
  image: {
    type: String, // URL of the image (optional)
    validate: {
      validator: function () {
        return this.image && this.codes.length > 0 ? false : true
      },
      message: 'There can not be a test activity with the "image" and "codes" fields at the same time'
    },
  },
  maxAnswers: Number,
  codes: {
    type: [CodeHtmlSchema]
  }
  // Solution schema should be { "questionId":  ["answerId"] }
}, options)

/**
 * Discriminators
 * Links schema
 */
const LinksSchema = new Schema({
  leftColumn: {
    type: {
      _id: false,
      size: {
        type: String,
        enum: ['sm', 'md', 'lg'],
        required: true
      },
      elements: {
        type: [
          {
            _id: false,
            linkId: {
              type: String,
              required: true
            },
            content: {
              type: String,
              required: true
            },
            image: {
              type: String // URL of the image (optional)
            }
          }
        ],
        required: true
      }
    },
    required: true
  },
  rightColumn: {
    type: {
      _id: false,
      size: {
        type: String,
        enum: ['sm', 'md', 'lg'],
        required: true
      },
      elements: {
        type: [
          {
            _id: false,
            linkId: {
              type: String,
              required: true
            },
            content: {
              type: String,
              required: true
            },
            image: {
              type: String
            }
          }
        ],
        required: true
      }
    },
    required: true
  },
  // Solution schema should be { "leftLinkId": "rightLinkId" }
}, options)

/**
 * Discriminators
 * Memory schema
 */
const MemorySchema = new Schema({
  // Schema
  cards: {
    type: Array,
    required: true
  },
  time: {
    type: Number,
    required: true
  },
  maxAnswers: Number
}, options)


module.exports = {
  ActivitySchema: ActivitySchema,
  DragAndDropActivitySchema: DragAndDropSchema,
  TestActivitySchema: TestSchema,
  LinksActivitySchema: LinksSchema,
  MemoryActivitySchema: MemorySchema
}
