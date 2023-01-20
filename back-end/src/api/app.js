const express = require('express');
const routes = require('../routes/routes');

const app = express();

app.get('/coffee', (_req, res) => res.status(418).end());

app.use(routes)

module.exports = app;
