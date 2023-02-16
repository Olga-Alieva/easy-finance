import React, { useEffect, useMemo, useState } from 'react';
import { PieChartSt } from 'widgets/PieChartSt';

export const Table = ({ income }: { income: number }) => {
  const [fedTax, setFedTax] = useState(0);
  const [provTax, setProvTax] = useState(0);
  const [cppTax, setCppTax] = useState(0);
  const [eiTax, setEiTax] = useState(0);
  const totalTax = useMemo(
    () => eiTax + cppTax + provTax + fedTax,
    [eiTax, cppTax, provTax, fedTax]
  );

  const data = [
    { name: 'Net pay', value: income - totalTax },
    { name: 'Total tax', value: totalTax },
  ];

  function federalTax(val: number) {
    if (val <= 53359) {
      return Math.floor(val * 0.15);
    } else if (val > 53359 && val <= 106717) {
      return Math.floor(53359 * 0.15 + (val - 53359) * 0.205);
    } else if (val > 106717 && val <= 165430) {
      return Math.floor(53359 * 0.15 + (106717 - 53359) * 0.205 + (val - 106717) * 0.26);
    } else if (val > 165430 && val <= 235675) {
      return Math.floor(
        53359 * 0.15 + (106717 - 53359) * 0.205 + (165430 - 106717) * 0.26 + (val - 165430) * 0.29
      );
    } else {
      return Math.floor(
        53359 * 0.15 +
          (106717 - 53359) * 0.205 +
          (165430 - 106717) * 0.26 +
          (235675 - 165430) * 0.29 +
          (val - 235675) * 0.33
      );
    }
  }

  function provincialTax(val: number) {
    if (val <= 49231) {
      return Math.floor(val * 0.0505);
    } else if (val > 49231 && val <= 98463) {
      return Math.floor(49231 * 0.0505 + (val - 49231) * 0.0915);
    } else if (val > 98463 && val <= 150000) {
      return Math.floor(49231 * 0.0505 + (98463 - 49231) * 0.0915 + (val - 98463) * 0.1116);
    } else if (val > 150000 && val <= 220000) {
      return Math.floor(
        49231 * 0.0505 +
          (98463 - 49231) * 0.0915 +
          (150000 - 98463) * 0.1116 +
          (val - 150000) * 0.1216
      );
    } else {
      return Math.floor(
        49231 * 0.0505 +
          (98463 - 49231) * 0.0915 +
          (150000 - 98463) * 0.1116 +
          (220000 - 150000) * 0.1216 +
          (val - 220000) * 0.1316
      );
    }
  }
  function cppTaxCalc(val: number) {
    if (val <= 66600 && val > 0) {
      return Math.floor((val - 3500) * 0.0595);
    } else if (val > 66600) {
      return Math.floor((66600 - 3500) * 0.0595);
    } else {
      return 0;
    }
  }
  function eiTaxCalc(val: number) {
    if (val <= 61500 && val > 0) {
      return Math.floor(val * 0.0163);
    } else if (val > 61500) {
      return Math.floor(61500 * 0.0163);
    } else {
      return 0;
    }
  }
  useEffect(() => {
    setFedTax(federalTax(income));
    setProvTax(provincialTax(income));
    setCppTax(cppTaxCalc(income));
    setEiTax(eiTaxCalc(income));
  }, [income]);
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
              <td className="px-6 py-4">{fedTax}</td>
            </tr>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800"
              >
                Provincial Tax
              </th>
              <td className="px-6 py-4">{provTax}</td>
            </tr>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800"
              >
                CPP
              </th>
              <td className="px-6 py-4">{(cppTax > 0 && cppTax) || 0}</td>
            </tr>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800"
              >
                EI
              </th>
              <td className="px-6 py-4">{eiTax}</td>
            </tr>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800"
              >
                TOTAL TAX
              </th>
              <td className="px-6 py-4">{(totalTax > 0 && totalTax) || 0}</td>
            </tr>
          </tbody>
        </table>
      </div>
      {income > 0 && <PieChartSt data={data} />}
    </div>
  );
};
