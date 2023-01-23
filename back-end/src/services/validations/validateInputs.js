const { loginSchema, newUserSchema } = require("./schemas");

const validateLogin = (login) => {
    const { error } = loginSchema.validate(login);
    if (error) {
        return error.message;
    }
};

const validateRegister = (register) => {
    const { error } = newUserSchema.validate(register);
    if (error) {
        return error.message;
    }
};

module.exports = {
    validateLogin,
    validateRegister,
}