import { FC, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTypedSelector } from 'app/store/hooks/useTypeSelector';
import { Alert } from 'shared/Alert';
import { RadioButton } from 'shared/RadioButton';
import { Select } from 'shared/Select';
import { TODAY } from 'app/constants';

export const AddEntryPage: FC = () => {
  const [isCorrectDate, setIsCorrectDate] = useState(true);
  const [active, setActive] = useState(1);
  const [amount, setAmount] = useState(0);
  const [touched, setTouched] = useState(false);
  const [date, setDate] = useState('');

  const navigate = useNavigate();

  const { categories, error, loading } = useTypedSelector((state) => state.categories);

  const currentCategories = useMemo(
    () => categories.filter((el) => el.type_id === active),
    [categories, active]
  );

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDate(e.target.value);
  };

  const checkDate = () => {
    if (date > TODAY) {
      return false;
    } else return true;
  };

  const isIncorrectAmount = useMemo(() => touched && amount <= 0, [touched, amount]);

  useEffect(() => {
    setIsCorrectDate(checkDate());
  }, [date]);

  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto lg:py-0">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-8 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Add new record
            </h1>
            {/* {error ? <h3 className="text-red-600">{ERRORS_MAP[error]}</h3> : null} */}
            <form className="space-y-4 md:space-y-6" action="/records/add" method="POST">
              <RadioButton title="Type" active={active} setActive={setActive} />

              <div>
                <label
                  htmlFor="type"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Amount
                </label>
                <input
                  onChange={(e) => {
                    setAmount(Number(e.target.value));
                    if (!touched) setTouched(true);
                  }}
                  type="number"
                  step="0.01"
                  name="amount"
                  id="amount"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-green-600 focus:border-green-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
                  placeholder="enter the amount"
                  required
                />
              </div>

              <Select title="Select a category of record" categories={currentCategories} />
              {!isCorrectDate && <Alert text={'DATE IS INCORRECT'} />}
              {isIncorrectAmount ? <Alert text={'AMOUNT SHOULD BE ABOVE ZERO'} /> : null}
              <div>
                <label
                  htmlFor="date"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Date
                </label>
                <input
                  type="date"
                  onChange={handleDateChange}
                  value={date || TODAY}
                  name="date"
                  id="date"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-green-600 focus:border-green-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
                  required
                />
              </div>
              {}
              <div className="text-sm flex mb-8 items-end">
                <button
                  disabled={!isCorrectDate || isIncorrectAmount}
                  type="submit"
                  className="w-full mr-4 text-white bg-green-600 disabled:bg-gray-400 disabled:opacity-75 hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                >
                  Add
                </button>

                <button
                  onClick={() => navigate('/records')}
                  className="w-full text-white bg-gray-600 hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
