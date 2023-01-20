import React, { useEffect, useState, useMemo } from 'react';
import Layout from '../components/Layout';
import { Link } from 'react-router-dom';
import RecordsList from '../components/RecordsList';
import Spinner from '../components/Spinner';

const Records = ({ user, destroySession }) => {
  const [records, setRecords] = useState([]);
  const [totalIncome, setTotalIncome] = useState(null);
  const [totalExpenses, setTotalExpenses] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchRecords = async () => {
    setIsLoading(true);
    setTimeout(async () => {
      const response = await fetch('/records');
      const responseJson = await response.json();
      setRecords(responseJson.entries);
      setTotalIncome(responseJson.totalIncome);
      setTotalExpenses(responseJson.totalExpenses);
      setIsLoading(false);
    }, 1000);
  };

  useEffect(() => {
    fetchRecords();
  }, []);

  const total = useMemo(
    () => (totalIncome - totalExpenses).toFixed(2),
    [totalIncome, totalExpenses]
  );

  // if (!user || Object.keys(user)?.length === 0) {
  //   return null;
  // }

  return (
    <Layout user={user} destroySession={destroySession} active="Records">
      <Link to="/records/add">
        <button
          type="button"
          class="focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-8 dark:focus:ring-yellow-900"
        >
          Add entry
        </button>
      </Link>
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
          {user && Object.keys(user)?.length !== 0 ? (
            <RecordsList entries={records} setRecords={setRecords} />
          ) : null}
        </>
      )}
    </Layout>
  );
};

export default Records;
