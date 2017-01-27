const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const co = require('co');
const pmongo = require('promised-mongo');
const config = require('../config/configApp');
const db = pmongo(config.dbURI);
const User = require('../models/user').User;

passport.use(new LocalStrategy({
        usernameField: 'email'
    },
    function (username, password, done) {
        co(function* () {
            const userDb = yield db.users.findOne({
                email: username
            });

            if (!userDb) {
                return done(null, false, {
                    message: 'Incorrect email or password.'
                });
            }

            let user = new User(userDb);

            if (!user.validPassword(password)) {
                return done(null, false, {
                    message: 'Incorrect email or password.'
                });
            }

            if (userDb.profileStatus === 'admin') {
                user.profileStatus = 'admin';
            }

            return done(null, user);
        }).catch((err) => {
            console.log(err.stack);

            return done(err);
        });
    }
));