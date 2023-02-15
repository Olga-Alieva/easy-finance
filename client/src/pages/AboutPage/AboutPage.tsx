import { useActivePage } from 'app/store/hooks/useActivePage';
import React from 'react';

export const AboutPage = () => {
  useActivePage('About');
  return (
    <section className="bg-white dark:bg-gray-900">
      <p className="max-w-2xl mt-8 mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400">
        <h1 className="max-w-xl mb-6 text-xl font-bold tracking-tight leading-none md:text-5xl xl:text-4xl dark:text-white">
          {' '}
          Make your money count
        </h1>
        Sometimes people do not know why they spend so much money. Our service helps you find this
        out. You can follow statistics of your expenses, prepare reports and analyze them to improve
        your financial situation.
      </p>
    </section>
  );
};
