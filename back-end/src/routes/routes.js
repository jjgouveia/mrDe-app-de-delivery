const express = require('express');
const login = require('./login.routes');
const register = require('./register.routes');
const products = require('./products.routes');
const sales = require('./sales.routes');
const user = require('./user.routes');
const registerUserManager = require('./registerManager.routes');

const routes = express.Router();

routes.use('/login', login);
routes.use('/register', register);
routes.use('/products', products);
routes.use('/sales', sales);
routes.use('/user', user);
routes.use('/managerRegister', registerUserManager);

module.exports = routes;