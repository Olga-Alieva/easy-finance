const express = require('express');
const checkUser = require('../middlewares/common');

const router = express.Router();

const {
  renderRecords,
  getCategories,
  addRecord,
  deleteEntry,
} = require('../controllers/recordsControllers');

router.get('/', checkUser, renderRecords).delete('/', checkUser, deleteEntry);
router.get('/categories', checkUser, getCategories);
router.post('/add', checkUser, addRecord);

module.exports = router;
