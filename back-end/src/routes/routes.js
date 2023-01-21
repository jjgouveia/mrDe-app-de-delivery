const express = require('express');
const login = require('../routes/login.routes');

const routes = express.Router();

routes.use('/login', login);

module.exports = routes;