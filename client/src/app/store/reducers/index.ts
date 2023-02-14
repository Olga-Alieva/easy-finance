import { recordsReducer } from './recordsReducer';
import { combineReducers } from 'redux';
import { categoriesReducer } from './categoriesReducer';
import { settingsReducer } from './settingsReducer';
import { checkingReducer } from './checkingReducer';

export const rootReducer = combineReducers({
  categories: categoriesReducer,
  records: recordsReducer,
  settings: settingsReducer,
  checkterms: checkingReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
