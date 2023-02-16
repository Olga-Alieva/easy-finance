import { START_OF_CURRENT_MONTH } from 'app/constants';
import { useActivePage } from 'app/store/hooks/useActivePage';
import { DataItem } from 'pages/StatisticsPage/StatisticsPage';
import React, { useEffect, useMemo, useState } from 'react';
import { useStore } from 'react-redux';
import { Alert } from 'shared/Alert';
import { OneBarChart } from 'widgets/OneBarChart';
import { PieChartSt } from 'widgets/PieChartSt';
import { DataElem } from 'widgets/PieChartSt/PieChartSt';
import { SimpleBarChart } from 'widgets/SimpleBarChart';

type DataTypeReports = {
  dataCategories: DataElem[];
  dataForPeriod: DataItem[];
};

export const ReportsPage = () => {
  useActivePage('Reports');

  let [startDate, setStartDate] = useState('');
  let [endDate, setEndDate] = useState('');
  const [data, setData] = useState<DataTypeReports>({ dataCategories: [], dataForPeriod: [] });

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
    const response = await fetch(
      `/reports?&startDate=${startDate || START_OF_CURRENT_MONTH}&endDate=${endDate || ''}`
    );
    const data = await response.json();
    setData(data);
  };

  const renderCategoriesChart = () => {
    if (data.dataCategories.length === 0) return null;

    return (
      <div className="flex-1 mr-0 md:mr-4 mb-8 md:mb-0">
        <p>Top 5 expenses:</p>
        <PieChartSt data={data.dataCategories} />
      </div>
    );
  };

  const renderDataChart = () => {
    if (data?.dataForPeriod[0]?.income === 0 && data?.dataForPeriod[0]?.expenses === 0) return null;

    return (
      <div className="flex-1 mr-0 md:mr-4">
        <p>Data for required period:</p>
        <SimpleBarChart data={data.dataForPeriod} height={400} />
      </div>
    );
  };

  useEffect(() => {
    fetchReports();
  }, [startDate, endDate]);

  return (
    <div>
      <p className="mb-4 mt-4">Enter the date range to get your reports:</p>
      {/* <div className="text-sm flex mb-8 items-end mt-8"> */}
      <div className="text-sm flex flex-col md:flex-row mb-8 md:items-end ">
        <div className="flex-1 mr-4">
          <label
            htmlFor="startDate"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Date from
          </label>
          <input
            type="date"
            value={startDate || START_OF_CURRENT_MONTH}
            onChange={(e) => setStartDate(e.target.value)}
            name="startDate"
            id="startDate"
            className="bg-gray-50 border mb-4 md:mb-0 border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-green-600 focus:border-green-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
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
      </div>

      {!isDateCorrect ? (
        <Alert text={'Date range incorrect'} />
      ) : (
        <div className="text-sm flex flex-col md:flex-row mb-8 md:items-end mt-8">
          {renderCategoriesChart()}
          {renderDataChart()}
        </div>
      )}
    </div>
  );
};
