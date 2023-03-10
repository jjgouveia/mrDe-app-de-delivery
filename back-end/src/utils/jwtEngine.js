const { sign, verify } = require('jsonwebtoken');
const jwtKey = require('fs')
  .readFileSync('./jwt.evaluation.key', { encoding: 'utf-8' });
const HttpException = require('./http.exception');

require('dotenv/config');

const createToken = (data) => {
    const token = sign(
        { data },
        jwtKey,
        {
            expiresIn: '1d',
            algorithm: 'HS256',
        },
    );

    return token;
};

const validateToken = (token = null) => {
    if (!token) throw new Error('Token not found');

    try {
        const { data } = verify(token, jwtKey);
        return data;
    } catch (error) {
        throw new HttpException(401, 'Expired or Invalid Token');
    }
};

module.exports = {
    createToken,
    validateToken,
};
