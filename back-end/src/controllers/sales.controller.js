const service = require('../services/sales.service');

const registerSale = async (req, res) => {
    const request = await service.registerSale(req.body);

    console.log(request);

    // if (request.type === 400) return res.status(request.type).json({ message: request.message });

    return res.status(201).json(request);

    // return res.status(201).json({
    //     id: request.id,
    //     name: request.name,
    //     email: request.email,
    //     role: request.role,
    //     token,
    // });
};

module.exports = {
  registerSale,
};