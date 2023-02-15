import { useActivePage } from 'app/store/hooks/useActivePage';
import React from 'react';

export const PricingPage = () => {
  useActivePage('Pricing');
  return (
    <div className="inline-flex mt-8">
      <h1 className="max-w-2xl mb-2 font-light text-gray-500 lg:mb-2 md:text-lg lg:text-xl dark:text-gray-400 mr-2">
        For information about pricing, please contact us at
      </h1>
      <h1 className="text-xl font-medium">olga.a.alieva@gmail.com</h1>
    </div>
  );
};
