import { CheckingState, SetActiveTermsAction, CheckingActionTypes } from 'app/types/checking';

const initialState: CheckingState = {
  check: false,
};

export const checkingReducer = (
  state = initialState,
  action: SetActiveTermsAction
): CheckingState => {
  switch (action.type) {
    case CheckingActionTypes.SET_ACTIVE_TERM:
      return { ...state, check: action.payload };
    default:
      return state;
  }
};
