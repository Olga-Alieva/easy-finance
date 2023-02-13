import { DataItem } from 'pages/StatisticsPage/StatisticsPage';
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

export const SimpleBarChart = ({
  data,
  width = 500,
  height = 400,
}: {
  data: DataItem[];
  width?: number;
  height?: number;
}) => {
  console.log(data);
  return (
    <>
      <BarChart
        width={width}
        height={height}
        data={data}
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
        <Bar dataKey="expenses" fill="#8884d8" />
      </BarChart>
    </>
  );
};
