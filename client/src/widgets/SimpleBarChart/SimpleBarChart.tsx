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

export const SimpleBarChart = () => {
  const [data, setData] = useState([]);
  const fetchStatisticsData = async () => {
    const response = await fetch('/statistics');
    const data = await response.json();
    setData(data);
  };

  useEffect(() => {
    fetchStatisticsData();
  }, []);

  // const { totalIncome, totalExpenses } = useTypedSelector((state) => state.records);
  // console.log('🚀 ~ totalExpenses', totalExpenses);
  // console.log('🚀 ~ totalIncome', totalIncome);
  useActivePage('Statistics');
  return (
    <BarChart
      width={800}
      height={600}
      data={data}
      margin={{
        top: 10,
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
  );
};
