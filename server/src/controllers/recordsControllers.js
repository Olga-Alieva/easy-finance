const { Category, User, Type, Entry } = require('../db/models');

const renderRecords = async (req, res) => {
  const userId = req.session?.userId;
  if (userId) {
    const entries = await Entry.findAll({
      order: [['date', 'DESC']],
      where: { user_id: userId },
      raw: true,
      include: { model: Category },
      // include: [{ model: Category, include: [{ model: Type }] }],
    });

    const totalIncome = entries
      .filter((el) => el['Category.type_id'] === 2)
      .reduce((acc, el) => acc + +el.amount, 0);
    const totalExpenses = entries
      .filter((el) => el['Category.type_id'] === 1)
      .reduce((acc, el) => acc + +el.amount, 0);
    console.log('🚀 ~ totalExpenses', totalExpenses);

    res.json({ entries, totalIncome, totalExpenses });
  }
};
const getCategories = async (req, res) => {
  const categories = await Category.findAll({ raw: true });
  // console.log('🚀 ~ categories', categories);
  res.json({ categories });
};
const addRecord = async (req, res) => {
  const { category, date, amount } = req.body;
  // console.log('🚀 ~ req.body', req.body);
  // type: 'income',
  // amount: '345.66',
  // category: '37',
  // date: '2023-01-21'
  const userId = req.session?.userId;
  // console.log('🚀 ~ userId', userId);
  try {
    if (userId) {
      await Entry.create({ user_id: userId, category_id: category, date, amount });
      res.redirect('/records');
    }
  } catch (err) {
    console.log(err);
  }
};
const deleteEntry = async (req, res) => {
  const userId = req.session?.userId;
  try {
    const { id } = req.body;
    const entry = await Entry.findOne({ where: { id }, raw: true });
    // console.log('🚀 ~ entry', entry);

    if (userId === entry.user_id) {
      await Entry.destroy({ where: { id } });
      res.json({ isSuccessful: true });
    } else {
      res.json({ isSuccessful: false });
    }
  } catch (err) {
    console.log(err);
    res.json({ isSuccessful: false });
  }
};

module.exports = { renderRecords, getCategories, addRecord, deleteEntry };
