const { Op } = require('sequelize');
const { Category, Entry } = require('../db/models');

const renderReports = async (req, res) => {
  const userId = req.session?.userId;
  const { startDate, endDate } = req.query;

  const hasOnlyStartDate = Boolean(startDate && !endDate);
  const hasOnlyEndDate = Boolean(endDate && !startDate);
  const hasBothDates = Boolean(endDate && startDate);

  const query = {
    user_id: userId,
    ...(hasOnlyStartDate && { date: { [Op.gte]: startDate } }),
    ...(hasOnlyEndDate && { date: { [Op.lte]: endDate } }),
    ...(hasBothDates && { date: { [Op.and]: { [Op.gte]: startDate, [Op.lte]: endDate } } }),
  };

  if (userId) {
    const dataForPeriod = [];
    const allEntries = await Entry.findAll({
      order: [
        ['date', 'DESC'],
        ['category_id', 'DESC'],
      ],
      where: query,
      raw: true,
      include: { model: Category },
    });

    const totalIncomeForReqPeriod = Math.floor(
      allEntries
        .filter((el) => el['Category.type_id'] === 2)
        .reduce((acc, el) => acc + Number(el.amount), 0)
    );
    const totalExpensesForReqPeriod = Math.floor(
      allEntries
        .filter((el) => el['Category.type_id'] === 1)
        .reduce((acc, el) => acc + Number(el.amount), 0)
    );
    const totalExpenses = allEntries.filter((el) => el['Category.type_id'] === 1);

    const objDataCateg = totalExpenses.reduce((obj, el) => {
      obj[el['Category.category']] = obj[el['Category.category']]
        ? obj[el['Category.category']] + Number(el.amount)
        : Number(el.amount);
      return obj;
    }, {});

    const dataCategories = Object.entries(objDataCateg)
      .sort((a, b) => b[1] - a[1])
      .map(([key, val]) => ({ name: key, value: val }))
      .slice(0, 5);
    dataForPeriod.push({
      income: totalIncomeForReqPeriod,
      expenses: totalExpensesForReqPeriod,
    });

    res.json({ dataCategories, dataForPeriod });
  }
};

module.exports = { renderReports };

// const newArr = Object.entries(objMap)
//   .sort((a, b) => b[1] - a[1])
//   .map(([key, val]) => ({ [key]: val }));
