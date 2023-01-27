import { initState } from '../initState';

export const entriesReducer = (state = initState, action) => {
  const { type, payload } = action;

  switch (type) {
    case 'SET_ENTRIES':
      return payload;
    case 'ADD_ENTRY':
      return [payload, ...state];
    case 'DEL_ENTRY':
      return state.filter((entry) => entry.id !== payload);
    default:
      return state;
  }
};
