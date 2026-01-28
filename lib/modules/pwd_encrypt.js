'use strict';
const crypto = require('crypto');
const encrypt = {}

encrypt.sha1 = (texteClair) => {
    return crypto.createHash('sha1').update(texteClair).digest('hex')
}

encrypt.comparePassword = (plainPassword, hashedPassword) => {
    return encrypt.sha1(plainPassword) === hashedPassword;
}

module.exports = encrypt;