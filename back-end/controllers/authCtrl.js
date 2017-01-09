const passport = require('passport');
const mongoose = require('mongoose');
const User = mongoose.model('User');
const sendJSONresponse = require('../config/configApp.js').sendJSONresponse;

module.exports.register = function (req, res) {
    if (!req.body.name || !req.body.email || !req.body.password) {
        sendJSONresponse(res, 400, {
            "message": "All fields required"
        });
        return;
    }

    let user = new User();
    user.name = req.body.name;
    user.email = req.body.email;
    user.setPassword(req.body.password);
    user.profileStatus = 'user';

    user.save(function (err, response) {
        let token;

        if (err) {
            sendJSONresponse(res, 404, err);
        } else {
            token = user.generateJwt();

            let a;
            sendJSONresponse(res, 200, {
                "token": token
            });
        }
    });
};

module.exports.login = function (req, res) {
    if (!req.body.email || !req.body.password) {
        sendJSONresponse(res, 400, {
            "message": "All fields required"
        });
        return;
    }
    passport.authenticate('local', function (err, user, info) {
        let token;
        if (err) {
            sendJSONresponse(res, 404, err);
            return;
        }
        if (user) {
            token = user.generateJwt();
            sendJSONresponse(res, 200, {
                "token": token
            });
        } else {
            sendJSONresponse(res, 401, info);
        }
    })(req, res);
};