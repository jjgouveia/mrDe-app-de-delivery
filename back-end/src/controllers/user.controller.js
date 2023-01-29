const service = require('../services/user.service');

 const getUserById = async (req, res) => {
    const { id } = req.params;
    const user = await service.getUserById(id);
    return res.status(200).json(user)
}

const getAllSellers = async (req, res) => {
    const sellers = await service.getAllSellers();
    return res.status(200).json(sellers);
} 

module.exports = {
    getUserById,
    getAllSellers,
}