import { PageType, SettingsActionTypes } from 'app/types/settings';

export const setActivePage = (activePage: PageType) => {
  return { type: SettingsActionTypes.SET_ACTIVE_PAGE, payload: activePage };
};
