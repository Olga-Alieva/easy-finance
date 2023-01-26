import React from 'react';

const RecordsList = ({ entries, setRecords }) => {
  const [loadingItem, setloadingItem] = React.useState(null);

  const deleteRecord = async (id) => {
    setloadingItem(id);
    setTimeout(async () => {
      const response = await fetch('/records', {
        method: 'DELETE',
        body: JSON.stringify({ id }),
        headers: { 'Content-type': 'application/json' },
      });
      const responseJson = await response.json();
      if (responseJson.isSuccessful) {
        setRecords(entries.filter((el) => el.id !== id));
      }
    }, 1000);
  };

  return (
    <div>
      <div class="flex flex-col">
        <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div class="py-2 inline-block min-w-full sm:px-6 lg:px-8">
            <div class="overflow-hidden">
              <table class="min-w-full">
                <thead class="bg-white border-b">
                  <tr>
                    <th
                      scope="col"
                      class="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                    ></th>
                    <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                      Amount
                    </th>
                    <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                      Category
                    </th>
                    <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                      Date
                    </th>
                    <th style={{ width: '100px' }}></th>
                  </tr>
                </thead>
                <tbody>
                  {entries.map((entry, i) => (
                    <tr class={`border-b ${i % 2 === 0 ? 'bg-gray-100' : 'bg-white'}`}>
                      <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {i + 1}
                      </td>
                      <td
                        class={`text-sm  font-light px-6 py-4 whitespace-nowrap ${
                          entry['Category.type_id'] === 1 ? 'text-red-500' : 'text-green-700'
                        }`}
                      >
                        {entry['Category.type_id'] === 1 ? '-' : '+'}
                        {entry.amount}
                      </td>
                      <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                        {entry['Category.category']}
                      </td>
                      <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                        {entry.date}
                      </td>
                      <td className="">
                        <button
                          onClick={() => deleteRecord(entry.id)}
                          type="button"
                          class="text-gray-900 text-xs bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded px-2 py-1 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                        >
                          {loadingItem === entry.id ? 'deleting...' : 'x'}
                        </button>
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

export default RecordsList;
