module.exports = {
    getConfig: getConfig(),
    getDatabaseUri,
    getSecret,
}

function getConfig () {
    let CONFIG = require('../defaults.json');
    let env = process.env;

    // overwrite defaults with env
    CONFIG.express.port = env.PORT || CONFIG.express.port;
    CONFIG.database.host = env.DB_HOST || CONFIG.database.host;
    CONFIG.database.port = env.DB_PORT || CONFIG.database.port;
    CONFIG.app.secret = env.SECRET || CONFIG.app.secret;

    return CONFIG;
}

function getDatabaseUri (config) {
    return `${config.host}:${config.port}/${config.dbname}`
}

function getSecret (config) {
    return config.app.secret;
}

