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
  | 'Statistics'
  | 'My Documents'
  | 'Taxes';

export interface SettingsState {
  activePage: PageType | null;
}

export interface SetActivePageAction {
  type: SettingsActionTypes.SET_ACTIVE_PAGE;
  payload: PageType;
}

export type NavigationType = {
  name: PageType;
  to?: string;
  authOnly?: boolean;
  isHomePage?: boolean;
};
