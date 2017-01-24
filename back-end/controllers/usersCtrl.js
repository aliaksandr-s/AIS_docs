const mongoose = require('mongoose');
const co = require('co');
const pmongo = require('promised-mongo');
const config = require('../config/configApp');
const db = pmongo(config.dbURI);
const sendJSONresponse = require('../config/configApp.js').sendJSONresponse;
const User = mongoose.model('User');

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
    co(function* () {
        return yield db.users.find({}, {
            hash: 0,
            salt: 0
        }).toArray();
    }).then(
        (val) => {
            sendJSONresponse(res, 200, {
                users: val
            })
        },
        (err) => {
            console.log(err);

            sendJSONresponse(res, 500, {
                message: 'Internal Server Error'
            })
        });
}