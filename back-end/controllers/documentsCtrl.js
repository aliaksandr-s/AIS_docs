const fs = require('fs');
const path = require('path');
const co = require('co');
const formidable = require('formidable');
const pmongo = require('promised-mongo');
const config = require('../config/configApp')
const db = pmongo(config.dbURI);
const sendJSONresponse = require('../config/configApp.js').sendJSONresponse;
const Document = require('../models/document').Document;

module.exports.uploadDocument = (req, res) => {
    let form = new formidable.IncomingForm();

    form.multiples = true;
    form.uploadDir = config.UPLOAD_FOLDER;

    form.parse(req, function (err, fields, files) {
        let userId = fields.id;
        let url = path.join(form.uploadDir, userId, files.file.name);

        fs.renameSync(files.file.path, url); // moves file to a user folder

        let obj = {
            name: files.file.name,
            date: new Date(),
            status: 'new',
            url: url
        };
        let doc = new Document(obj);

        co(function* () {
            return yield db.users.findAndModify({
                query: {
                    _id: pmongo.ObjectId(userId)
                },
                update: {
                    $push: {
                        docs: doc
                    }
                }
            });
        }).then(
            (val) => {
                sendJSONresponse(res, 200, {
                    "message": "Uploaded"
                })
            },
            (err) => {
                console.log(err);
                sendJSONresponse(res, 500, 'Internal Server Error');
            });
    });
}

module.exports.downloadDocument = (req, res) => {
    console.log(config.UPLOAD_FOLDER)
    let filePath = req.query.userId + '/' + req.query.docName;

    let options = {
        root: config.UPLOAD_FOLDER + '/',
        headers: {
            "file-name": req.query.docName
        }
    }

    res.sendFile(filePath, options, function (err) {
        if (err) {
            console.log(err);
            res.status(err.status).end();
        }
    });
}

module.exports.getUserDocuments = (req, res) => {
    let id = req.params.userId;

    co(function* () {
        return yield db.users
            .findOne({
                _id: pmongo.ObjectId(id)
            });
    }).then(
        (user) => {
            sendJSONresponse(res, 200, {
                users: user.docs
            })
        },
        (err) => {
            console.log(err);

            sendJSONresponse(res, 500, {
                message: 'Internal Server Error'
            })
        });
}