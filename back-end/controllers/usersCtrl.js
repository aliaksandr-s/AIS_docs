const co = require('co');
const pmongo = require('promised-mongo');
const config = require('../config/configApp');
const db = pmongo(config.dbURI);
const User = require('../models/user').User;
const sendJSONresponse = require('../config/configApp.js').sendJSONresponse;

//Gets all users
module.exports.getUsers = (req, res) => {
    co(function* () {
        const users = yield db.users.find({}, {
            hash: 0,
            salt: 0
        }).toArray();

        sendJSONresponse(res, 200, {
            users: users
        })
    }).catch((err) => {
        console.log(err.stack);

        sendJSONresponse(res, 500, {
            message: 'Internal Server Error'
        })
    });
}

//Adds new user
module.exports.addUser = (req, res) => {
    if (!req.body.name || !req.body.email || !req.body.password) {
        sendJSONresponse(res, 400, {
            "message": "All fields required"
        });
        return;
    }

    let userSettings = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    };
    let user = new User(userSettings);

    user.setPassword(userSettings.password);

    co(function* () {
        yield db.users.save(user);

        let token = user.generateJwt();

        user.createUploadFolder(config.UPLOAD_FOLDER);

        sendJSONresponse(res, 200, {
            "token": token
        });
    }).catch((err) => {
        console.log(err.stack);

        sendJSONresponse(res, 500, {
            message: 'Internal Server Error'
        })
    });
};