const Yup = require('yup');

const PASSWORD_MIN_LENGTH = 6;
const NAME_MIN_LENGTH = 12;

const loginSchema = Yup.object().shape({
  email: Yup.string().email().required(),
  password: Yup.string().min(PASSWORD_MIN_LENGTH).required(),
}).required();

const registerSchema = Yup.object().shape({
  name: Yup.string().min(NAME_MIN_LENGTH).required(),
  email: Yup.string().email().required(),
  password: Yup.string().min(PASSWORD_MIN_LENGTH).required(),
}).required();

module.exports = {
  loginSchema,
  registerSchema,
};
