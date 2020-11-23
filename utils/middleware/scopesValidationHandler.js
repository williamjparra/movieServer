const boom = require('@hapi/boom')

function scopesValidationHandler(allowedScopes) {
    return function(req, res, next) {
        if(!req.user || (req.user && !req.user.scopes)) {
            next(boom.unauthorized('Missin scopes'))
        }

        const hasAcces = allowedScopes
        .map(allowedScopes => req.user.scopes.includes(allowedScopes))
        .find(allowed => Boolean(allowed))

        if(hasAcces) {
            next()
        }

        else {
            next(boom.unauthorized('Insufficient scoopes'))
        }
    }
}

module.exports = scopesValidationHandler