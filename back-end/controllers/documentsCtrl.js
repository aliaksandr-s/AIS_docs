const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const co = require('co');
const formidable = require('formidable');
const pmongo = require('promised-mongo');
const config = require('../config/configApp')
const db = pmongo(config.dbURI);
const sendJSONresponse = require('../config/configApp.js').sendJSONresponse;
const Document = mongoose.model('Document');

module.exports.uploadDocument = (req, res) => {

    /*    let form = new formidable.IncomingForm();
        form.multiples = true;
        form.uploadDir = config.UPLOAD_FOLDER;

        form.on('error', function (err) {
            sendJSONresponse(res, 500, err);
        });

        form.on('end', function () {
            sendJSONresponse(res, 200, {
                "message": "Uploaded"
            })
        });

        form.parse(req, function (err, fields, files) {
            let userId = fields.id;
            let url = path.join(form.uploadDir, userId, files.file.name);

            fs.renameSync(files.file.path, url); // moves file to a user folder

            let document = new Document();
            document.name = files.file.name;
            document.date = new Date();
            document.status = 'new';
            document.url = url;

            User.findById(userId, (err, user) => {
                if (!err) {
                    user.docs.push(document);
                    user.save();
                }
            })

        });*/

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