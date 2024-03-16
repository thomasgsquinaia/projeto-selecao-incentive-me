const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');
module.exports = {
    generatePassword: async (password) => {
        return await bcrypt.hash(password, saltRounds);
    },
    decryptPassword: async (password, passwordEncrypted) => {
        return await bcrypt.compare(password, passwordEncrypted);
    },
    generateToken: (obj) => {
        return jwt.sign(
            { data: obj },
            passSegredo(),
            { expiresIn: '200d' }
        )
    },
    decodeToken: (token) => {
        return jwt.decode(token, passSegredo());
    },
}

function passSegredo() {
    return process.env.SECRET;
}