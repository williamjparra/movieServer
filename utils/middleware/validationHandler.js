const Boom = require('@hapi/boom')
const joi = require('@hapi/joi')

function validate(data, schema) {
    const { error } = joi.object(schema).validate(data);
    return error;
}

function validationHandler (schema, check = 'body') {
    return function(req, res, next) {
        const error = validate(req[check], schema);

        error ? next(Boom.badRequest(error)) : next()
    };
}

module.exports =  validationHandler
