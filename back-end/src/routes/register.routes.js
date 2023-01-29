const express = require('express');
const rescue = require('express-rescue');
const controller = require('../controllers/register.controller');
const userController = require('../controllers/user.controller');

const router = express.Router();

router.post('/', rescue((req, res) => controller.registerUser(req, res)));

module.exports = router;