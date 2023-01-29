const express = require('express');
const rescue = require('express-rescue');
const controller = require('../controllers/user.controller');

const router = express.Router();

router.get('/:id', rescue((req, res) => controller.getUserById(req, res)));

module.exports = router;