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
import ReactPaginate from 'react-paginate';
import { ITEMS_PER_PAGE, TODAY } from 'app/constants';
import { Alert } from 'shared/Alert';

export const RecordsPage = () => {
  useActivePage('Records');

  const { fetchCategories } = useActions(CategoriesActionCreators);
  const { fetchRecords } = useActions(RecordsActionCreators);
  const { categories } = useTypedSelector((state) => state.categories);
  const {
    loading: loadingRecords,
    totalIncome,
    totalExpenses,
    totalEntries,
  } = useTypedSelector((state) => state.records);



  useEffect(() => {
    fetchCategories();
  }, []);

  const { user } = useContext(UserContext);
  const [categoryId, setCategoryId] = useState([]);
  let [startDate, setStartDate] = useState('');
  let [endDate, setEndDate] = useState('');

  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    if (!isDateCorrect) {
      return;
    }
    fetchRecords({
      categoryId,
      startDate,
      endDate,
      offset: currentPage * ITEMS_PER_PAGE,
      limit: ITEMS_PER_PAGE,
    });
  }, [startDate, endDate, categoryId, currentPage]);

  const total = useMemo(() => {
    if (totalIncome && totalExpenses) {
      return Number((totalIncome - totalExpenses).toFixed(2));
    } else {
      return 0;
    }
  }, [totalIncome, totalExpenses]);

  const isDateCorrect = useMemo(() => {
    if (endDate && startDate) {
      if (new Date(startDate) <= new Date() && new Date(endDate) > new Date()) {
        return false;
      } else if (endDate > TODAY && startDate > TODAY) {
        return false;
      } else if (new Date(endDate) >= new Date(startDate)) {
        return true;
      } else {
        return false;
      }
    } else if (endDate > TODAY || startDate > TODAY) {
      return false;
      // } else if (startDate > TODAY) {
      //   return false;
    } else {
      return true;
    }
  }, [startDate, endDate]);

  function handlePageClick({ selected: selectedPage }: { selected: number }) {
    setCurrentPage(selectedPage);
  }

  return (
    <>
      <div className="text-sm flex flex-col md:flex-row mb-8 md:items-end ">
        <Link to="/records/add" className="mb-4 md:mb-0">
          <button
            type="button"
            className="flex-1 focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-4 dark:focus:ring-yellow-900"
          >
            Add entry
          </button>
        </Link>

        <div className="flex-1 mr-0 md:mr-4">
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
            className="mb-4 md:mb-0 bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-green-600 focus:border-green-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
            required
          />
        </div>
        <div className="flex-1 mr-0 md:mr-4">
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
            className="mb-4 md:mb-0 bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-green-600 focus:border-green-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
            required
          />
        </div>
        <Select
          showAll={true}
          onChange={(e) => {
            setCategoryId(e.target.value);
          }}
          title="Select a category of record"
          categories={categories}
        />
      </div>
      {!isDateCorrect ? (
       <Alert text={'DATE RANGE IS INCORRECT'}/>
      ) : null}
      {loadingRecords ? (
        <Spinner />
      ) : (
        <>
          <div className="text-sm flex mb-8">
            {totalIncome > 0 && (
              <div className="flex-1 mr-16">
                Income: <span className="text-green-700">{totalIncome?.toFixed(2)}</span>
              </div>
            )}
            {totalExpenses > 0 && (
              <div className="flex-1">
                Expenses: <span className="text-red-500">{totalExpenses?.toFixed(2)}</span>
              </div>
            )}
            {total !== 0 && (
              <div className="flex-1 ml-16">
                Total:{' '}
                <span className={`${total < 0 ? 'text-red-500' : 'text-green-700'}`}>{total}</span>
              </div>
            )}
          </div>
          {user && Object.keys(user)?.length !== 0 ? (
            <>
              <RecordsList />
              {totalEntries > 0 && totalEntries > ITEMS_PER_PAGE ? (
                <div className="text-center mt-6">
                  {
                    <ReactPaginate
                      previousLabel={'← Previous'}
                      nextLabel={'Next →'}
                      breakLabel="..."
                      pageRangeDisplayed={5}
                      pageCount={Math.ceil(totalEntries / ITEMS_PER_PAGE)}
                      onPageChange={handlePageClick}
                      forcePage={currentPage}
                      containerClassName={'inline-flex -space-x-px'}
                      previousLinkClassName={
                        'px-3 py-2 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'
                      }
                      nextLinkClassName={
                        'px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'
                      }
                      pageLinkClassName={
                        'px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'
                      }
                      activeLinkClassName={
                        'px-3 py-2 text-green-600 border border-gray-300 bg-green-50 hover:bg-green-100 hover:text-green-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white'
                      }
                    />
                  }
                </div>
              ) : null}
            </>
          ) : null}
        </>
      )}
    </>
  );
};
