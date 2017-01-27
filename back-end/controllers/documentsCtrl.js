const fs = require('fs');
const path = require('path');
const co = require('co');
const formidable = require('formidable');
const pmongo = require('promised-mongo');
const config = require('../config/configApp')
const db = pmongo(config.dbURI);
const sendJSONresponse = require('../config/configApp.js').sendJSONresponse;
const Document = require('../models/document').Document;

//Uploads new document
module.exports.uploadDocument = (req, res) => {
    let form = new formidable.IncomingForm();

    form.multiples = true;
    form.uploadDir = config.UPLOAD_FOLDER;

    form.parse(req, function (err, fields, files) {
        let userId = fields.id;
        let url = path.join(form.uploadDir, userId, files.file.name);

        fs.renameSync(files.file.path, url); // moves file to a user folder

        let documentSettings = {
            name: files.file.name,
            date: new Date(),
            status: 'new',
            url: url
        };
        let document = new Document(documentSettings);

        co(function* () {
            yield db.users.findAndModify({
                query: {
                    _id: pmongo.ObjectId(userId)
                },
                update: {
                    $push: {
                        docs: document
                    }
                }
            });

            sendJSONresponse(res, 200, {
                "message": "Uploaded"
            })
        }).catch((err) => {
            console.log(err.stack);

            sendJSONresponse(res, 500, {
                message: 'Internal Server Error'
            })
        });;
    });
}


//Downloads document
module.exports.downloadDocument = (req, res) => {
    console.log(req.params)
    let filePath = req.params.userId + '/' + req.params.docName;

    let options = {
        root: config.UPLOAD_FOLDER + '/',
        headers: {
            "file-name": req.params.docName
        }
    }

    res.sendFile(filePath, options, function (err) {
        if (err) {
            console.log(err);
            res.status(err.status).end();
        }
    });
}

//Gets document of the user
module.exports.getUserDocuments = (req, res) => {
    if (!req.params.userId) {
        sendJSONresponse(res, 400, {
            "message": "User ID required"
        });
    }

    const userId = req.params.userId;

    co(function* () {
        const userDocuments = yield db.users.aggregate( 
            { $match: {"_id": pmongo.ObjectId(userId)} },
            { $unwind : "$docs" },
            { $project: {"ownerId": "$_id", "_id": 0, "ownerName": "$name", "ownerEmail": "$email", "documentInfo": "$docs"} }
        )

        if (!userDocuments) {
            sendJSONresponse(res, 404, {
                "message": "Not found"
            });
        }

        sendJSONresponse(res, 200, {
            userDocuments: userDocuments
        })
    }).catch((err) => {
        console.log(err.stack);

        sendJSONresponse(res, 500, {
            message: 'Internal Server Error'
        })
    });
}


module.exports.getAllDocuments = (req, res) => {

    co(function* () {
        const allDocuments = yield db.users.aggregate( 
            { $unwind : "$docs" },
            { $project: {"ownerId": "$_id", "_id": 0, "ownerName": "$name", "ownerEmail": "$email", "documentInfo": "$docs"} }
        )

        sendJSONresponse(res, 200, {
            allDocuments: allDocuments
        })

    }).catch((err) => {
        console.log(err.stack);

        sendJSONresponse(res, 500, {
            message: 'Internal Server Error'
        })
    });
}