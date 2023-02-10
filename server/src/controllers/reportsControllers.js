const { Op } = require('sequelize');
const { Category, Entry } = require('../db/models');

const renderReports = async (req, res) => {
  const userId = req.session?.userId;
  const { startDate, endDate } = req.query;
  console.log('🚀 ~ req.query', req.query);

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
    const data = [];
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
    const totalExpencesForReqPeriod = Math.floor(
      allEntries
        .filter((el) => el['Category.type_id'] === 1)
        .reduce((acc, el) => acc + Number(el.amount), 0)
    );

    data.push(
      { name: 'expences', value: totalExpencesForReqPeriod },
      { name: 'income', value: totalIncomeForReqPeriod }
    );
    res.json(data);
  }
};

module.exports = { renderReports };
