// const { verify } = require('jsonwebtoken');
const service = require('../services/login.service');
const { createToken } = require('../utils/jwtEngine');

const loginRequest = async (req, res) => {
    const request = await service.requestLogin(req.body);

    if (request.type === 400) return res.status(request.type).json({ message: request.message });

    const token = createToken(request);
    // console.log('AAAAAAAAAAAA');
    // console.log('TOKEN', token);
    // console.log('VERIFY TOKEN', verify(token, 'secret_key'));
    
      return res.status(200).json({
        id: request.id,
        name: request.name,
        email: request.email,
        role: request.role,
        token,
      });
};

module.exports = {
    loginRequest,
};