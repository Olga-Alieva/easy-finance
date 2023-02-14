import { CheckingState } from './../../types/checking';
import { CheckingActionTypes } from 'app/types/checking';

export const setCheckTerms = (status: CheckingState) => {
  return { type: CheckingActionTypes.SET_ACTIVE_TERM, payload: status };
};
