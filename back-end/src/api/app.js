const express = require('express');
const cors = require('cors');
const path = require('path');

const imagesPath = path.join(__dirname, '../../../front-end/src/Data _test/images');
const routes = require('../routes/routes');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/coffee', (_req, res) => res.status(418).end());

app.get('/', (_req, res) => res.redirect('/login'));

app.use(routes);

app.use('/images', express.static(imagesPath));

module.exports = app;
