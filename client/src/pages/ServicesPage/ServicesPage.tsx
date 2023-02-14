import { useActivePage } from 'app/store/hooks/useActivePage';
import React from 'react';

export const ServicesPage = () => {
  useActivePage('Services');
  return (
    <p className="max-w-2xl mt-8 mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400">
      We can make changes to the application according to your requirements. Please contact us.
    </p>
  );
};
