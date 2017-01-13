const mongoose = require('mongoose');
const Document = mongoose.model('Document');
const formidable = require('formidable');
const config = require('../config/configApp')
const fs = require('fs');
const path = require('path');
const sendJSONresponse = require('../config/configApp.js').sendJSONresponse;

module.exports.addDocument = (req, res) => {

    let form = new formidable.IncomingForm();
        form.multiples = true;
        form.uploadDir = config.UPLOAD_FOLDER;

    form.on('file', function(field, file) {
        console.log(file)
        fs.rename(file.path, path.join(form.uploadDir, file.name));
    });

    form.on('error', function(err) {
        sendJSONresponse(res, 500, err);
        return;
    });

    form.on('end', function() {
        sendJSONresponse(res, 200, {
            "message": "Uploaded"
        })
    });

    form.parse(req);
}