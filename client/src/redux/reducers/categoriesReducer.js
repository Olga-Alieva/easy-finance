import { initState } from '../initState';

export const categoriesReducer = (state = initState, action) => {
  const { type, payload } = action;

  switch (type) {
    case 'SET_CATEGORIES':
      return payload;
    default:
      return state;
  }
};
