import { CURRENT_YEAR } from 'app/constants';
import { useActivePage } from 'app/store/hooks/useActivePage';
import { ChangeEvent, FormEvent, useState } from 'react';
import { Link } from 'react-router-dom';

type DocType = {
  createdAt: string;
  id: number;
  path: string;
  title: string;
  updatedAt: string;
  user_id: number;
  year: number;
};

const years: number[] = [];
for (let i = CURRENT_YEAR - 6; i <= CURRENT_YEAR; i += 1) {
  years.push(i);
}
export const DocumentsPage = () => {
  useActivePage('My Documents');

  const [year, setYear] = useState<number>(CURRENT_YEAR);
  const [docs, setDocs] = useState<DocType[]>([]);
  const [docRender, setDocRender] = useState<boolean>(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    fetch('/documents/find', {
      method: 'POST',
      body: JSON.stringify({ year }),
      headers: { 'Content-type': 'application/json' },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.length === 0) setDocRender(true);
        else setDocRender(false);
        setDocs(data);
      })
      .catch((err) => console.error(err));
  };

  return (
    <div>
      <Link to="/documents/add">
        <button
          type="button"
          className="flex-1 mt-4 focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-4 dark:focus:ring-yellow-900"
        >
          Add new document
        </button>
      </Link>
      <form
        id="uploadForm"
        action="/documents/find"
        method="post"
        encType="multipart/form-data"
        onSubmit={handleSubmit}
      >
        <div className="mb-6 mt-6">
          <label
            htmlFor="categories"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Choose the year of required documents
          </label>
          <select
            defaultValue={CURRENT_YEAR}
            onChange={(e: ChangeEvent<HTMLSelectElement>) => {
              setYear(Number(e.target.value));
              setDocRender(false);
            }}
            name="year"
            className="bg-gray-50 max-w-sm border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            {years?.map((item, i) => (
              <option value={item ?? ''} key={i}>
                {item}
              </option>
            ))}
          </select>
        </div>
        <button
          className="inline-flex mt-2 items-center justify-center px-10 py-2 mr-3 text-base font-medium text-center text-white rounded-lg bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-900"
          // className="w-full text-white bg-green-600 disabled:bg-gray-400 disabled:opacity-75 hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
          type="submit"
        >
          Find
        </button>
      </form>

      <div className="mt-8">
        {docRender ? 'No saved documents in this year' : null}
        {docs.map((doc) => (
          <div key={doc.id} className="mb-8">
            <img src={`http://localhost:3502${doc.path}`} alt="" width={350} />
            <h2 className="mt-2">{doc.title}</h2>
          </div>
        ))}
      </div>
    </div>
  );
};
