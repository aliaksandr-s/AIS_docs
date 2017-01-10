const configApp = {
    dbURI: 'mongodb://localhost/ais_docs_db',
    sendJSONresponse: function (res, status, content) {
        res.status(status);
        res.json(content);
    }
};

module.exports = configApp