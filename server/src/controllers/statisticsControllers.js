const { Op } = require('sequelize');
const { Category, Entry } = require('../db/models');

const currentDate = new Date();
const PREVIOUS_MONTH = currentDate.getUTCMonth();
const CURRENT_YEAR = currentDate.getUTCFullYear();
const CUR_MONTH = currentDate.getUTCMonth() + 1;
const MONTHS = {
  1: 'January',
  2: 'February',
  3: 'March',
  4: 'April',
  5: 'May',
  6: 'June',
  7: 'July',
  8: 'August',
  9: 'September',
  10: 'October',
  11: 'November',
  12: 'December',
};

function formatMonth(arg) {
  return arg.toString().length > 1 ? arg : `0${arg}`;
}

const renderStatistics = async (req, res) => {
  const userId = req.session?.userId;
  if (userId) {
    const allEntries = await Entry.findAll({
      where: {
        user_id: userId,
        date: { [Op.gte]: `${CURRENT_YEAR}-01-01` },
      },
      raw: true,
      include: { model: Category },
    });

    const totalIncomeForTheYear = allEntries.filter((el) => el['Category.type_id'] === 2);
    const totalExpensesForTheYear = allEntries.filter((el) => el['Category.type_id'] === 1);
    // stat for the year
    const dataYear = [];
    for (let i = 1; i <= CUR_MONTH; i += 1) {
      const totalIncomePerMonth = Math.floor(
        totalIncomeForTheYear
          .filter(
            (el) =>
              el.date >= `${CURRENT_YEAR}-${formatMonth(i)}-01` &&
              el.date <= `${CURRENT_YEAR}-${formatMonth(i)}-31`
          )
          .reduce((acc, el) => acc + Number(el.amount), 0)
      );
      const totalExpensesPerMonth = Math.floor(
        totalExpensesForTheYear
          .filter(
            (el) =>
              el.date >= `${CURRENT_YEAR}-${formatMonth(i)}-01` &&
              el.date <= `${CURRENT_YEAR}-${formatMonth(i)}-31`
          )
          .reduce((acc, el) => acc + Number(el.amount), 0)
      );
      dataYear.push({
        name: `${MONTHS[i].slice(0, 3)} ${CURRENT_YEAR}`,
        income: totalIncomePerMonth,
        expenses: totalExpensesPerMonth,
      });
    }
    // stat per month
    const datesMap = [
      {
        start: '01',
        end: '08',
      },
      {
        start: '09',
        end: '16',
      },
      {
        start: '17',
        end: '23',
      },
      {
        start: '24',
        end: '31',
      },
    ];

    const prevMonth = formatMonth(PREVIOUS_MONTH);

    const dataMonth = datesMap.map((item, i) => ({
      name: `${i + 1} week`,
      expenses: Math.floor(
        totalExpensesForTheYear
          .filter(
            (el) =>
              el.date >= `${CURRENT_YEAR}-${prevMonth}-${item.start}` &&
              el.date <= `${CURRENT_YEAR}-${prevMonth}-${item.end}`
          )
          .reduce((acc, el) => acc + Number(el.amount), 0)
      ),
    }));

    res.json({ dataYear, dataMonth });
  }
};

module.exports = { renderStatistics };
