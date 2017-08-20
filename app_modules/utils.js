module.exports = {
    getConfig: getConfig(),
    getDatabaseUri,
    getSecret,
}

function getConfig () {
    let CONFIG = require('../defaults.json');
    let env = process.env;

    if (env.PORT) {
        CONFIG.express.port = env.PORT;
    }
    if (env.DB_HOST) {
        CONFIG.database.host = env.DB_HOST;
    }
    if (env.DB_PORT) {
        CONFIG.database.port = env.DB_PORT;
    }
    if (env.SECRET) {
        CONFIG.app.secret = env.SECRET;
    }

    return CONFIG;
}

function getDatabaseUri (config) {
    return `${config.host}:${config.port}/${config.dbname}`
}

function getSecret (config) {
    return config.app.secret;
}

