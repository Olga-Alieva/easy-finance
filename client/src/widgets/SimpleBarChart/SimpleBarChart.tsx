import { CURRENT_YEAR, MONTH, PREVIOUS_MONTH } from 'app/constants';
import { useActivePage } from 'app/store/hooks/useActivePage';
import { useTypedSelector } from 'app/store/hooks/useTypeSelector';
import { useEffect, useState } from 'react';
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { OneBarChart } from 'widgets/OneBarChart';

export type DataItem = {
  name: string;
  income: number;
  expences?: number;
};

type DataType = {
  dataYear: DataItem[];
  dataMonth: DataItem[];
};

export const SimpleBarChart = () => {
  const [data, setData] = useState<DataType>({ dataYear: [], dataMonth: [] });

  const fetchStatisticsData = async () => {
    const response = await fetch('/statistics');
    const newData = await response.json();
    setData(newData);
  };

  useEffect(() => {
    fetchStatisticsData();
  }, []);

  // const { totalIncome, totalExpenses } = useTypedSelector((state) => state.records);
  // console.log('🚀 ~ totalExpenses', totalExpenses);
  // console.log('🚀 ~ totalIncome', totalIncome);
  useActivePage('Statistics');
  return (
    <>
      Statistics for the year of {CURRENT_YEAR}:
      <BarChart
        width={500}
        height={400}
        data={data.dataYear}
        margin={{
          top: 20,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="income" fill="#82ca9d" />
        <Bar dataKey="expences" fill="#8884d8" />
      </BarChart>
      Your expences for {MONTH[PREVIOUS_MONTH]}:
      <OneBarChart data={data.dataMonth} />
    </>
  );
};
