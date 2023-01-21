import { sign, verify } from 'jsonwebtoken';
import HttpException from './http.exception';

require('dotenv/config');

export const createToken = (data) => {
    const token = sign(
        { data },
        process.env.JWT_SECRET,
        {
            expiresIn: '1d',
            algorithm: 'HS256',
        }
    );

    return token;
};

export const validateToken = (token = null) => {
    if (!token) throw new Error('Token not found');

    try {
        const { data } = verify(token, process.env.JWT_SECRET);
        return data;
    } catch (error) {
        throw new HttpException(401, 'Expired or Invalid Token');
    }
};