const express = require('express');

const router = express.Router();

const { checkAuthUser } = require('../controllers/authControllers');

router.get('/', checkAuthUser);

module.exports = router;
