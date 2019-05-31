const mongoose = require('mongoose')
const Module = require('../module/module.schema')
const Schema = mongoose.Schema

/**
 * Slide schema
 */
const SlideSchema = new Schema({
  title: {
    type: String,
    validate: {
      validator: function() {
        return this.layout !== 'full'
      },
      message: 'Field `title` cannot be provided for a full slide.'
    }
  },
  description: {
    type: String,
    validate: {
      validator: function() {
        return this.layout !== 'full'
      },
      message: 'Field `description` cannot be provided for a full slide.'
    }
  },
  statement: {
    type: Module.StatementSchema,
    validate: [{
      validator: function() {
        return this.layout !== 'full'
      },
      message: 'Field `statement` cannot be provided for a full slide.'
    },
    {
      validator: function() {
        return !this.description
      },
      message: 'Field `statement` cannot be provided alongside `description`.'
    }]
  },
  layout: {
    type: String,
    enum: ['50', '66', '100', 'full'],
    required: true,
    validate: [{
      validator: function correctNumberOfModules(layout) {
        let bool = true
        switch(layout) {
        case '50':
        case '66':
          if (this.modules.length != 2) {
            bool = false
          }
          break
        case '100':
        case 'full':
          if (this.modules.length != 1) {
            bool = false
          }
        }
        return bool
      },
      message: 'The number of modules does not correspond to this slide layout'
    },
    {
      validator: function correctTypeOfModules(layout) {
        let bool = true
        this.modules.some(function(item){
          switch (item.category) {
          case 'steps':
          case 'sequential':
            if (layout !== '66') bool = false
            return true
          case 'upload':
          case 'activity':
          case 'infographics':
            if (layout !== '100') bool = false
            return true
          case 'context':
            if (layout !== 'full') bool = false
            return true
          case 'static':
            if (item.type === 'animation' && layout !== 'full'){
              bool = false
              return true
            }
          }
          return false
        })
        return bool
      },
      message: 'These modules are not allowed in this slide layout'
    }]
  },
  modules: {
    type: [ Module.ModuleSchema ],
    validate: {
      validator: function validStepsSlide(modules) {
        const steps = modules.some(function(item){
          return item.category === 'steps'
        })
        if (steps) {
          return modules.every(function(item){ return item.category === 'steps' })
        }
      },
      message: 'Slides with steps modules need 2 steps modules'
    }
  },
  icon: String,
  helpers: {
    type: {
      suggestionForTeacher: String,
      groupHelpForTeacher: String,
      hint: String,
      recall: String
    },
    validate: {
      validator: function() {
        return this.layout !== 'full'
      },
      message: 'Field `helpers` cannot be provided for a full slide'
    }
  },
  deleted: Boolean
}, { timestamps: true, setDefaultsOnInsert: true })

module.exports = SlideSchema
