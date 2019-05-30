var mongoose = require('mongoose')
var Schema = mongoose.Schema

var OAuthClientSchema = new Schema({
  clientId: String,
  salt: String,
  clientSecret: String
})

module.exports = OAuthClientSchema
