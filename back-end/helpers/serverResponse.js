let _status, _content;

class ServerResponse {
    constructor() {}

    static setResponseSettings(responseSettings) {
        _status = responseSettings && responseSettings.status;
        _content = responseSettings && responseSettings.content;
    }

    static sendJSONresponse(res) {
        res.status(_status);
        res.json(_content);
    }
}

module.exports.ServerResponse = ServerResponse;