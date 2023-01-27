const { sale } = require('../database/models');
// const HttpException = require('../utils/http.exception');
// const { validateRegister } = require('./validations/validateInputs');

const registerSale = async (newSale) => {
    // const error = validateRegister(register);
    // if (error) return { type: 400, message: error };

    const {
        userId, sellerId,
        totalPrice,
        deliveryAddress,
        deliveryNumber,
        saleDate,
        status,
    } = newSale;
    
    // const isAlreadyRegistered = await sale.findOne({ where: { email } });

    // if (isAlreadyRegistered) throw new HttpException(409, 'sale already registered');

    const createdSale = await sale.create({
        userId,
        sellerId,
        totalPrice,
        deliveryAddress,
        deliveryNumber,
        saleDate,
        status,
    });

    return createdSale;
};

module.exports = {
    registerSale,
};