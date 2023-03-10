import { useTypedSelector } from 'app/hooks/useTypeSelector';
import React, { FC } from 'react';
import { useCallback } from 'react';
import * as RecordsActionCreators from 'app/store/action-creators/records';
import { useActions } from 'app/hooks/useActions';
import { useNavigate } from 'react-router-dom';
import { Alert } from 'shared/Alert';

export const RecordsList: FC = () => {
  const navigate = useNavigate();
  const { deleteRecordFetch } = useActions(RecordsActionCreators);
  const { records } = useTypedSelector((state) => state.records);
  const [loadingItem, setloadingItem] = React.useState<number | null>(null);
  const [editingItem, setEditingItem] = React.useState<number | null>(null);
  const deleteRecord = useCallback(
    ({ id, type, amount }: { id: number; type: number; amount: string }) => {
      setloadingItem(id);
      deleteRecordFetch(id, type, amount);
    },
    []
  );

  const showEdit = useCallback((id: number | null) => {
    setEditingItem(id);
  }, []);

  const editModal = (id: number) => {
    navigate(`/records/${id}`);
  };

  if (records.length === 0) {
    return <Alert text={'There is no data for given filters'} />;
  }

  return (
    <div>
      <div className="flex flex-col">
        <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
            <div className="overflow-hidden">
              <table className="min-w-full">
                <thead className="bg-white border-b">
                  <tr>
                    <th
                      scope="col"
                      className="text-sm font-medium text-gray-900 py-4 text-left"
                    ></th>
                    <th
                      scope="col"
                      className="text-sm font-medium text-gray-900 pl-6 py-4 text-left"
                    >
                      Amount
                    </th>
                    <th
                      scope="col"
                      className="text-sm font-medium text-gray-900 pl-6 py-4 text-left"
                    >
                      Category
                    </th>
                    <th
                      scope="col"
                      className="text-sm font-medium text-gray-900 pl-6 py-4 text-left"
                    >
                      Date
                    </th>
                    <th className="w-12"></th>
                    <th className="w-12"></th>
                  </tr>
                </thead>
                <tbody>
                  {records.map((entry, i) => (
                    <tr
                      key={entry.id}
                      onMouseEnter={() => showEdit(entry.id)}
                      onMouseLeave={() => showEdit(null)}
                      className={`border-b ${i % 2 === 0 ? 'bg-gray-100' : 'bg-white'}`}
                    >
                      <td className="pl-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {i + 1}
                      </td>
                      <td
                        className={`text-sm  font-light pl-6 py-4 whitespace-nowrap ${
                          entry['Category.type_id'] === 1 ? 'text-red-500' : 'text-green-700'
                        }`}
                      >
                        {entry['Category.type_id'] === 1 ? '-' : '+'}
                        {entry.amount}
                      </td>
                      <td className="text-sm text-gray-900 font-light pl-6 py-4 whitespace-nowrap">
                        {entry['Category.category']}
                      </td>
                      <td className="text-sm text-gray-900 font-light pl-6 py-4 whitespace-nowrap">
                        {entry.date}
                      </td>
                      <td>
                        <button
                          onClick={() =>
                            deleteRecord({
                              id: entry.id,
                              type: entry['Category.type_id'],
                              amount: entry.amount,
                            })
                          }
                          type="button"
                          className="text-gray-900 text-xs bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded px-2 py-1 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                        >
                          {loadingItem === entry.id ? '...' : 'x'}
                        </button>
                      </td>
                      <td>
                        {editingItem === entry.id ? (
                          <button
                            onClick={() => editModal(entry.id)}
                            type="button"
                            className="text-gray-500 text-xs bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded px-2 py-1 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                          >
                            edit
                          </button>
                        ) : null}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
