const mongoose = require('mongoose');
const User = mongoose.model('User');
const formidable = require('formidable');
const sendJSONresponse = require('../config/configApp.js').sendJSONresponse;

module.exports.addDoc = (req, res) => {
    // parse a file upload
    const form = new formidable.IncomingForm();

    form.uploadDir = './files';

    form.parse(req, function (err, fields, files) {
        if (!fields.email || !files.file) {
            sendJSONresponse(res, 400, {
                "message": "All fields required"
            });
            return;
        } else {
            /*User
                .findOne({
                    email: fields.email
                })
                .select('docs')
                .exec((err, user) => {
                    if (!err) {
                        if (user) {
                            
                            let path = files.file.path.splice('/')[0];
                            let obj = {
                                name: files.file.name,
                                date: new Date,
                                path: path + '/' + files.file.name,
                                type: files.file.type
                            };
                            user.docs.push(obj);

                            user.save((err, response) => {
                                if (err) {
                                    sendJSONresponse(res, 400, err);
                                } else {
                                    sendJSONresponse(res, 200, {
                                        message: 'file uploaded'
                                    });
                                }
                            });
                        }
                    }
                });*/
        }
    });
};