const { Op } = require('sequelize');

const { Category, Entry } = require('../db/models');

const renderStatistics = async (req, res) => {
  const userId = req.session?.userId;
  if (userId) {
    const allEntriesJanuary = await Entry.findAll({
      order: [
        ['date', 'DESC'],
        ['category_id', 'DESC'],
      ],
      where: {
        user_id: userId,
        date: { [Op.and]: { [Op.gte]: '2023-01-01', [Op.lte]: '2023-01-31' } },
      },
      raw: true,
      include: { model: Category },
    });
    const totalIncomeJanuary = +allEntriesJanuary
      .filter((el) => el['Category.type_id'] === 2)
      .reduce((acc, el) => acc + +el.amount, 0)
      .toFixed(2);

    const totalExpensesJanuary = +allEntriesJanuary
      .filter((el) => el['Category.type_id'] === 1)
      .reduce((acc, el) => acc + +el.amount, 0)
      .toFixed(2);

    const allEntriesFebruary = await Entry.findAll({
      order: [
        ['date', 'DESC'],
        ['category_id', 'DESC'],
      ],
      where: {
        user_id: userId,
        date: { [Op.and]: { [Op.gte]: '2023-02-01', [Op.lte]: '2023-02-28' } },
      },
      raw: true,
      include: { model: Category },
    });
    const totalIncomeFebruary = +allEntriesFebruary
      .filter((el) => el['Category.type_id'] === 2)
      .reduce((acc, el) => acc + +el.amount, 0)
      .toFixed(2);

    const totalExpensesFebruary = +allEntriesFebruary
      .filter((el) => el['Category.type_id'] === 1)
      .reduce((acc, el) => acc + +el.amount, 0)
      .toFixed(2);
    const data = [
      {
        name: 'Jan 2023',
        income: totalIncomeJanuary,
        expences: totalExpensesJanuary,
        // amt: Math.abs(totalExpensesJanuary - totalIncomeJanuary),
      },
      {
        name: 'Feb 2023',
        income: totalIncomeFebruary,
        expences: totalExpensesFebruary,
        // amt: Math.abs(totalExpensesFebruary - totalIncomeFebruary),
      },
    ];

    res.json(data);
  }
};

module.exports = { renderStatistics };
