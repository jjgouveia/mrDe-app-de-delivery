const { user } = require('../database/models');
const HttpException = require('../utils/http.exception');

const getUserById = async (id) => {

    const request = await user.findByPk(id);

    if (!request) throw new HttpException(404, 'User not found!');

    return request;
};

module.exports = {
    getUserById
}