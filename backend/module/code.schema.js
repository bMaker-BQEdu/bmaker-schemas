const mongoose = require('mongoose')
const Schema = mongoose.Schema

/**
 * CodeHtml schema
 */
const CodeHtmlSchema = new Schema({
  _id: false,
  type: {
    type: String,
    enum: ['html', 'css', 'js', 'preview'],
    required: true
  },
  code: {
    type: String,
    required: [function () {
      return this.type === 'html' || this.type === 'css' || this.type === 'js' ? true : false
    }, 'Field "code" is required when type is "html" or "css"']
  },
  hide: {
    type: Boolean,
    default: false,
    validate: {
      validator: function () {
        return this.type === 'preview' && this.hide || this.type === 'js' && !this.hide ? false : true
      },
      message: 'Field "hide" can not be true when type is "preview" or field "hide" can be true when type is "js"'
    },
  },
  self: {
    type: Boolean,
    validate: {
      validator: function () {
        return this.type !== 'html' && this.self === true ? false : true
      },
      message: 'Field "self" can not be true when type is not "html"'
    },
  }
})

/**
 * CodesHtml schema
 */
const CodesHtmlSchema = new Schema({
  _id: false,
  category: {
    type: String,
    default: 'html'
  },
  code: {
    type: [CodeHtmlSchema]
  }
})

module.exports = {
  CodeHtmlSchema: CodeHtmlSchema,
  CodesHtmlSchema: CodesHtmlSchema
}
