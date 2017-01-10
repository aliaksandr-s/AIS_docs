const mongoose = require('mongoose');
const User = mongoose.model('User');
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

            let a;
            sendJSONresponse(res, 200, {
                "token": token
            });
        }
    });
};