const express = require('express');
const rescue = require('express-rescue');
const controller = require('../controllers/register.controller');
const authMiddeware = require('../../middlewares/auth.middeware');

const router = express.Router();

router.use(authMiddeware);
router.post('/', rescue((req, res) => controller.registerUserManager(req, res)));

module.exports = router;