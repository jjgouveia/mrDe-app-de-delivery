const express = require('express');
const cors = require('cors');

const routes = require('../routes/routes');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/coffee', (_req, res) => res.status(418).end());

app.get('/', (_req, res) => res.redirect('/login'));

app.use(routes)

module.exports = app;
