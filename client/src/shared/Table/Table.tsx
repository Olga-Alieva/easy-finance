import React from 'react';
import { PieChartSt } from 'widgets/PieChartSt';

export const Table = ({ income }: { income: number }) => {
  const data = [
    { name: 'Net pay', value: income - income * 0.28 },
    { name: 'Total tax', value: income * 0.28 },
  ];

  return (
    <div>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-8">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3 bg-gray-50 dark:bg-gray-800">
                Withholding
              </th>
              <th scope="col" className="px-6 py-3">
                Tax deduction, CAD
              </th>
              {/* <th scope="col" className="px-6 py-3 bg-gray-50 dark:bg-gray-800">
                Category
              </th>
              <th scope="col" className="px-6 py-3">
                Price
              </th> */}
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800"
              >
                Federal Tax
              </th>
              <td className="px-6 py-4">{income * 0.2}</td>
            </tr>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800"
              >
                Provincial Tax
              </th>
              <td className="px-6 py-4">{income * 0.05}</td>
            </tr>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800"
              >
                CPP
              </th>
              <td className="px-6 py-4">{income * 0.02}</td>
            </tr>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800"
              >
                EI
              </th>
              <td className="px-6 py-4">{income * 0.01}</td>
            </tr>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800"
              >
                TOTAL TAX
              </th>
              <td className="px-6 py-4">
                {income * 0.01 + income * 0.02 + income * 0.05 + income * 0.2}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <PieChartSt data={data} />
    </div>
  );
};
