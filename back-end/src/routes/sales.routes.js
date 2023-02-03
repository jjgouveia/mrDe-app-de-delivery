const express = require('express');
const rescue = require('express-rescue');
const authMiddeware = require('../../middlewares/auth.middeware');
const controller = require('../controllers/sales.controller');

const router = express.Router();

router.use(authMiddeware);

router.post('/', rescue((req, res) => controller.registerSale(req, res)));
router.get('/', rescue((req, res) => controller.getAllSales(req, res)));
router.get('/order/:order_id', rescue((req, res) => controller.getOrderById(req, res)));
router.get('/:user_id', rescue((req, res) => controller.getUserSallesById(req, res)));
router.get('/seller/:seller_id', rescue((req, res) => controller.getSellerSallesById(req, res)));
router.patch('/updateStatus/:id', rescue((req, res) => controller.updateSales(req, res)));

module.exports = router;