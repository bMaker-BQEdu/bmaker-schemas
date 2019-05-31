const mongoose = require('mongoose')
const LicenseSchema = require('../license/license.schema')
const Schema = mongoose.Schema

/**
 * User schema
 */
const UserSchema = new Schema({
  firstName: {
    type: String,
    trim: true
  },
  lastName: {
    type: String,
    trim: true
  },
  username: {
    type: String,
    trim: true,
    validate: {
      validator: function (username) {
        /* Match an alphanumeric string, not just formed by numbers,
                that starts with letter and has at least 3 characters, 24 maximum */
        const regExp = /(?!^[0-9]+$)^[a-z0-9]{3,24}$/i // Flag 'i' for case insensitive
        return regExp.test(username)
      },
      message: 'Username can only contain alphanumeric characters (not all numbers), with a length from 3 to 24 characters.'
    },
    required: true
  },
  email: {
    type: String,
    lowercase: true,
    trim: true,
    validate: {
      validator: function (email) {
        /* Regular expression to check for valid email format.
                More info: http://emailregex.com/ */
        const regExp = /^(?=.{1,256}$)(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-z\-0-9]+\.)+[a-z]{2,}))$/i
        return regExp.test(email) || (this.isUnderaged() && !this.properties.isVIP)
      },
      message: 'Email format is invalid'
    },
    required: [function () {
      return !this.isUnderaged() || this.properties.isVIP
    }, 'Email is required for students over 14'],
  },
  password: {
    type: String,
    required: true
  },
  salt: String,
  tutor: {
    dni: String,
    name: String,
    email: String,
    validation: {
      date: Date,
      result: Boolean
    },
    conditionsAndPrivacyPolicyAccepted: Boolean
  },
  birthday: {
    type: Date,
    required: function () {
      return !this.properties.isVIP // Not required for VIP users
    }
  },
  language: {
    type: String,
    default: 'es-ES'
  },
  properties: {
    newsletter: {
      type: Boolean,
      default: false
    },
    cookiePolicyAccepted: Boolean,
    needValidation: Boolean,
    anonymous: String,
    isVIP: Boolean,
    conditionsAndPrivacyPolicyAccepted: {
      type: Boolean,
      validate: {
        validator: function (accepted) {
          return accepted
        },
        message: 'Need to accept the privacy policy and conditions'
      },
      required: [true, 'Need to accept the privacy policy and conditions']
    }
  },
  licenses: [LicenseSchema],
  deactivatedLicenses: [LicenseSchema],
  role: {
    type: String,
    enum: ['student', 'teacher'],
    required: true
  },
  centers: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Center'
    }
  ],
  selectedCenter: {
    type: Schema.Types.ObjectId,
    ref: 'Center'
  },
  totalStars: {
    type: Number,
    default: 0
  },
  avatar: {
    type: String
  },
  poll: {
    type: Object
  },
  deleted: Boolean
}, { timestamps: true })

module.exports = UserSchema
