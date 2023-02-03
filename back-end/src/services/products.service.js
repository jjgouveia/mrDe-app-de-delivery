const { product } = require('../database/models');
const { salesProducts } = require('../database/models');

const getAllProducts = async () => {
    const allProducts = await product.findAll();
    return allProducts;
};

const SALE_ID = 'sale_id';

const getProductListBySaleId = async (saleId) => {
    const productsList = await salesProducts.findAll({
      where: {
        [SALE_ID]: saleId,
      },
      // include: [{
      //   model: product,
      //   attributes: ['name', 'price'],
      // }],
    });
    return productsList;
};

module.exports = {
    getAllProducts,
    getProductListBySaleId,
};
