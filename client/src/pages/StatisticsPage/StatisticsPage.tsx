import { CURRENT_YEAR, MONTH, PREVIOUS_MONTH } from 'app/constants';
import { useActivePage } from 'app/store/hooks/useActivePage';
import { useEffect, useState } from 'react';
import { OneBarChart } from 'widgets/OneBarChart';
import { SimpleBarChart } from 'widgets/SimpleBarChart';

export type DataItem = {
  name: string;
  income: number;
  expences?: number;
};

type DataType = {
  dataYear: DataItem[];
  dataMonth: DataItem[];
};

export const StatisticsPage = () => {
  useActivePage('Statistics');

  const [data, setData] = useState<DataType>({ dataYear: [], dataMonth: [] });

  const fetchStatisticsData = async () => {
    const response = await fetch('/statistics');
    const newData = await response.json();
    setData(newData);
  };

  useEffect(() => {
    fetchStatisticsData();
  }, []);

  return (
    <>
      Statistics for the year of {CURRENT_YEAR}:
      <SimpleBarChart data={data.dataYear} />
      Your expences for {MONTH[PREVIOUS_MONTH]}:
      <OneBarChart data={data.dataMonth} />
    </>
  );
};
