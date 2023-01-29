const { sale, sales_products, product } = require('../database/models');

const findProduct = async (column, search) => {
    const request = await product.findOne({ where: { [column]: search } });
    return Number(request.dataValues.id);
};

const SALE = 'sale_id';
const PRODUCT = 'product_id';

const registerSale = async (newSale) => {

    const {
        userId, sellerId,
        totalPrice,
        deliveryAddress,
        deliveryNumber,
        saleDate,
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
        const sale = await registerSale(body);
        const relational = body.products.map(async (product) => {
            const productId = await findProduct('name', product.name);
            await sales_products
                .create({
                    [SALE]: sale.id, [PRODUCT]: productId, quantity: Number(product.quantity)
                });
        });
        await Promise.all(relational);
        return sale;
    } catch (err) {
        return { error: err.response }
    }
};

module.exports = {
    createSale,
};