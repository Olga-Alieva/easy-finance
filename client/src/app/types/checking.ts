export interface CheckingState {
  check: boolean;
}

export enum CheckingActionTypes {
  SET_ACTIVE_TERM = 'SET_ACTIVE_TERM',
}

export interface SetActiveTermsAction {
  type: CheckingActionTypes.SET_ACTIVE_TERM;
  payload: boolean;
}
