import React, { useEffect, useState, useMemo, useContext } from 'react';
import { Link } from 'react-router-dom';
import { useActions } from 'app/store/hooks/useActions';
import { useTypedSelector } from 'app/store/hooks/useTypeSelector';
import { UserContext } from 'app/providers/UserContext';
import * as CategoriesActionCreators from 'app/store/action-creators/categories';
import * as RecordsActionCreators from 'app/store/action-creators/records';
import { Select } from 'shared/Select';
import { Spinner } from 'shared/Spinner';
import { RecordsList } from 'widgets/RecordsList';
import { useActivePage } from 'app/store/hooks/useActivePage';

export const RecordsPage = () => {
  useActivePage('Records');
  
  const { fetchCategories } = useActions(CategoriesActionCreators);
  const { fetchRecords } = useActions(RecordsActionCreators);
  const {
    categories,
    error: errorCategories,
    loading: loadingCategories,
  } = useTypedSelector((state) => state.categories);
  const {
    records,
    error: errorRecords,
    loading: loadingRecords,
    totalIncome,
    totalExpenses,
  } = useTypedSelector((state) => state.records);
  // console.log('🚀 ~ records', records);
  useEffect(() => {
    fetchCategories();
  }, []);
  const { user } = useContext(UserContext);
  const [categoryId, setCategoryId] = useState([]);
  let [startDate, setStartDate] = useState('');
  let [endDate, setEndDate] = useState('');

  useEffect(() => {
    if (!isDateCorrect) {
      return;
    }
    fetchRecords({ categoryId, startDate, endDate });
  }, [startDate, endDate, categoryId]);

  const total = useMemo(() => {
    if (totalIncome && totalExpenses) {
      return parseInt((totalIncome - totalExpenses).toFixed(2));
    } else {
      return 0;
    }
  }, [totalIncome, totalExpenses]);

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

  return (
    <>
      <div className="text-sm flex mb-8 items-end">
        <Link to="/records/add">
          <button
            type="button"
            className="flex-1 focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-4 dark:focus:ring-yellow-900"
          >
            Add entry
          </button>
        </Link>

        <div className="flex-1 mr-4">
          <label
            htmlFor="startDate"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Date from
          </label>
          <input
            type="date"
            // onChange={handleDateChange}
            // value={`${date?.getFullYear()}-0${date?.getMonth() + 1}-${date?.getDate()}`}
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
            // onChange={handleDateChange}
            // value={`${date?.getFullYear()}-0${date?.getMonth() + 1}-${date?.getDate()}`}
            name="endDate"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            id="endDate"
            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-green-600 focus:border-green-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
            required
          />
        </div>
        <Select
          // className="flex-1"
          showAll={true}
          onChange={(e) => {
            setCategoryId(e.target.value);
          }}
          title="Select a category of record"
          categories={categories}
        />
      </div>
      {!isDateCorrect ? <p>Date range incorrect</p> : null}
      {loadingRecords ? (
        <Spinner />
      ) : (
        <>
          <div className="text-sm flex mb-8">
            <div className="flex-1">
              Income: <span className="text-green-700">{totalIncome?.toFixed(2)}</span>
            </div>
            <div className="flex-1">
              Expenses: <span className="text-red-500">{totalExpenses?.toFixed(2)}</span>
            </div>
            {total && (
              <div className="flex-1">
                Total:{' '}
                <span className={`${total < 0 ? 'text-red-500' : 'text-green-700'}`}>{total}</span>
              </div>
            )}
          </div>
          {user && Object.keys(user)?.length !== 0 ? <RecordsList /> : null}
        </>
      )}
    </>
  );
};
