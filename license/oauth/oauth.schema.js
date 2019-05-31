const mongoose = require('mongoose')
const Schema = mongoose.Schema

/**
 * OAuthClient schema
 */
const OAuthClientSchema = new Schema({
  clientId: String,
  salt: String,
  clientSecret: String
})

module.exports = OAuthClientSchema
