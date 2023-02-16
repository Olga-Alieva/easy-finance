import { FC } from 'react';

interface RadioButtonProps {
  title: string;
  active: number;
  setActive: React.Dispatch<React.SetStateAction<1 | 2>>;
}

export const RadioButton: FC<RadioButtonProps> = ({ title, active, setActive }) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setActive(Number(event.target.value) as 1 | 2);
  };

  return (
    <div>
      <h3 className="block mb-2 text-sm font-medium text-gray-900 dark:text-whixte">{title}</h3>
      <ul className="items-center w-full text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg sm:flex dark:bg-gray-700 dark:border-gray-600 dark:text-white">
        <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
          <div className="flex items-center pl-3">
            <input
              id="expense"
              type="radio"
              name="type"
              checked={active === 1}
              value="1"
              onChange={handleChange}
              className="w-4 h-4 text-green-600 bg-gray-100 border-gray-300  "
            />
            <label
              htmlFor="expense"
              className="w-full py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Expense{' '}
            </label>
          </div>
        </li>
        <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
          <div className="flex items-center pl-3">
            <input
              id="income"
              type="radio"
              name="type"
              value="2"
              onChange={handleChange}
              checked={active === 2}
              className="w-4 h-4 text-green-600 bg-gray-100 border-gray-300"
            />
            <label
              htmlFor="income"
              className="w-full py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Income
            </label>
          </div>
        </li>
      </ul>
    </div>
  );
};
