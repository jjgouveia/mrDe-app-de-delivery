const express = require('express');
const rescue = require('express-rescue');
const authMiddeware = require('../../middlewares/auth.middeware');
const controller = require('../controllers/sales.controller');

const router = express.Router();

router.use(authMiddeware);

router.post('/', rescue((req, res) => controller.registerSale(req, res)));

module.exports = router;