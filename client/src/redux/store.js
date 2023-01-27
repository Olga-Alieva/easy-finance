import { initState } from './initState';
import { rootReducer } from './reducers/rootReducer';
import { createStore, applyMiddleware } from 'redux';

export const store = createStore(rootReducer, initState);
