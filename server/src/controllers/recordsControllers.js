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
    try {
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

      const totalIncome = Number(
        allEntries
          .filter((el) => el['Category.type_id'] === 2)
          .reduce((acc, el) => acc + Number(el.amount), 0)
          .toFixed(2)
      );
      const totalExpenses = Number(
        allEntries
          .filter((el) => el['Category.type_id'] === 1)
          .reduce((acc, el) => acc + Number(el.amount), 0)
          .toFixed(2)
      );
      const totalEntries = await Entry.count({ where: query });

      res.json({ entries, totalIncome, totalExpenses, totalEntries });
    } catch (err) {
      console.log(err);
    }
  }
};

const getCategories = async (req, res) => {
  try {
    const categories = await Category.findAll({ raw: true });
    res.json(categories);
  } catch (err) {
    console.log(err);
  }
};

const addRecord = async (req, res) => {
  const userId = req.session?.userId;
  const { category, date, amount } = req.body;
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
const editRecord = async (req, res) => {
  const userId = req.session?.userId;
  try {
    const { id } = req.params;
    const { amount, category, date } = req.body;
    const entry = await Entry.findOne({ where: { id }, raw: true });
    if (userId === entry.user_id) {
      await Entry.update(
        {
          amount,
          category_id: category,
          date,
        },
        { where: { id } }
      );
      res.redirect('/records');
    } else {
      const message = 'edit_error';
      res.redirect(`/records/${id}?error=${message}`);
      // TODO error-message
    }
  } catch (err) {
    console.log(err);
  }
};

module.exports = { renderRecords, getCategories, addRecord, deleteEntry, editRecord };
