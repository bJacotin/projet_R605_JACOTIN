'use strict';
const crypto = require('crypto');
const encrypt = {}

encrypt.sha1 = (texteClair) => {
    return crypto.createHash('sha1').update(texteClair).digest('hex')
}

module.exports = encrypt;