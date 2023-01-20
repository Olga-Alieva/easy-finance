import React from 'react';

const Select = ({ title, categories }) => {
  return (
    <div>
      <label
        htmlFor="categories"
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >
        {title}
      </label>
      <select
        name="category"
        id="categories"
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      >
        {categories.map((item) => (
          <option value={item.id} key={item.id}>
            {item.category}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;
