const express = require('express');
const checkUser = require('../middlewares/common');

const router = express.Router();

const { renderDocuments, uploadDocument } = require('../controllers/documentsControllers');

router.post('/find', checkUser, renderDocuments);
router.post('/', checkUser, uploadDocument);

module.exports = router;
