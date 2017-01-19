const configApp = {
    dbURI: 'mongodb://mongo:27017/ais-docs',
    UPLOAD_FOLDER: './uploads',
    sendJSONresponse: function (res, status, content) {
        res.status(status);
        res.json(content);
    }
};

module.exports = configApp