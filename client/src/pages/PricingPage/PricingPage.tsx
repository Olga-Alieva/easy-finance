import { useActivePage } from 'app/store/hooks/useActivePage';
import React from 'react';

export const PricingPage = () => {
  useActivePage('Pricing');
  return (
    <p className="max-w-2xl mt-8 mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400">
      Please contact us to receive information about our prices.
    </p>
  );
};
