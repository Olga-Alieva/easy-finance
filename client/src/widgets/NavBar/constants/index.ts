import { NavigationType } from "app/types/settings";

export const navigation: NavigationType[] = [
  {
    name: 'Home',
    isHomePage: true,
    to: '/',
  },
  {
    name: 'Records',
    authOnly: true,
  },
  {
    name: 'Statistics',
    authOnly: true,
  },
  {
    name: 'Reports',
    authOnly: true,
  },
  {
    name: 'Taxes',
    authOnly: true,
  },
  {
    name: 'My Documents',
    authOnly: true,
    to: 'documents',
  },
  {
    name: 'About',
  },
  {
    name: 'Services',
  },
  {
    name: 'Pricing',
  },
  {
    name: 'Contacts',
  },
];
