const { sale, salesProducts, product } = require('../database/models');
const HttpException = require('../utils/http.exception');

const findProduct = async (column, search) => {
    const request = await product.findOne({ where: { [column]: search } });
    return Number(request.dataValues.id);
};

const SALE_ID = 'sale_id';
const PRODUCT_ID = 'product_id';

const registerSale = async (newSale) => {
  const {
    userId, sellerId,
    totalPrice, deliveryAddress,
    deliveryNumber, saleDate,
    status,
  } = newSale;

  const { dataValues } = await sale.create({
    userId,
    sellerId,
    totalPrice,
    deliveryAddress,
    deliveryNumber,
    saleDate,
    status,
  });

  return dataValues;
};

const createSale = async (body) => {
  try {
    const registerResponse = await registerSale(body);
    const relational = body.products.map(async (bodyProduct) => {
      const { name, quantity } = bodyProduct;
      const productId = await findProduct('name', name);
      await salesProducts
        .create({
          [SALE_ID]: registerResponse.id,
          [PRODUCT_ID]: productId,
          quantity: Number(quantity),
          });
    });
    await Promise.all(relational);
    return registerResponse;
  } catch (err) {
    return { error: err };
  }
};

const getAllSales = async () => {
  const request = await sale.findAll();

  if (!request) throw new HttpException(404, 'Ops! We can\'t find anything');

  return request;
};

const getUserSallesById = async (userId) => {
  const sales = await sale.findAll({ where: { userId } });
  if (!sales || !sales.length) throw new HttpException(404, 'Customer not found');

  return sales;
};

const getSellerSallesById = async (sellerId) => {
  const sales = await sale.findAll({ where: { sellerId } });
  if (!sales || !sales.length) throw new HttpException(404, 'Seller not found');

  return sales;
};

const getOrderById = async (id) => {
  const sales = await sale.findOne({ where: { id } });
  if (!sales) throw new HttpException(404, 'Sale not found');

  return sales;
};

const updateSales = async (status, id) => {
  const update = await sale.update({ status }, { where: { id } });

  return update;
};

module.exports = {
    createSale,
    getAllSales,
    getUserSallesById,
    getSellerSallesById,
    updateSales,
    getOrderById,
};