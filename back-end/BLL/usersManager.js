const co = require('co');

const User = require('../models/user').User;
const config = require('../config/configApp');
const ErrorsKeeper = require('../helpers/errorsKeeper').ErrorsKeeper;
const UsersRepository = require('../DAL/usersRepository').UsersRepository;

class UsersManager {
   static getUsers() {
        return co(function* () {
            const users = yield UsersRepository.getUsers();

            return {
                status: 200,
                content: {
                    users: users
                }
            };

        }).catch((err) => {
            console.log(err.stack);

            return ErrorsKeeper.getServerErrSettings();
        });
    }

    static addUser(userSettings) {
        const user = new User(userSettings);

        user.setPassword(userSettings.password);

        return co(function* () {
            const userExist = yield UsersRepository.getUser({
                email: user.email
            });

            if (!userExist) {
                const token = user.generateJwt();
                const userDb = yield UsersRepository.addUser(user);
                const userId = userDb._id.toString();

                user._id = userId;             
                user.createUploadFolder(config.UPLOAD_FOLDER);

                return {
                    status: 200,
                    content: {
                        token: token
                    }
                };

            } else {
                return ErrorsKeeper.getUserExistErrSettings();
            }
        }).catch((err) => {
            console.log(err.stack);

            return ErrorsKeeper.getServerErrSettings();
        });
    }
}

module.exports.UsersManager = UsersManager;