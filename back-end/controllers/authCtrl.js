const passport = require('passport');

const ErrorsKeeper = require('../helpers/errorsKeeper').ErrorsKeeper;
const ServerResponse = require('../helpers/serverResponse').ServerResponse;
let _errSettings, _token,
    _responseSettings = {
        status: 0,
        content: null
    };

class AuthCtrl {
    static login(req, res) {
        if (!req.body.email || !req.body.password) {
            _errSettings = ErrorsKeeper.getFieldsRequiredErrSettings();
            ServerResponse.setResponseSettings(_errSettings);
            ServerResponse.sendJSONresponse(res);
            return;
        }

        passport.authenticate('local', function (err, user, info) {
            if (err) {
                _responseSettings.status = 404;
                _responseSettings.content = err;
            }

            if (user) {
                _token = user.generateJwt();
                _responseSettings.status = 200;
                _responseSettings.content = {
                    token: _token
                };
            } else {
                _responseSettings.status = 401;
                _responseSettings.content = info;
            }

            ServerResponse.setResponseSettings(_responseSettings);
            ServerResponse.sendJSONresponse(res);
        })(req, res);
    }
}

module.exports.AuthCtrl = AuthCtrl;