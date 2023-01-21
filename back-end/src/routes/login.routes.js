const express = require('express');
const { getAccount } = require('../services/loginService');

const router = express.Router();

router.get('/', async (req, res) => {
    const t = await getAccount();
    res.status(200).send(t);
});

module.exports = router;