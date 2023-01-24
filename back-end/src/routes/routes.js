const express = require('express');
const login = require('./login.routes');
const register = require('./register.routes');
const products = require('./products.routes');

const routes = express.Router();

routes.use('/login', login);
routes.use('/register', register);
routes.use('/products', products);

module.exports = routes;