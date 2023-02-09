import { recordsReducer } from './recordsReducer';
import { combineReducers } from 'redux';
import { categoriesReducer } from './categoriesReducer';
import { settingsReducer } from './settingsReducer';

export const rootReducer = combineReducers({
  categories: categoriesReducer,
  records: recordsReducer,
  settings: settingsReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
