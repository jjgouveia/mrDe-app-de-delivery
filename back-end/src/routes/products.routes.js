const express = require('express');
const rescue = require('express-rescue');
const controller = require('../controllers/products.controller');

const router = express.Router();

router.get('/', rescue((req, res) => controller.getAllProducts(req, res)));

module.exports = router;