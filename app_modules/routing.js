const err = require('http-errors');
const middlewares = require('../middlewares');
const endpoint = require('./endpoint');

function routing (app) {
    app.get('/query', [
        middlewares.query.validate,
        middlewares.jwt.validate,
        middlewares.query.search,
    ], endpoint.jsonResponse);

    app.use((req, res, next) => {
        throw err(404, 'not found');
    });

    app.use(endpoint.errorHandler);
}

module.exports = routing;