/**
 * This file contains a user generator for http nodes and static resources auth
 *
 * User and password are defined by setting NODE_RED_HTTP_NODE_USER and NODE_RED_HTTP_NODE_STATIC_USER env parms
 * Expected format is <user>:<encrypted password>
 * In docker-compose.yml files:
 *  - do not include quote around values
*   - double all '$' signs
 *
 **/

module.exports = {
    getHttpNodeUser: function() {
        return require('../utils.js').envParmToUser('NODE_RED_HTTP_NODE_USER')
    },
    getHttpStaticUser: function() {
        return require('../utils.js').envParmToUser('NODE_RED_HTTP_STATIC_USER')
    }
}
