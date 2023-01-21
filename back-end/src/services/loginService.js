const md5 = require('md5');
const { User } = require('../database/models');

const getAccount = async () => {

  // Requisição ao banco de dados para retornar a conta
  const account = await User.findAll();

return account
};

module.exports = {
 getAccount,
};