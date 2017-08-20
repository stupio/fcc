function jsonResponse(req, res) {
    res.status(200).send(res.searchData);
}

function errorHandler(err, req, res, next) {
    res.status(err.status);
    res.send({
        error: true,
        message: err.message,
        code: err.status,
    });
}

module.exports = {
    jsonResponse,
    errorHandler,
}