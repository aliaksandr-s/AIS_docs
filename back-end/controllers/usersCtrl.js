const co = require('co');
const pmongo = require('promised-mongo');
const config = require('../config/configApp');
const db = pmongo(config.dbURI);
const User = require('../models/user').User;
const sendJSONresponse = require('../config/configApp.js').sendJSONresponse;

module.exports.addUser = (req, res) => {
    let obj = {
        name: req.body.name,
        email: req.body.email
    };
    let password = req.body.password;

    if (!obj.name || !obj.email || !password) {
        sendJSONresponse(res, 400, {
            "message": "All fields required"
        });
        return;
    }

    let user = new User(obj);

    user.setPassword(password);

    co(function* () {
        return yield db.users.save(user);
    }).then(
        (val) => {
            let token = user.generateJwt();

            user.createUploadFolder(config.UPLOAD_FOLDER);

            sendJSONresponse(res, 200, {
                "token": token
            });
        },
        (err) => {
            console.log(err);

            sendJSONresponse(res, 500, {
                message: 'Internal Server Error'
            })
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