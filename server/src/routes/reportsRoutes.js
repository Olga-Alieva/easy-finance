const express = require('express');
const checkUser = require('../middlewares/common');

const router = express.Router();

const { renderReports } = require('../controllers/reportsControllers');

router.get('/', checkUser, renderReports);

module.exports = router;
