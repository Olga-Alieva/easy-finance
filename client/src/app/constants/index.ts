
export enum ERROR {
  PASSWORD_INCORRECT = 'You entered incorrect password',
  EMAIL_NOT_FOUND = 'Email you entered was not found',
  ERROR_UNKNOWN = 'Something went wrong. Please try again.',
}

export const ITEMS_PER_PAGE = 10;

const currentDate = new Date();
export const PREVIOUS_MONTH = currentDate.getUTCMonth();
export const CURRENT_MONTH = currentDate.getUTCMonth() + 1;
export const CURRENT_YEAR = currentDate.getUTCFullYear();
export const CURRENT_DAY = currentDate.getUTCDate();

export const MONTH: Record<number, string> = {
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

function formatMonth(arg: number) {
  return arg.toString().length > 1 ? arg : `0${arg}`;
}
export const TODAY = CURRENT_YEAR + '-' + formatMonth(CURRENT_MONTH) + '-' + CURRENT_DAY;
export const START_OF_CURRENT_MONTH = CURRENT_YEAR + '-' + formatMonth(CURRENT_MONTH) + '-01';
