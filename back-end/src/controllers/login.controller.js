const service = require('../services/login.service');
const { createToken } = require('../utils/jwtEngine');

const loginRequest = async (req, res) => {
    const { email, password } = req.body;
    const request = await service.requestLogin(email, password);

    const token = createToken(request);
    
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