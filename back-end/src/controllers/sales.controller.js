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

const getOrderById = async (req, res) => {
  const request = await service.getOrderById(req.params.order_id);
  return res.status(200).json(request);
};

const updateSales = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  let reqStatus = status;
  if (status === 'transito') {
    reqStatus = 'Em Trânsito';
}
  const getup = await service.updateSales(reqStatus, id);
  return res.status(201).json(getup);
};

module.exports = {
  registerSale,
  getAllSales,
  getUserSallesById,
  getSellerSallesById,
  updateSales,
  getOrderById,
};