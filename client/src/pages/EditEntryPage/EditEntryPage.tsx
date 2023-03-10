import { useTypedSelector } from 'app/hooks/useTypeSelector';
import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { RadioButton } from 'shared/RadioButton';
import { Select } from 'shared/Select';

export const EditEntryPage = () => {
  // TODO: handle editing errors
  // const queryParams = new URLSearchParams(window.location.search);
  // const errorUrl = queryParams.get('error');
  // TODO: check date and amount - alert
  const navigate = useNavigate();
  const { id } = useParams();
  const { records } = useTypedSelector((state) => state.records);
  const [date, setDate] = useState('');
  const { categories } = useTypedSelector((state) => state.categories);

  const [active, setActive] = useState<1 | 2>(1);
  const [amount, setAmount] = useState(0);
  const [activeCat, setActiveCat] = useState(0);

  const currentCategories = useMemo(
    () => categories.filter((el) => el.type_id === active),
    [categories, active]
  );

  const record = records.find((el) => el.id === Number(id));
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(Number(e.target.value));
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDate(e.target.value);
  };

  useEffect(() => {
    setAmount(Number(record?.amount));
    const newActive = record ? record['Category.type_id'] : 1;
    setActive(newActive);
    setDate(record?.date || '');
    setActiveCat(record?.category_id || 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto lg:py-0">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-8 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Edit your record
            </h1>
            {/* {error ? <h3 className="text-red-600">{ERRORS_MAP[error]}</h3> : null} */}
            <form className="space-y-4 md:space-y-6" action={`/records/${id}`} method="POST">
              <RadioButton title="Type" active={active} setActive={setActive} />

              <div>
                <label
                  htmlFor="type"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Amount
                </label>
                <input
                  value={amount}
                  onChange={handleChange}
                  type="number"
                  step="0.01"
                  name="amount"
                  id="amount"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-green-600 focus:border-green-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
                  required
                />
              </div>

              <Select
                title="Select a category of record"
                categories={currentCategories}
                activeCat={activeCat}
              />
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
                  value={date}
                  name="date"
                  id="amount"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-green-600 focus:border-green-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
                  required
                />
              </div>
              <div className="text-sm flex mb-8 items-end">
                <button
                  type="submit"
                  className="w-full mr-4 text-white bg-green-600 hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                >
                  Submit
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
