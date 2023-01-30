const express = require('express');
const rescue = require('express-rescue');
const controller = require('../controllers/user.controller');

const router = express.Router();

router.get('/allUsers', rescue((req, res) => controller.getAllUsers(req, res)));         
router.get('/sellers', rescue((req, res) => controller.getAllSellers(req, res)));                  
router.get('/:id', rescue((req, res) => controller.getUserById(req, res)));                  

module.exports = router;