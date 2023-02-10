const { Op } = require('sequelize');
const { Category, Entry } = require('../db/models');

const currentDate = new Date();
const PREVIOUS_MONTH = currentDate.getUTCMonth();
const CURRENT_YEAR = currentDate.getUTCFullYear();

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

    const totalExpencesForTheYear = allEntries.filter((el) => el['Category.type_id'] === 1);
    // stat for the year
    // Jan========
    const totalIncomeJanuary = Math.floor(
      totalIncomeForTheYear
        .filter((el) => el.date >= `${CURRENT_YEAR}-01-01` && el.date <= `${CURRENT_YEAR}-01-31`)
        .reduce((acc, el) => acc + Number(el.amount), 0)
    );

    const totalExpensesJanuary = Math.floor(
      totalExpencesForTheYear
        .filter((el) => el.date >= `${CURRENT_YEAR}-01-01` && el.date <= `${CURRENT_YEAR}-01-31`)
        .reduce((acc, el) => acc + Number(el.amount), 0)
    );
    // Feb========
    const totalIncomeFebruary = Math.floor(
      totalIncomeForTheYear
        .filter((el) => el.date >= `${CURRENT_YEAR}-02-01` && el.date <= `${CURRENT_YEAR}-02-28`)
        .reduce((acc, el) => acc + Number(el.amount), 0)
    );

    const totalExpensesFebruary = Math.floor(
      totalExpencesForTheYear
        .filter((el) => el.date >= `${CURRENT_YEAR}-02-01` && el.date <= `${CURRENT_YEAR}-02-28`)
        .reduce((acc, el) => acc + Number(el.amount), 0)
    );
    // stat for the prev month
    const prevMonth = formatMonth(PREVIOUS_MONTH);
    const totalExpencesForTheFirstWeek = Math.floor(
      totalExpencesForTheYear
        .filter(
          (el) =>
            el.date >= `${CURRENT_YEAR}-${prevMonth}-01` &&
            el.date <= `${CURRENT_YEAR}-${prevMonth}-08`
        )
        .reduce((acc, el) => acc + Number(el.amount), 0)
    );
    const totalExpencesForTheSecondWeek = Math.floor(
      totalExpencesForTheYear
        .filter(
          (el) =>
            el.date >= `${CURRENT_YEAR}-${prevMonth}-09` &&
            el.date <= `${CURRENT_YEAR}-${prevMonth}-16`
        )
        .reduce((acc, el) => acc + Number(el.amount), 0)
    );
    const totalExpencesForTheThirdWeek = Math.floor(
      totalExpencesForTheYear
        .filter(
          (el) =>
            el.date >= `${CURRENT_YEAR}-${prevMonth}-17` &&
            el.date <= `${CURRENT_YEAR}-${prevMonth}-23`
        )
        .reduce((acc, el) => acc + Number(el.amount), 0)
    );
    const totalExpencesForTheForthWeek = Math.floor(
      totalExpencesForTheYear
        .filter(
          (el) =>
            el.date >= `${CURRENT_YEAR}-${prevMonth}-24` &&
            el.date <= `${CURRENT_YEAR}-${prevMonth}-31`
        )
        .reduce((acc, el) => acc + Number(el.amount), 0)
    );

    const dataYear = [
      {
        name: `Jan ${CURRENT_YEAR}`,
        income: totalIncomeJanuary,
        expences: totalExpensesJanuary,
      },
      {
        name: `Feb ${CURRENT_YEAR}`,
        income: totalIncomeFebruary,
        expences: totalExpensesFebruary,
      },
    ];

    const dataMonth = [
      {
        name: '1 week',
        expences: totalExpencesForTheFirstWeek,
      },
      {
        name: '2 week',
        expences: totalExpencesForTheSecondWeek,
      },
      {
        name: '3 week',
        expences: totalExpencesForTheThirdWeek,
      },
      {
        name: '4 week',
        expences: totalExpencesForTheForthWeek,
      },
    ];
    res.json({ dataYear, dataMonth });
  }
};

module.exports = { renderStatistics };
