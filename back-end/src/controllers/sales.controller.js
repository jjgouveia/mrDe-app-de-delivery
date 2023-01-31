const service = require('../services/sales.service');

const registerSale = async (req, res) => {
    const request = await service.createSale(req.body);
    return res.status(201).json(request);
};

const getAllSales = async (req, res) => {
  const request = await service.getAllSales(req.body);
  return res.status(200).json(request);
};

module.exports = {
  registerSale,
  getAllSales,
};