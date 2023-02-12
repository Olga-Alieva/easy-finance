import { useActivePage } from 'app/store/hooks/useActivePage';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

export const TaxesPage = () => {
  useActivePage('Taxes');
  const [income, setIncome] = useState(0);
  const handleIncome = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIncome(Number(e.target.value));
  };
  const fetchApiData = async () => {
    // const response = await axios.get('https://api.salestaxapi.ca/v2/federal/gst');
    const response = await fetch('https://api.salestaxapi.ca');
    const data = await response.json();
    console.log('🚀 ~ response', data);
  };

  useEffect(() => {
    fetchApiData();
  }, []);
  // function fedTax (income) => {
  //   if(income<=50197){
  //     return 0.015
  //   }
  //   else if(income>50197&&income<=100392){
  //     return 0.
  //   }
  // };

  return (
    <div>
      <div>
        <label
          htmlFor="type"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Your income per year, CAD:
        </label>
        <input
          type="number"
          step="0.01"
          onChange={handleIncome}
          name="amount"
          id="amount"
          className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-green-600 focus:border-green-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
          required
        />
      </div>
      <p>{income}</p>
    </div>
  );
};
