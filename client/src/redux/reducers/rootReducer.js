import { categoriesReducer } from './categoriesReducer';
import { entriesReducer } from './entriesReducer';

import { combineReducers } from 'redux';

export const rootReducer = combineReducers({
  entries: entriesReducer,
  categories: categoriesReducer,
});
