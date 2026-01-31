'use strict';
const crypto = require('crypto');
const encrypt = {}

encrypt.hashPassword = (texteClair) => {
    return crypto.createHash('sha1').update(texteClair).digest('hex')
}

encrypt.comparePassword = (plainPassword, hashedPassword) => {
   return encrypt.hashPassword(plainPassword) === hashedPassword;
}

module.exports = encrypt;