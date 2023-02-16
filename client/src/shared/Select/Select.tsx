import { CategoryType } from 'app/types/categories';

interface SelectProps {
  categories?: CategoryType[];
  title?: string;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  showAll?: boolean;
  activeCat?: number | 0;
}

export const Select = ({
  title,
  categories,
  onChange,
  showAll = false,
  activeCat,
}: SelectProps) => {
  return (
    <div>
      <label
        htmlFor="categories"
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >
        {title}
      </label>
      <select
        defaultValue={activeCat}
        onChange={onChange}
        name="category"
        id="categories"
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      >
        {showAll && <option value="">All</option>}
        {categories?.map((item) => (
          <option value={item.id} selected={item.id === activeCat} key={item.id}>
            {item.category}
          </option>
        ))}
      </select>
    </div>
  );
};
