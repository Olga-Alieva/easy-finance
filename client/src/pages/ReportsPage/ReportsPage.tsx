import { useActivePage } from 'app/store/hooks/useActivePage';
import React, { useEffect, useMemo, useState } from 'react';
import { useStore } from 'react-redux';
import { PieChartSt } from 'widgets/PieChartSt';
import { SimpleBarChart } from 'widgets/SimpleBarChart';

export const ReportsPage = () => {
  useActivePage('Reports');
  let [startDate, setStartDate] = useState('');
  let [endDate, setEndDate] = useState('');
  const [data, setData] = useState([]);
  const isDateCorrect = useMemo(() => {
    if (endDate && startDate) {
      if (new Date(endDate) >= new Date(startDate)) {
        return true;
      } else {
        return false;
      }
    } else {
      return true;
    }
  }, [startDate, endDate]);

  const fetchReports = async () => {
    if (!isDateCorrect) {
      return;
    }
    // setIsLoading(true);
    // setTimeout(
    // async () => {
    const response = await fetch(`/reports?&startDate=${startDate || ''}&endDate=${endDate || ''}`);
    const data = await response.json();
    setData(data);
    console.log('🚀 ~ responseJson', data);
    // setIsLoading(false);
    // }, 1000);
  };

  useEffect(() => {
    fetchReports();
  }, [startDate, endDate]);

  return (
    <div className="text-sm flex mb-8 items-end">
      <div className="flex-1 mr-4">
        <label
          htmlFor="startDate"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Date from
        </label>
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          name="startDate"
          id="startDate"
          className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-green-600 focus:border-green-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
          required
        />
      </div>
      <div className="flex-1 mr-4">
        <label
          htmlFor="endDate"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          to
        </label>
        <input
          type="date"
          name="endDate"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          id="endDate"
          className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-green-600 focus:border-green-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
          required
        />
      </div>
      {/* <PieChartSt data={data} /> */}
      <PieChartSt data={data} />

    </div>
  );
};
