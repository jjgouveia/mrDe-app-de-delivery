const { user } = require('../database/models');

const getAccount = async () => {

  // Requisição ao banco de dados para retornar a conta
  const account = await user.findAll();

return account
};

module.exports = {
 getAccount,
};