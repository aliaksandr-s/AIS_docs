const mongoose = require('mongoose');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const Schema = mongoose.Schema;

const password = '';

const docSchema = new Schema({
    name: String,
    date: Date,
    docStatus: String,
    path: String,
    type: String
});

const userSchema = new Schema({
    email: {
        type: String,
        unique: true
    },
    name: String,
    hash: String,
    salt: String,
    token: String,
    profileStatus: String,
    docs: [docSchema]

});

userSchema.methods.setPassword = function (password) {
    this.salt = crypto.randomBytes(16).toString('hex');
    this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');
};

userSchema.methods.validPassword = function (password) {
    const hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');
    return this.hash === hash;
};

userSchema.methods.generateJwt = function () {
    const expiry = new Date();
    expiry.setDate(expiry.getDate() + 7);

    return jwt.sign({
        _id: this._id,
        email: this.email,
        name: this.name,
        profileStatus: this.profileStatus,
        exp: parseInt(expiry.getTime() / 1000)
    }, process.env.JWT_SECRET);
};

mongoose.model('User', userSchema);