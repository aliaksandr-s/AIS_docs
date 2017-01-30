const fs = require('fs');
const path = require('path');
const co = require('co');
const formidable = require('formidable');

const config = require('../config/configApp')
const sendJSONresponse = require('../config/configApp.js').sendJSONresponse;
const Document = require('../models/document').Document;
const ErrorsKeeper = require('../helpers/errorsKeeper').ErrorsKeeper;
const DocumentsRepository = require('../DAL/documentsRepository').DocumentsRepository;
let _responseSettings = {
    status: 0,
    content: null
};

class DocumentsManager {
    static getAllDocuments() {
        return co(function* () {
            const allDocuments = yield DocumentsRepository.getAllDocuments();

            return {
                status: 200,
                content: {
                    allDocuments: allDocuments
                }
            };
        }).catch((err) => {
            console.log(err.stack);

            return ErrorsKeeper.getServerErrSettings();
        });
    }

    static getUserDocuments(userId) {
        return co(function* () {
            const userDocuments = yield DocumentsRepository.getUserDocuments(userId);

            if (!userDocuments) {
                _responseSettings.status = 404;
                _responseSettings.content = {
                    message: 'Not found'
                }
            } else {
                _responseSettings.status = 200;
                _responseSettings.content = {
                    userDocuments: userDocuments
                }
            }

            return _responseSettings;
        }).catch((err) => {
            console.log(err.stack);

            sendJSONresponse(res, 500, {
                message: 'Internal Server Error'
            })
        });
    }

    static uploadDocument(req) {
        return new Promise(function (resolve, reject) {
            const form = new formidable.IncomingForm();

            form.multiples = true;
            form.uploadDir = config.UPLOAD_FOLDER;

            form.parse(req, function (err, fields, files) {
                const userId = fields.id;
                const url = path.join(form.uploadDir, userId, files.file.name);

                fs.renameSync(files.file.path, url); // moves file to a user folder

                const documentSettings = {
                    name: files.file.name,
                    date: new Date(),
                    status: 'new',
                    url: url
                };
                const document = new Document(documentSettings);

                co(function* () {
                    yield DocumentsRepository.uploadDocument(userId, document);

                    resolve({
                        status: 200,
                        content: {
                            message: 'Uploaded'
                        }
                    });
                }).catch((err) => {
                    console.log(err.stack);

                    return ErrorsKeeper.getServerErrSettings();
                });;
            });
        });
    }
}

module.exports.DocumentsManager = DocumentsManager;