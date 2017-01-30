const UsersManager = require('../BLL/usersManager').UsersManager;
const ErrorsKeeper = require('../helpers/errorsKeeper').ErrorsKeeper;
const ServerResponse = require('../helpers/serverResponse').ServerResponse;
let _errSettings, _responseSettings, _userSettings;

class UsersCtrl {
    static getUsers(req, res) {
        _responseSettings = UsersManager.getUsers()
            .then((settings) => {
                ServerResponse.setResponseSettings(settings);
                ServerResponse.sendJSONresponse(res);
            });
    }

    static addUser(req, res) {
        if (!req.body.name || !req.body.email || !req.body.password) {
            _errSettings = ErrorsKeeper.getFieldsRequiredErrSettings();
            ServerResponse.setResponseSettings(_errSettings);
            ServerResponse.sendJSONresponse(res);
            return;
        }

        _userSettings = {
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        };

        _responseSettings = UsersManager.addUser(_userSettings)
            .then((settings) => {
                ServerResponse.setResponseSettings(settings);
                ServerResponse.sendJSONresponse(res);
            });
    }
}

module.exports.UsersCtrl = UsersCtrl;