let _status, _content;

class ServerResponse {
    static setResponseSettings(responseSettings) {
        _status = responseSettings.status;
        _content = responseSettings.content;
    }

    static sendJSONresponse(res) {
        res.status(_status);
        res.json(_content);
    }

    static sendFile(res, filePath, options) {
        res.sendFile(filePath, options, function (err) {
            if (err) {
                console.log(err);
                res.status(err.status).end();
            }
        });
    }
}

module.exports.ServerResponse = ServerResponse;