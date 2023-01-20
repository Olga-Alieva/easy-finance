const express = require('express');

const router = express.Router();

const {  regUser } = require('../controllers/regControllers');

router.post('/', regUser);

module.exports = router;
