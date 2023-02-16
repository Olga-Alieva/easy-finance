import { CURRENT_YEAR } from 'app/constants';

const years: number[] = [];
for (let i = CURRENT_YEAR - 6; i <= CURRENT_YEAR; i += 1) {
  years.push(i);
}

export const AddDocument = () => {
  return (
    <form id="uploadForm" action="/documents" method="post" encType="multipart/form-data">
      <div className="mb-6">
        <label
          htmlFor="categories"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Choose the year
        </label>
        <select
          defaultValue={CURRENT_YEAR}
          name="year"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        >
          {years?.map((item, i) => (
            <option value={item} selected={item === CURRENT_YEAR} key={i}>
              {item}
            </option>
          ))}
        </select>
      </div>
      <label
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        htmlFor="file_input"
      >
        Upload file
      </label>
      <input
        required
        className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
        id="file_input"
        type="file"
        name="doc"
      />
      <div className="mb-4 mt-6">
        <label
          htmlFor="default-input"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Enter the title of your document
        </label>
        <input
          required
          name="title"
          type="text"
          id="default-input"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
      </div>

      <button
        className="inline-flex mt-4 items-center justify-center px-10 py-2 mr-3 text-base font-medium text-center text-white rounded-lg bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-900"
        type="submit"
      >
        Upload
      </button>
    </form>
  );
};
