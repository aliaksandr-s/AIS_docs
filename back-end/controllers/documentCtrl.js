const mongoose = require('mongoose');
const User = mongoose.model('User');
const Document = mongoose.model('Document');
const formidable = require('formidable');
const config = require('../config/configApp')
const fs = require('fs');
const path = require('path');
const sendJSONresponse = require('../config/configApp.js').sendJSONresponse;

module.exports.saveDocument = (req, res) => {

    let form = new formidable.IncomingForm();
        form.multiples = true;
        form.uploadDir = config.UPLOAD_FOLDER;

    form.on('error', function(err) {
        sendJSONresponse(res, 500, err);
    });

    form.on('end', function() {
        sendJSONresponse(res, 200, {
            "message": "Uploaded"
        })
    });

    form.parse(req, function(err, fields, files) {
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

    });

}