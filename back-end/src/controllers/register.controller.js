const service = require('../services/register.service');
const { createToken } = require('../utils/jwtEngine');


const registerUser = async (req, res) => {
    const { name, email, password } = req.body;

    const newUser = await service.registerUser(name, email, password);

    const token = createToken(newUser);

    return res.status(201).json({
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
        token,
    });
}

module.exports = {
    registerUser
}