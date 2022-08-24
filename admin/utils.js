/**
 * Utilitary functions for node management
 *
 **/

module.exports = {
    envParmToUser: function(envparm) {
        const rexp = /^([^:]+):(.+)$/
        var auth = rexp.exec(process.env[envparm])
        if (!auth)
            throw new Error(`${envparm} is not defined or value is incorrect`)
        user = auth[1]
        password = auth[2]
        authString = {user: user,pass: password}
        return authString
    }
}
