const mongoose = require('mongoose');
const err = require('http-errors');
const debug = require('debug')('app-mw-query');

function validate (req, res, next) {
    const { lat, lon } = req.query;
    const regex = /^[+-]?\d+(\.\d+)?$/; // match every int and float
    debug('validate coordinates:', lat, lon);

    if (!lat || !lon || !regex.test(lat) || !regex.test(lon)) {
        throw err(400, 'wrong coordinates values');
    }

    next();
}

function search (req, res, next) {
    const { lat, lon } = req.query;

    mongoose
        .models['antenna']
        .findAntennas(lat, lon)
        .then(data => { res.searchData = data; })
        .then(next);
}

module.exports = {
    validate,
    search,
}