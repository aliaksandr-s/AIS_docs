const configApp = {
    //dbURI: 'mongodb://mongo:27017/ais-docs',  // prod
    dbURI: 'mongodb://localhost:27017/ais-docs', // dev
    UPLOAD_FOLDER: './uploads',
    sendJSONresponse: function(res, status, content) {
        res.status(status);
        res.json(content);
    }
};

module.exports = configApp