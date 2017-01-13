const mongoose = require('mongoose');
const User = mongoose.model('User');
const config = require('../config/configApp');
const sendJSONresponse = require('../config/configApp.js').sendJSONresponse;

module.exports.addUser = (req, res) => {
    let name = req.body.name;
    let email = req.body.email;
    let password = req.body.password;

    if (!name || !email || !password) {
        sendJSONresponse(res, 400, {
            "message": "All fields required"
        });
        return;
    }

    let user = new User();
    user.name = name;
    user.email = email;
    user.setPassword(password);
    user.profileStatus = 'user';

    user.save(function (err, response) {
        let token;

        if (err) {
            sendJSONresponse(res, 404, {
                "message": "User with that email already exists"
            });
        } else {
            token = user.generateJwt();
            user.createUploadFolder(config.UPLOAD_FOLDER);

            sendJSONresponse(res, 200, {
                "token": token
            });
        }
    });
};

module.exports.getUsers = (req, res) => {
    User.find({}, '-_id name email docs', function (err, users) {
        if (err) {
            sendJSONresponse(res, 409, {
                "message": "Something went wrong"
            })
        }
        sendJSONresponse(res, 200, {
            "users": users
        })
    });
}