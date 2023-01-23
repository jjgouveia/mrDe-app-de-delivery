const express = require('express');
const login = require('./login.routes');
const register = require('./register.routes');

const routes = express.Router();

routes.use('/login', login);
routes.use('/register', register);

module.exports = routes;