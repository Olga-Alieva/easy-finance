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

export const ITEMS_PER_PAGE = 10;

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

// export const TAXES = {
//   AB: { fedTax: 0.2, provTax: 0.05 },
//   ON: { fedTax: 0.2, provTax: 0.05 },
//   BC: { fedTax: 0.2, provTax: 0.05 },
//   NL: { fedTax: 0.2, provTax: 0.05 },
//   NT: { fedTax: 0.2, provTax: 0.05 },
//   NS: { fedTax: 0.2, provTax: 0.05 },
//   NU: { fedTax: 0.2, provTax: 0.05 },
//   PE: { fedTax: 0.2, provTax: 0.05 },
//   QC: { fedTax: 0.2, provTax: 0.05 },
//   SK: { fedTax: 0.2, provTax: 0.05 },
//   YT: { fedTax: 0.2, provTax: 0.05 },
//   MB: { fedTax: 0.2, provTax: 0.05 },
//   NB: { fedTax: 0.2, provTax: 0.05 },
// };
