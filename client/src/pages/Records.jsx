import React, { useEffect, useState, useMemo, useContext } from 'react';
import Layout from '../components/Layout';
import { Link } from 'react-router-dom';
import RecordsList from '../components/RecordsList';
import Spinner from '../components/Spinner';
import Select from '../components/form/Select';
import { UserContext } from '../context/UserContext';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';

const Records = () => {
  const dispatch = useDispatch();
  const { user } = useContext(UserContext);
  const [totalIncome, setTotalIncome] = useState(null);
  const [totalExpenses, setTotalExpenses] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  // const [categories, setCategories] = useState([]);
  const [categoryId, setCategoryId] = useState([]);
  let [startDate, setStartDate] = useState(null);
  let [endDate, setEndDate] = useState(null);
  const categories = useSelector((state) => state.categories);

  const fetchCategories = async () => {
    const response = await fetch('/records/categories');
    const responseJson = await response.json();
    dispatch({ type: 'SET_CATEGORIES', payload: responseJson.categories });
    // setCategories(responseJson.categories);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchRecords = async (e) => {
    if (!isDateCorrect) {
      return;
    }

    setIsLoading(true);
    setTimeout(async () => {
      const response = await fetch(
        `/records?category_id=${categoryId || ''}&startDate=${startDate || ''}&endDate=${
          endDate || ''
        }`
      );
      const responseJson = await response.json();
      dispatch({ type: 'SET_ENTRIES', payload: responseJson.entries });
      // setRecords(responseJson.entries);
      setTotalIncome(responseJson.totalIncome);
      setTotalExpenses(responseJson.totalExpenses);
      setIsLoading(false);
    }, 1000);
  };

  useEffect(() => {
    fetchRecords();
  }, [startDate, endDate, categoryId]);

  const total = useMemo(
    () => (totalIncome - totalExpenses).toFixed(2),
    [totalIncome, totalExpenses]
  );

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
    <Layout active="Records">
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
          className="flex-1"
          showAll={true}
          onChange={(e) => {
            setCategoryId(e.target.value);
          }}
          title="Select a category of record"
          categories={categories}
        />
      </div>
      {!isDateCorrect ? <p>Date range incorrect</p> : null}
      {isLoading ? (
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
            <div className="flex-1">
              Total:{' '}
              <span className={`${total < 0 ? 'text-red-500' : 'text-green-700'}`}>{total}</span>
            </div>
          </div>
          {user && Object.keys(user)?.length !== 0 ? <RecordsList /> : null}
        </>
      )}
    </Layout>
  );
};

export default Records;
