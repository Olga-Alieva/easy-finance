import { useActivePage } from 'app/store/hooks/useActivePage';
import React from 'react';

export const AboutPage = () => {
  useActivePage('About');
  return (
    <p className="max-w-2xl mt-8 mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400">
      Sometimes people do not know why they spend so much money. Our service helps you to find out
      it. You can follow statistics of your expenses, prepare reports and analyze them to improve
      your financial situation.
    </p>
  );
};
