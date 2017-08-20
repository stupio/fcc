const jwt = require('jsonwebtoken');
const err = require('http-errors');
const utils = require('../app_modules/utils');

const SECRET = utils.getSecret(utils.getConfig);

function validate (req, res, next) {
    let authorization = req.headers['authorization'];

    if (!authorization) {
        throw err(401, 'Authorization header required');
    }

    let [bearer, token] = authorization.split(' ');

    if (bearer !== 'Bearer') {
        throw err(400, 'Authorization Bearer required');
    }

    if (!token) {
        throw err(400, 'Authorization token required');
    }

    jwt.verify(token, SECRET, { algorithms: ["HS256"] }, (error, data) => {
        if (error) {
            return next(err(400, error.message));
        }
        req.tokenData = data; // adds decoded token to req variable for future purposes 
        next();
    });
}

module.exports = {
    validate,
}

