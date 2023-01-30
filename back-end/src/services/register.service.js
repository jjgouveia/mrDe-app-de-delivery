const md5 = require('md5');
const { user } = require('../database/models');
const HttpException = require('../utils/http.exception');
const { validateRegister, validateRegisterManager } = require('./validations/validateInputs');

const registerUser = async (register) => {
    const error = validateRegister(register);
    if (error) return { type: 400, message: error };

    const { name, email } = register;
    
    const isAlreadyRegistered = await user.findOne({ where: { email } });

    if (isAlreadyRegistered) throw new HttpException(409, 'User already registered');

    const encryptPassword = md5(register.password);

    const newUser = await user.create({ name, email, password: encryptPassword, role: 'customer' });

    return newUser;
};

const registerUserManager = async (register) => {
    const error = validateRegisterManager(register);
    if (error) return { type: 400, message: error };

    const { name, email, role } = register;
    
    const isAlreadyRegistered = await user.findOne({ where: { email } });

    if (isAlreadyRegistered) throw new HttpException(409, 'User already registered');

    const encryptPassword = md5(register.password);

    const newUser = await user.create({ name, email, password: encryptPassword, role });

    return newUser;
};

module.exports = {
    registerUser,
    registerUserManager,
};