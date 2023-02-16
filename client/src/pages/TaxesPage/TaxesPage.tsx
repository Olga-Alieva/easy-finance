import { useEffect, useState } from 'react';
import { useActivePage } from 'app/store/hooks/useActivePage';
import axios from 'axios';
import { Table } from 'shared/Table';
import { useDebounce } from 'app/store/hooks/useDebounce';
import { Spinner } from 'shared/Spinner';

export const TaxesPage = () => {
  useActivePage('Taxes');
  const [income, setIncome] = useState(0);
  const [isSearching, setIsSearching] = useState<boolean>(false);

  const handleIncome = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsSearching(true);
    setIncome(Number(e.target.value));
  };

  const debouncedIncome = useDebounce<number>(income, 1000);

  useEffect(
    () => {
      if (debouncedIncome) {
        setIsSearching(false);
      }
    },
    [debouncedIncome] // Only call effect if debounced search term changes
  );

  return (
    <div>
      <h1 style={{ fontWeight: 'bold', textAlign: 'center' }}>Income tax calculator Ontario</h1>
      <p className="mt-8">Find out how much your salary is after tax</p>
      <div>
        <label
          htmlFor="type"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white mt-8"
        >
          Enter your gross income per year, CAD:
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
      {isSearching && income ? (
        <div className="mt-8">
          <Spinner />
        </div>
      ) : (
        <Table income={debouncedIncome} />
      )}
    </div>
  );
};
