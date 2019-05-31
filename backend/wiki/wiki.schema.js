const mongoose = require('mongoose')
const Schema = mongoose.Schema

const options = {
  _id: false,
  discriminatorKey: 'wikitype'
}

/**
 * Section schema
 */
const SectionSchema = Schema({
  wikitype: {
    type: String,
    enum: ['media', 'text', 'list', 'title', 'hr', 'download'],
    required: true
  },
  title: String,
  subtitle: String,
}, options)

/**
 * MediaSection schema
 */
const MediaSectionSchema = Schema({
  media: {
    type: String,
    required: true
  },
  border: {
    type: Boolean,
    default: true
  },
  footer: String
}, options)

/**
 * TextSection schema
 */
const TextSectionSchema = Schema({
  text: {
    type: [String],
    required: true
  }
}, options)

/**
 * HrSection schema
 */
const HrSectionSchema = Schema({
  text: {
    type: [String],
    required: true
  }
}, options)

/**
 * ListSection schema
 */
const ListSectionSchema = Schema({
  list: {
    type: [String],
    required: true
  },
  preDescription: [String],
  postDescription: [String],
  listType: {
    type: String,
    default: 'discs',
    enum: ['numbers', 'discs'],
    validate: {
      validator: function (string) {
        switch (string) {
        case 'numbers':
        case 'discs':
          return true
        default:
          return false
        }
      },
      message: 'Bad enum. Use \'discs\' or \'points\''
    },
    required: true
  }
}, options)

/**
 * DownloadSection schema
 */
const DownloadSectionSchema = Schema({
  name: {
    type: String,
    required: true
  },
  link: {
    type: String,
    required: true
  }
}, options)

/**
 * SectionArray schema
 */
const SectionArraySchema = new Schema({
  modules: [ SectionSchema ]
}, { _id: false })

/**
 * Wiki schema
 */
const WikiSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  band: {
    type: Boolean,
    required: true
  },
  ref: {
    type: String,
    required: true,
    unique: true
  },
  order: {
    category: Number,
    article: Number
  },
  sections: [ SectionArraySchema ],
  categories: {
    type: [String],
    required: true
  },
  subcategories: {
    type: [String],
    required: true
  },
  description: {
    type: String,
    required: true
  },
  thumbnail: {
    type: String,
    required: true
  },
  deleted: Boolean
}, { timestamps: true, versionKey: false })

module.exports = {
  SectionSchema: SectionSchema,
  MediaSectionSchema: MediaSectionSchema,
  TextSectionSchema: TextSectionSchema,
  HrSectionSchema: HrSectionSchema,
  ListSectionSchema: ListSectionSchema,
  DownloadSectionSchema: DownloadSectionSchema,
  SectionArraySchema: SectionArraySchema,
  WikiSchema: WikiSchema
}
