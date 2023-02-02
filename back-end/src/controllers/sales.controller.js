const service = require('../services/sales.service');

const registerSale = async (req, res) => {
    const request = await service.createSale(req.body);
    return res.status(201).json(request);
};

const getAllSales = async (req, res) => {
  const request = await service.getAllSales(req.body);
  return res.status(200).json(request);
};

const getUserSallesById = async (req, res) => {
    const request = await service.getUserSallesById(req.params.user_id);
    return res.status(200).json(request);
};

const getSellerSallesById = async (req, res) => {
  const request = await service.getSellerSallesById(req.params.seller_id);
  return res.status(200).json(request);
};

const getupdateSales = async (req, res) => {
  const { status, id } = req.params;
  const getup = await service.updateSales(status, id)
  return res.status(201).json(getup);
}

module.exports = {
  registerSale,
  getAllSales,
  getUserSallesById,
  getSellerSallesById,
  getupdateSales,
};