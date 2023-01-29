const { sale, salesProducts, product } = require('../database/models');

const findProduct = async (column, search) => {
    const request = await product.findOne({ where: { [column]: search } });
    console.log('PRODUTO PROCURADO: ', request);
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
        console.log('BODY DA CREATESALE: ', registerResponse);
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

module.exports = {
    createSale,
};