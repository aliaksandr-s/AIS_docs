const pmongo = require('promised-mongo');

const config = require('../config/configApp');
const db = pmongo(config.dbURI);

class UsersRepository {
    static getUsers() {
        return db.users.find({}, {
            hash: 0,
            salt: 0
        }).toArray();
    }

    static getUser(searchSettings) {
        return db.users.findOne(searchSettings);
    }

    static addUser(user) {
        return db.users.save(user);
    }
}

module.exports.UsersRepository = UsersRepository;