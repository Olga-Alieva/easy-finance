import { useActivePage } from 'app/store/hooks/useActivePage';
import React from 'react';

export const AboutPage = () => {
  useActivePage('About');
  return <div>AboutPage</div>;
};
