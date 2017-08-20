let mongoose = require('mongoose');
let debug = require('debug')('app-db');
let utils = require('./utils');

const CONFIG = utils.getConfig.database;
const dbUri = utils.getDatabaseUri(CONFIG);

mongoose.Promise = global.Promise;

require('../schemas'); // add all schemas

let dbConnection = mongoose.connect(dbUri, CONFIG.options)
    .then(() => debug('Connected to db @', dbUri, CONFIG.options))
    .catch(console.error);

module.exports = dbConnection;

