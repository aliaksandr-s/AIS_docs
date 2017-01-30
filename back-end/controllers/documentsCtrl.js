const path = require('path');

const config = require('../config/configApp')
const DocumentsManager = require('../BLL/documentsManager').DocumentsManager;
const ErrorsKeeper = require('../helpers/errorsKeeper').ErrorsKeeper;
const ServerResponse = require('../helpers/serverResponse').ServerResponse;

let _errSettings, _responseSettings;

class DocumentsCtrl {
    static getAllDocuments(req, res) {
        _responseSettings = DocumentsManager.getAllDocuments()
            .then((settings) => {
                ServerResponse.setResponseSettings(settings);
                ServerResponse.sendJSONresponse(res);
            });
    }

    static getUserDocuments(req, res) {
        if (!req.params.userId) {
            _errSettings = ErrorsKeeper.getUserIdRequiredErrSettings();
            ServerResponse.setResponseSettings(_errSettings);
            ServerResponse.sendJSONresponse(res);
            return;
        }

        const userId = req.params.userId;

        _responseSettings = DocumentsManager.getUserDocuments(userId)
            .then((settings) => {
                ServerResponse.setResponseSettings(settings);
                ServerResponse.sendJSONresponse(res);
            });
    }

    static uploadDocument(req, res) {
        _responseSettings = DocumentsManager.uploadDocument(req)
            .then((settings) => {
                ServerResponse.setResponseSettings(settings);
                ServerResponse.sendJSONresponse(res);
            });
    }

    static downloadDocument(req, res) {
        const filePath = req.params.userId + '/' + req.params.docName;

        const options = {
            root: config.UPLOAD_FOLDER + '/',
            headers: {
                "file-name": req.params.docName
            }
        }

        ServerResponse.sendFile(res, filePath, options);
    }
}

module.exports.DocumentsCtrl = DocumentsCtrl;