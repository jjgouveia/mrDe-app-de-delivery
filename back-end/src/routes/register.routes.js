const express = require('express');
const rescue = require('express-rescue');
const controller = require('../controllers/register.controller');
// const authMiddeware = require('../../middlewares/auth.middeware');

const router = express.Router();

router.post('/', rescue((req, res) => controller.registerUser(req, res)));
// router.use(authMiddeware);
// router.post('/manager', rescue((req, res) => controller.registerUserManager(req, res)));

module.exports = router;