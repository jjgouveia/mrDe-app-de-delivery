const md5 = require('md5');
const { user } = require('../database/models');
const HttpException = require('../utils/http.exception');

const registerUser = async (name, email, pass) => {
    const isAlreadyRegistered = await user.findOne({ where: { email } });

    if(isAlreadyRegistered) throw new HttpException(409, 'User already registered');

    const encryptPassword = md5(pass);

    const newUser = await user.create({ name, email, password: encryptPassword, role: 'customer' });

    return newUser;
}

module.exports = {
    registerUser
}