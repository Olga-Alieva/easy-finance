import { SettingsState, SetActivePageAction, SettingsActionTypes } from 'app/types/settings';

const initialState: SettingsState = {
  activePage: null,
};

export const settingsReducer = (
  state = initialState,
  action: SetActivePageAction
): SettingsState => {
  switch (action.type) {
    case SettingsActionTypes.SET_ACTIVE_PAGE:
      return { ...state, activePage: action.payload };

    default:
      return state;
  }
};
