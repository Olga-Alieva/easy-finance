/* eslint-disable camelcase */
const { Op } = require('sequelize');

const { Category, User, Type, Entry } = require('../db/models');

const renderRecords = async (req, res) => {
  const { category_id, startDate, endDate } = req.query;
  const userId = req.session?.userId;
  // `/records?category_id=${categoryId}&startDate=${startDate}&endDate=${endDate}`

  const hasOnlyStartDate = Boolean(startDate && !endDate);
  const hasOnlyEndDate = Boolean(endDate && !startDate);
  const hasBothDates = Boolean(endDate && startDate);

  const query = {
    user_id: userId,
    ...(category_id && { category_id }),
    ...(hasOnlyStartDate && { date: { [Op.gte]: startDate } }),
    ...(hasOnlyEndDate && { date: { [Op.lte]: endDate } }),
    ...(hasBothDates && { date: { [Op.and]: { [Op.gte]: startDate, [Op.lte]: endDate } } }),
  };


  if (userId) {
    const entries = await Entry.findAll({
      order: [['date', 'DESC']],
      where: query,
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
 
  const userId = req.session?.userId;
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
