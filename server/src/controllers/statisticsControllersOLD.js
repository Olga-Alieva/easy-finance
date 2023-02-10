const { Op } = require('sequelize');

const { Category, Entry } = require('../db/models');

const currentDate = new Date();
const PREVIOUS_MONTH = currentDate.getUTCMonth();
const CURRENT_YEAR = currentDate.getUTCFullYear();
console.log('🚀 ~ CURRENT_YEAR', CURRENT_YEAR);

const FULL_MONTH_OF_DAYS_ONE_NUMBER = [1, 3, 5, 7, 8];
const FULL_MONTH_OF_DAYS_TWO_NUMBERS = [10, 12];
const NOT_FULL_MONTH_OF_DAYS_ONE_NUMBER = [2, 4, 6, 9];
// const NOT_FULL_MONTH_OF_DAYS_TWO_NUMBERS = [11];
const FEBRUARY = [2];
const LEAP_YEARS = [2024, 2028, 2032, 2036];
console.log('🚀 ~ month', PREVIOUS_MONTH);
// months from 1-12
// let month = date.getUTCMonth() + 1;
// let day = date.getUTCDate();
// let year = date.getUTCFullYear();
// newdate = year + "/" + month + "/" + day;

const renderStatistics = async (req, res) => {
  const userId = req.session?.userId;
  if (userId) {
    // сделать цикл и пушить в массив объекты с данными для статистики
    // stat jan 2023
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
    console.log('🚀 ~ allEntriesJanuary', allEntriesJanuary);
    const totalIncomeJanuary = Number(
      allEntriesJanuary
        .filter((el) => el['Category.type_id'] === 2)
        .reduce((acc, el) => acc + Number(el.amount), 0)
        .toFixed(2)
    );

    const totalExpensesJanuary = Number(
      allEntriesJanuary
        .filter((el) => el['Category.type_id'] === 1)
        .reduce((acc, el) => acc + Number(el.amount), 0)
        .toFixed(2)
    );
    // stat feb 2023
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
    const totalIncomeFebruary = Number(
      allEntriesFebruary
        .filter((el) => el['Category.type_id'] === 2)
        .reduce((acc, el) => acc + Number(el.amount), 0)
        .toFixed(2)
    );

    const totalExpensesFebruary = Number(
      allEntriesFebruary
        .filter((el) => el['Category.type_id'] === 1)
        .reduce((acc, el) => acc + Number(el.amount), 0)
        .toFixed(2)
    );
    
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
    // stat for previous month expences

    let allExpencesPrevMonth;

    if (FULL_MONTH_OF_DAYS_ONE_NUMBER.includes(PREVIOUS_MONTH)) {
      console.log('condition 1');
      allExpencesPrevMonth = await Entry.findAll({
        order: [
          ['date', 'DESC'],
          ['category_id', 'DESC'],
        ],
        include: { model: Category },
        where: {
          user_id: userId,
          date: {
            [Op.and]: {
              [Op.gte]: `${CURRENT_YEAR}-0${PREVIOUS_MONTH}-01`,
              [Op.lte]: `${CURRENT_YEAR}-0${PREVIOUS_MONTH}-31`,
            },
          },
        },
        raw: true,
      });
      console.log('🚀 ~ allExpencesPrevMonth======', allExpencesPrevMonth);
    } else if (FULL_MONTH_OF_DAYS_TWO_NUMBERS.includes(PREVIOUS_MONTH)) {
      allExpencesPrevMonth = await Entry.findAll({
        order: [
          ['date', 'DESC'],
          ['category_id', 'DESC'],
        ],
        where: {
          user_id: userId,
          date: {
            [Op.and]: {
              [Op.gte]: `${CURRENT_YEAR}-${PREVIOUS_MONTH}-01`,
              [Op.lte]: `${CURRENT_YEAR}-${PREVIOUS_MONTH}-31`,
            },
          },
        },
        raw: true,
        include: { model: Category },
      });
    } else if (FEBRUARY.include(PREVIOUS_MONTH) && !LEAP_YEARS.includes(CURRENT_YEAR)) {
      allExpencesPrevMonth = await Entry.findAll({
        order: [
          ['date', 'DESC'],
          ['category_id', 'DESC'],
        ],
        where: {
          user_id: userId,
          date: {
            [Op.and]: {
              [Op.gte]: `${CURRENT_YEAR}-${PREVIOUS_MONTH}-01`,
              [Op.lte]: `${CURRENT_YEAR}-${PREVIOUS_MONTH}-28`,
            },
          },
        },
        raw: true,
        include: { model: Category },
      });
    } else if (FEBRUARY.include(PREVIOUS_MONTH) && LEAP_YEARS.includes(CURRENT_YEAR)) {
      allExpencesPrevMonth = await Entry.findAll({
        order: [
          ['date', 'DESC'],
          ['category_id', 'DESC'],
        ],
        where: {
          user_id: userId,
          date: {
            [Op.and]: {
              [Op.gte]: `${CURRENT_YEAR}-${PREVIOUS_MONTH}-01`,
              [Op.lte]: `${CURRENT_YEAR}-${PREVIOUS_MONTH}-29`,
            },
          },
        },
        raw: true,
        include: { model: Category },
      });
    } else if (NOT_FULL_MONTH_OF_DAYS_ONE_NUMBER.includes(PREVIOUS_MONTH)) {
      allExpencesPrevMonth = await Entry.findAll({
        order: [
          ['date', 'DESC'],
          ['category_id', 'DESC'],
        ],
        where: {
          user_id: userId,
          date: {
            [Op.and]: {
              [Op.gte]: `${CURRENT_YEAR}-0${PREVIOUS_MONTH}-01`,
              [Op.lte]: `${CURRENT_YEAR}-0${PREVIOUS_MONTH}-30`,
            },
          },
        },
        raw: true,
        include: { model: Category },
      });
    } else {
      allExpencesPrevMonth = await Entry.findAll({
        order: [
          ['date', 'DESC'],
          ['category_id', 'DESC'],
        ],
        where: {
          user_id: userId,
          date: {
            [Op.and]: {
              [Op.gte]: `${CURRENT_YEAR}-${PREVIOUS_MONTH}-01`,
              [Op.lte]: `${CURRENT_YEAR}-${PREVIOUS_MONTH}-30`,
            },
          },
        },
        raw: true,
        include: { model: Category },
      });
    }
    const firstweek = [1, 2, 3, 4, 5, 6, 7, 10];
    const totalExpencesPrevMonthFirstWeek = allExpencesPrevMonth.filter(
      (el) => el['Category.type_id'] === 1 && firstweek.includes(Number(el.date.slice(-2)))
    );

    console.log('🚀 ~ totalExpencesPrevMonth', totalExpencesPrevMonthFirstWeek);

    // const totalIncomeFebruary = Number(
    //   allEntriesFebruary
    //     .filter((el) => el['Category.type_id'] === 2)
    //     .reduce((acc, el) => acc + Number(el.amount), 0)
    //     .toFixed(2)
    // );

    // date: '2023-01-10',

    // const totalExpensesFebruary = Number(
    //   allEntriesFebruary
    //     .filter((el) => el['Category.type_id'] === 1)
    //     .reduce((acc, el) => acc + Number(el.amount), 0)
    //     .toFixed(2)
    // );

    res.json(data);
  }
};

module.exports = { renderStatistics };
