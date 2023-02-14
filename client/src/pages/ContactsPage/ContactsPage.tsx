import { useActivePage } from 'app/store/hooks/useActivePage';
import React from 'react';

export const ContactsPage = () => {
  useActivePage('Contacts');
  return <div>ContactsPage</div>;
};
