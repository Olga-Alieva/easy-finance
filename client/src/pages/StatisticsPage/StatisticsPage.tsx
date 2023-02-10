import { useActivePage } from 'app/store/hooks/useActivePage';
import React from 'react';
import { SimpleBarChart } from 'widgets/SimpleBarChart';

export const StatisticsPage = () => {
  useActivePage('Statistics');
  return <SimpleBarChart/>;
};
