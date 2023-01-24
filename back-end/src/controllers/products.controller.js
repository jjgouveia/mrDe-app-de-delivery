const service = require('../services/products.service');

const getAllProducts = async (req, res) => {
    const allProducts = await service.getAllProducts();
    return res.status(200).json(allProducts);
};

module.exports = {
    getAllProducts };