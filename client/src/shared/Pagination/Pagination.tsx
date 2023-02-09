import { useState } from 'react';
import ReactPaginate from 'react-paginate';
import { ITEMS_PER_PAGE } from 'app/constants';

interface PaginationType {
  totalEntries: number;
}

export const usePagination = ({ totalEntries }: PaginationType) => {
  const [currentPage, setCurrentPage] = useState(0);

  const offset = currentPage * ITEMS_PER_PAGE;
  const limit = ITEMS_PER_PAGE;

  const handlePageClick = ({ selected: selectedPage }: { selected: number }) => {
    setCurrentPage(selectedPage);
  };

  const renderPagination = (): JSX.Element => (
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
  );
  return { renderPagination, limit, offset };
};
