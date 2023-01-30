const express = require('express');
const rescue = require('express-rescue');
const controller = require('../controllers/user.controller');

const router = express.Router();
      
router.get('/', rescue((req, res) => controller.getAllSellers(req, res)));
router.delete('/:id', rescue((req, res) => controller.deleteUserById(req, res)));             
router.get('/:id', rescue((req, res) => controller.getUserById(req, res)));              

module.exports = router;