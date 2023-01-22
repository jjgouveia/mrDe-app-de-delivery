const service = require('../services/login.service');

const loginRequest = async (req, res) => {
    const { email, password } = req.body;
    const request = await service.requestLogin(email, password);

    return res.status(200).json(request);
};

module.exports = {
    loginRequest,
};