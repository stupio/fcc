const express = require('express');
const routing = require('./routing');
const db = require('./database');
const utils = require('./utils');
const debug = require('debug')('app-express');

const app = express();
const CONFIG = utils.getConfig.express;

routing(app);

db.then(() => {
    app.listen(CONFIG.port || 3000, () => {
        debug('app is running on port', CONFIG.port);
    });
})

module.exports = app;
