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

    const request = await sale.create({
        userId,
        sellerId,
        totalPrice,
        deliveryAddress,
        deliveryNumber,
        saleDate,
        status,
    });

    return request;
};

const createSale = async (body) => {
    try {
        const sale = await registerSale(body);
        const map = body.products.map(async (product) => {
            const productId = await findProduct('name', product.name);
            await sales_products
                .create({
                    [SALE]: sale.dataValues.id, [PRODUCT]: productId, quantity: Number(product.quantity)
                });
        });
        await Promise.all(map);
        return sale;
    } catch (err) {
        return { error: err.response }
    }
};

module.exports = {
    createSale,
};