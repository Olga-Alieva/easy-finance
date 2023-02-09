/* eslint-disable camelcase */
const { Op } = require('sequelize');

const { Category, Entry } = require('../db/models');

const renderRecords = async (req, res) => {
  const { category_id, startDate, endDate, limit, offset } = req.query;
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
    const allEntries = await Entry.findAll({
      order: [
        ['date', 'DESC'],
        ['category_id', 'DESC'],
      ],
      where: query,
      raw: true,
      include: { model: Category },
    });
    const entries = await Entry.findAll({
      offset,
      limit,
      order: [
        ['date', 'DESC'],
        ['category_id', 'DESC'],
      ],
      where: query,
      raw: true,
      include: { model: Category },
      // include: [{ model: Category, include: [{ model: Type }] }],
    });

    const totalIncome = +allEntries
      .filter((el) => el['Category.type_id'] === 2)
      .reduce((acc, el) => acc + +el.amount, 0)
      .toFixed(2);
    const totalExpenses = +allEntries
      .filter((el) => el['Category.type_id'] === 1)
      .reduce((acc, el) => acc + +el.amount, 0)
      .toFixed(2);
    const totalEntries = await Entry.count({ where: query });

    res.json({ entries, totalIncome, totalExpenses, totalEntries });
  }
};

const getCategories = async (req, res) => {
  const categories = await Category.findAll({ raw: true });
  res.json(categories);
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
