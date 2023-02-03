const express = require('express');
const rescue = require('express-rescue');
const controller = require('../controllers/products.controller');

const router = express.Router();

router.get('/', rescue((req, res) => controller.getAllProducts(req, res)));
router.get('/:id', rescue((req, res) => controller.getProductListBySaleId(req, res)));
router.post('/:id', rescue((req, res) => controller.postProductListWithSaleId(req, res)));

module.exports = router;