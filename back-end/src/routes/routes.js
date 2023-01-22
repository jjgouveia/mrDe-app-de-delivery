const express = require('express');
const login = require('./login.routes');

const routes = express.Router();

routes.use('/login', login);

module.exports = routes;