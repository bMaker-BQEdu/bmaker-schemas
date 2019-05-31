const CenterLicenseSchema = require('./center/center.schema')
const ISBNSchema = require('./isbn/isbn.schema')
const LicenseSchema = require('./license/license.schema')
const OAuthClientSchema = require('./oauth/oauth.schema')

module.exports = {
  CenterLicenseSchema: CenterLicenseSchema,
  ISBNSchema: ISBNSchema,
  LicenseSchema: LicenseSchema,
  OAuthClientSchema: OAuthClientSchema
}
