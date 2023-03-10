import { DataItem } from 'pages/StatisticsPage/StatisticsPage';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

export const SimpleBarChart = ({
  data,
  height = 400,
}: {
  data: DataItem[];
  width?: number;
  height?: number;
}) => {
  return (
    <div className="max-w-sm">
      <ResponsiveContainer width={'100%'} height={height}>
        <BarChart
          data={data}
          margin={{
            top: 20,
            right: 0,
            left: 0,
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
      </ResponsiveContainer>
    </div>
  );
};
