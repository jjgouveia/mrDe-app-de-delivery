const { user } = require('../database/models');
const HttpException = require('../utils/http.exception');

const getUserById = async (id) => {
    const request = await user.findByPk(id);
    if (!request) throw new HttpException(404, 'User not found!');
    return request;
};

const getAllSellers = async () => {
    // const request = await user.findAll({
    //     where: { role: 'seller' },
    // });
    const request = await user.findAll();

    if (!request) throw new HttpException(404, 'Ops! We can\'t find anything');
    return request;
};

const deleteUserById = async (id) => {
    const request = await user.destroy({
        where: {
          id,
        },
      });
    if (!request) throw new HttpException(404, 'User not found!');
    return request;
};

module.exports = {
    getUserById,
    getAllSellers,
    deleteUserById,
};