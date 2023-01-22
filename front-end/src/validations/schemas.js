const Yup = require('yup');

const MIN_LENGTH = 6;

const schemaLogin = Yup.object().shape({
  email: Yup.string().email().required(),
  password: Yup.string().min(MIN_LENGTH).required(),
});

module.exports = {
  schemaLogin,
};
