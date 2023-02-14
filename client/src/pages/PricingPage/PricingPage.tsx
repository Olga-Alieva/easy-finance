import { useActivePage } from 'app/store/hooks/useActivePage';
import React from 'react';

export const PricingPage = () => {
  useActivePage('Pricing');
  return <div>PricingPage</div>;
};
