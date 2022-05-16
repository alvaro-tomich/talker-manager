const crypto = require('crypto');

function generateToken() {
    const token = crypto.randomBytes(8).toString('hex');
    return token;
}

module.exports = generateToken;