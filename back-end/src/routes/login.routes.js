const express = require('express');
const rescue = require('express-rescue');
const controller = require('../controllers/login.controller');

const router = express.Router();

router.post('/', rescue((req, res) => controller.loginRequest(req, res)));

module.exports = router;