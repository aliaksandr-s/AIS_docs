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
}

module.exports.ServerResponse = ServerResponse;