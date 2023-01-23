const service = require('../services/register.service');
const { createToken } = require('../utils/jwtEngine');

const registerUser = async (req, res) => {
    const request = await service.registerUser(req.body);

    if (request.type === 400) return res.status(request.type).json({ message: request.message });

    const token = createToken(request);

    return res.status(201).json({
        id: request.id,
        name: request.name,
        email: request.email,
        role: request.role,
        token,
    });
};

module.exports = {
    registerUser,
};