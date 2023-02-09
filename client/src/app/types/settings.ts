export enum SettingsActionTypes {
  SET_ACTIVE_PAGE = 'SET_ACTIVE_PAGE',
}

export type PageType =
  | 'Home'
  | 'About'
  | 'Records'
  | 'Contacts'
  | 'Pricing'
  | 'Services'
  | 'Reports'
  | 'Statistics';

export interface SettingsState {
  activePage: PageType | null;
}

export interface SetActivePageAction {
  type: SettingsActionTypes.SET_ACTIVE_PAGE;
  payload: PageType;
}
