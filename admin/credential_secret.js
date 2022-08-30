/**
 * This file contain generator for the credential secret
 *
 * Credential secret is defined by setting NODE_RED_CREDENTIAL_SECRET variable
 *
 **/

module.exports = {
    getCredentialSecret: function() {
        return process.env.NODE_RED_CREDENTIAL_SECRET
    }
}
