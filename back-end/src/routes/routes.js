const express = require('express');
const auth = require('../routes/auth.routes');

const routes = express.Router();

routes.use('/auth', auth);

module.exports = routes;