/**
 * This file merges specific settings files based on environment variables
 *
**/

const nodeRedEditorUsersJs = '/admin/auth/editor_users.js'
if (process.env.NODE_RED_SET_EDITOR_USERS_BY_FILE && !/^false$/i.test(process.env.NODE_RED_SET_EDITOR_USERS_BY_FILE)) {
  module.exports.adminAuth = require(process.env.NODE_RED_EDITOR_USERS_CUSTOM_JS || nodeRedEditorUsersJs)
}

const nodeRedCredentialSecretJs = '/admin/credential_secret.js'
if (process.env.NODE_RED_CREDENTIAL_SECRET && !/^\s*$/i.test(process.env.NODE_RED_CREDENTIAL_SECRET)) {
  module.exports.credentialSecret = require(process.env.NODE_RED_CREDENTIAL_SECRET_CUSTOM_JS || nodeRedCredentialSecretJs).getCredentialSecret()
}

const nodeRedHttpNodeAuthJs = '/admin/auth/http_basic_auth.js'
if (process.env.NODE_RED_HTTP_NODE_USER && !/^\s*$/i.test(process.env.NODE_RED_HTTP_NODE_USER)) {
  module.exports.httpNodeAuth = require(process.env.NODE_RED_HTTP_NODE_AUTH_CUSTOM_JS || nodeRedHttpNodeAuthJs).getHttpNodeUser()
}

const nodeRedHttpStaticAuthJs = '/admin/auth/http_basic_auth.js'
if (process.env.NODE_RED_HTTP_STATIC_USER && !/^\s*$/i.test(process.env.NODE_RED_HTTP_STATIC_USER)) {
  module.exports.httpStaticAuth = require(process.env.NODE_RED_HTTP_STATIC_AUTH_CUSTOM_JS || nodeRedHttpStaticAuthJs).getHttpStaticUser()
}
