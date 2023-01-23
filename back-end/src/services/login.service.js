const md5 = require('md5');
const { user } = require('../database/models');
const HttpException = require('../utils/http.exception');

const requestLogin = async (email, password) => {
  const request = await user.findOne({ where: { email } });

  if (!request) throw new HttpException(404, 'User not found');

  const encryptedPassword = md5(password);

  if (request.password !== encryptedPassword) throw new HttpException(400, 'User or password invalid');

  return request;
};

module.exports = {
  requestLogin,
};