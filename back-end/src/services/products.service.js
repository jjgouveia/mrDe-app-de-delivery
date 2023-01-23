const { product } = require('../database/models');

const getAllProducts = async () => {
    const allProducts = await product.findAll();
    return allProducts;
}


module.exports = {
    getAllProducts,
};
