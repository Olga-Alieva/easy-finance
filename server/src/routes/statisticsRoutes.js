const express = require('express');
const checkUser = require('../middlewares/common');

const router = express.Router();

const { renderStatistics } = require('../controllers/statisticsControllerrs');

router.get('/', checkUser, renderStatistics);

module.exports = router;
