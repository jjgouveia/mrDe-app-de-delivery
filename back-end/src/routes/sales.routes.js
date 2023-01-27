const express = require('express');
const rescue = require('express-rescue');
const controller = require('../controllers/sales.controller');

const router = express.Router();

router.post('/', rescue((req, res) => controller.registerSale(req, res)));

module.exports = router;