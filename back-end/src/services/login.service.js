const { user } = require('../database/models');
const md5 = require('md5');
const HttpException = require('../utils/http.exception');
const { createToken } = require('../utils/jwtEngine');

const requestLogin = async (email, password) => {
  const request = await user.findOne({ where: { email }})

  if(!request) throw new HttpException(404, 'User not found');

  const encryptedPassword = md5(password);

  if(request.password !== encryptedPassword) throw new HttpException(400, 'Invalid password');

  const { id, name, role } = request;

  const token = createToken({
    id,
    name,
    email,
    password: encryptedPassword,
    role,
  });

  return { id, name, email, role, token };
}


module.exports = {
  requestLogin
}