const service = require('../services/sales.service');

const registerSale = async (req, res) => {
    const request = await service.createSale(req.body);

    console.log('BODY REQUEST: ', request);

    return res.status(201).json(request);
};

module.exports = {
  registerSale,
};