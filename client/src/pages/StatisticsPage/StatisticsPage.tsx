import { CURRENT_YEAR, MONTH, PREVIOUS_MONTH } from 'app/constants';
import { useActivePage } from 'app/hooks/useActivePage';
import { useEffect, useState } from 'react';
import { OneBarChart } from 'widgets/OneBarChart';
import { SimpleBarChart } from 'widgets/SimpleBarChart';

export type DataItem = {
  name?: string;
  income: number;
  expenses?: number;
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
      <div className="text-sm flex flex-col md:flex-row mb-8 md:items-end mt-8">
        <div className="flex-1 mr-0 md:mr-4 mb-8 md:mb-0 ">
          <div className="mb-4">Statistics for the year of {CURRENT_YEAR}:</div>
          <SimpleBarChart data={data.dataYear} />
        </div>

        <div className="flex-1 mr-0 md:mr-4">
          <div className="mb-4">Your expenses for {MONTH[PREVIOUS_MONTH]}:</div>
          <OneBarChart data={data.dataMonth} />
        </div>
      </div>
    </>
  );
};
