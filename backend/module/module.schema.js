const mongoose = require('mongoose')
const Schema = mongoose.Schema
const { ActivitySchema } = require('../activity/activity.schema')
const { CodeHtmlSchema, CodesHtmlSchema } = require('./code.schema')

const options = {
  _id: false,
  discriminatorKey: 'category',
  setDefaultsOnInsert: true
}

/**
 * Module schema
 */
const ModuleSchema = new Schema({
  category: {
    type: String,
    enum: ['static', 'experiment', 'steps', 'sequential', 'upload', 'activity', 'infographics', 'context', 'html'],
    required: true
  }
}, options)

/**
 * Discriminators
 * StaticModule schema
 */
const StaticModuleSchema = new Schema({
  type: {
    type: String,
    enum: ['text', 'text-btn', 'img', 'embed', 'video', 'animation', 'free'],
    required: true
  },
  content: {
    type: String,
    validate: {
      validator: function() {
        return (this.type !== 'video' && this.type !== 'animation')
      },
      message: 'Field "content" is not allowed for this type of static'
    },
    required: [ function() {
      return (this.type !== 'text-btn' && this.type !== 'video' && this.type !== 'animation' && this.type !== 'img' && !this.codeScratch)
    }, 'Field "content" is required for this type of static']
  },
  url: {
    type: String,
    validate: {
      validator: function() {
        return (this.type === 'text-btn' || this.type === 'video' || this.type === 'animation' || this.type === 'img')
      },
      message: 'Field "url" is not allowed for this type of static'
    },
    required: [ function() {
      return (this.type === 'text-btn' || this.type === 'video' || this.type === 'animation' || this.type === 'img')
    }, 'Field "url" is required for this type of static']
  },
  codeScratch: {
    type: String,
    validate: {
      validator: function() {
        return (this.type === 'embed')
      },
      message: 'Field "codeScratch" can only be provided for static type "embed"'
    },
    required: [ function() {
      return (this.type === 'embed' && !this.content)
    }, 'Field "codeScratch"  is only allowed for static type "embed"']
  },
  buttonLabel: {
    type: String,
    validate: {
      validator: function() {
        return this.type === 'text-btn'
      },
      message: 'Field "buttonLabel" is not allowed for this type of static'
    },
    required: [ function() {
      return this.type === 'text-btn'
    }, 'Field "buttonLabel" is required for this type of static']
  }
}, options)

/**
 * Discriminators
 * Statement schema
 */
const StatementSchema = new Schema({
  _id: false,
  content: {
    type: String,
    required: true
  },
  labels: {
    type: [{
      type: String,
      enum: [ 'appinventor', 'bitbloq', 'craft', 'css3', 'html5', 'interactive', 'javascript', 'scratch' ]
    }]
  },
  number: {
    type: Number,
    validate: {
      validator: function(num) { return num > 0 },
      message: 'Field `statement.number` must be greater than 0.'
    },
    required: true
  }
})

/**
 * Discriminators
 * Experiment schema
 */
const ExperimentSchema = new Schema({
  statement: {
    type: StatementSchema,
    required: true
  }
}, options)

/**
 * Discriminators
 * SequentialModule schema
 */
const SequentialModuleSchema = new Schema({
  statics: {
    type: [ StaticModuleSchema ],
    required: true
  }
}, options)

/**
 * Discriminators
 * Steps schema
 */
const StepsSchema = new Schema({
  statics: {
    type: [ StaticModuleSchema ],
    required: true
  },
  codes: {
    type: [ CodesHtmlSchema ]
  },
  enabledButtons: {
    type: Boolean,
    default: false
  }
}, options)

/**
 * Discriminators
 * Upload schema
 */
const UploadSchema = new Schema({
  textButton: String
}, options)

/**
 * Discriminators
 * Infographics schema
 */
const InfographicsSchema = new Schema({
  svg: {
    type: String,
    required: true
  },
  texts: {
    type: [ String ],
    required: true
  }
}, options)

/**
 * Discriminators
 * ActivityModule schema
 */
const ActivityModuleSchema = new Schema({
  activity: {
    type: ActivitySchema,
    required: true
  }
}, options)

/**
 * Discriminators
 * Context schema
 */
const ContextSchema = new Schema({
  image: {
    type: String,
    validate: {
      validator: function() {
        return !this.video
      },
      message: 'Field "image" is not allowed when providing "video"'
    },
    required: function () {
      return !this.video
    }
  },
  video: {
    type: String,
    validate: {
      validator: function() {
        return !this.image
      },
      message: 'Field "video" is not allowed when providing "image"'
    },
    required: function () {
      return !this.image
    },
  },
  content: {
    type: new Schema({
      _id: false,
      previous: {
        type: String,
        required: true
      },
      following: {
        type: String,
        required: true
      }
    }),
    validate: {
      validator: function() {
        return !this.video
      },
      message: 'Field "content" is not allowed when providing "video"'
    },
    required: [ function() {
      return !!this.image
    }, 'Field "content" is required when providing "image"']
  },
  align: {
    type: String,
    enum: [ 'left', 'right' ],
    validate: {
      validator: function() {
        return !this.video
      },
      message: 'Field "align" is not allowed when providing "video"'
    },
    required: [ function() {
      return !!this.image
    }, 'Field "align" is required when providing "image"']
  },
  contrast: {
    type: String,
    enum: [ 'positive', 'negative' ],
    validate: {
      validator: function() {
        return !this.video
      },
      message: 'Field "contrast" is not allowed when providing "video"'
    },
    required: [ function() {
      return !!this.image
    }, 'Field "contrast" is required when providing "image"']
  }
}, options)

/**
 * Discriminators
 * Html schema
 */
const HtmlSchema = new Schema({
  panel1: {
    type: [ CodeHtmlSchema ],
    required: true
  },
  panel2: {
    type: [ CodeHtmlSchema ],
    required: false
  }
}, options)

module.exports = {
  ModuleSchema: ModuleSchema,
  StaticModuleSchema: StaticModuleSchema,
  StatementSchema: StatementSchema,
  ExperimentSchema: ExperimentSchema,
  SequentialModuleSchema: SequentialModuleSchema,
  StepsSchema: StepsSchema,
  UploadSchema: UploadSchema,
  InfographicsSchema: InfographicsSchema,
  ActivityModuleSchema: ActivityModuleSchema,
  ContextSchema: ContextSchema,
  HtmlSchema: HtmlSchema
}
