import { useActivePage } from 'app/store/hooks/useActivePage';
import React from 'react';

export const ServicesPage = () => {
  useActivePage('Services');
  return <div>ServicesPage</div>;
};
