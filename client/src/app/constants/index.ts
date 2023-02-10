export enum ERROR {
  PASSWORD_INCORRECT = 'You entered incorrect password',
  EMAIL_NOT_FOUND = 'Email you entered was not found',
  ERROR_UNKNOWN = 'Something went wrong. Please try again',
}

export const ERRORS_MAP = {
  password_incorrect: 'You entered incorrect password',
  email_not_found: 'Email you entered was not found',
  error_unknown: 'Something went wrong. Please try again',
};

export const ITEMS_PER_PAGE = 5;

const currentDate = new Date();
export const PREVIOUS_MONTH = currentDate.getUTCMonth();
export const CURRENT_YEAR = currentDate.getUTCFullYear();

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
