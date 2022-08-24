/**
 * This file contain password base authentication for editor users
 *
 * Users and passwords are stored in editorUsers file with bcrypt encryption
 * Any change to the editorUsers file will be taken into account at the next login.
 *
 * This authentication scheme is loaded when environment variable NODE_RED_SET_EDITOR_USERS_BY_FILE
 * is set to true.
 * File is stored in /data/auth/editor_users.txt file by default. You can update the location
 * by setting the variable NODE_RED_EDITOR_USERS_FILE to your location.
 * E.g. NODE_RED_EDITOR_USERS_FILE=/data/myusers.txt
 *
 * Expected file format:
[
  {
    "username": "admin",
    "password": "$2b$08XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
    "permissions": ["*"]
  },
  {
    "username": "writer",
    "password": "$2b$08XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
    "permissions": ["read","flows.write","nodes.read"]
  },
  {
    "username": "reader",
    "password": "$2b$08XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
    "permissions": ["read"]
  }
]
 *
 * About the right, see https://nodered.org/docs/user-guide/runtime/securing-node-red#usernamepassword-based-authentication
 * To get the bcrypt hash of a password, see https://nodered.org/docs/user-guide/runtime/securing-node-red#generating-the-password-hash
 *
 **/

const fs = require('fs');
try {
  bcrypt = require('bcrypt');
}
catch(e) {
    bcrypt = require('bcryptjs');
}

const NODE_RED_DEFAULT_EDITOR_USERS_FILE = '/data/auth/editor_users.txt'

function getuser(username, password, checkpassword) {
    var user = null
    var userFile = process.env.NODE_RED_EDITOR_USERS_FILE || NODE_RED_DEFAULT_EDITOR_USERS_FILE
    try {
        const data = fs.readFileSync(userFile, 'utf8');
        const users = JSON.parse(data)
        users.forEach(u => {
            if (u.username === username && (checkpassword === false || bcrypt.compareSync(password, u.password))) {
                user = { username: u.username, permissions: u.permissions };
            }
        });
    } catch(err) {
        console.error(err)
    }
    return user
}

module.exports = {
    type: "credentials",
    users: function(username) {
        return new Promise(function(resolve) {
            resolve(getuser(username, undefined, false));
        });
    },
    authenticate: function(username,password) {
        return new Promise(function(resolve) {
            resolve(getuser(username, password, true))
        });
    },
    default: function() {
        return new Promise(function(resolve) {
            // Resolve with the user object for the default user.
            // If no default user exists, resolve with null.
            //resolve({anonymous: true, permissions:"read"});
            resolve(getuser('default', undefined, false));
        });
    }
}
