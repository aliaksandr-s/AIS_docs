const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');

class User {
    constructor(obj) {
        this.name = obj && obj.name;
        this.email = obj && obj.email;
        this.profileStatus = 'user';
        this.docs = [];
        this.salt = obj && obj.salt || '';
        this.hash = obj && obj.hash || '';
    }

    setPassword(password) {
        this.salt = crypto.randomBytes(16).toString('hex');
        this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');
    }

    validPassword(password) {
        const hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');
        return this.hash === hash;
    }

    generateJwt() {
        const expiry = new Date();
        expiry.setDate(expiry.getDate() + 7);

        return jwt.sign({
            _id: this._id,
            email: this.email,
            name: this.name,
            profileStatus: this.profileStatus,
            exp: parseInt(expiry.getTime() / 1000)
        }, process.env.JWT_SECRET);
    }

    createUploadFolder(mainFolder) {
        fs.mkdirSync(path.join(mainFolder, String(this._id)))
    }
}

module.exports.User = User;