import { CURRENT_YEAR } from 'app/constants';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const years: number[] = [];
for (let i = 2010; i <= CURRENT_YEAR; i += 1) {
  years.push(i);
}

export const AddDocument = () => {
  const navigate = useNavigate();

  return (
    <form id="uploadForm" action="/documents" method="post" encType="multipart/form-data">
      {/* <input type="file" name="sampleFile" /> */}
      {/* <input type="submit" value="Upload!" /> */}
      {/* <div style={{ border: '1px solid red' }}>
          <input type="file" name="doc" onChange={handleFileChange} />
        </div> */}

      {/* <div>{file && `${file.name} - ${file.type}`}</div> */}

      {/* <button onClick={handleUploadClick}>Upload</button> */}
      <div className="mb-6">
        <label
          htmlFor="categories"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Choose the year
        </label>
        <select
          defaultValue={CURRENT_YEAR}
          // onChange={onChange}
          name="year"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        >
          {/* {showAll && <option value="">All</option>} */}
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
        // onChange={handleFileChange}
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
          // value={title}
          // onChange={() => {
          //   setTitle(title);
          // }}
          name="title"
          type="text"
          id="default-input"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
      </div>

      <button
        // onClick={() => navigate('/documents')}
        className="inline-flex mt-4 items-center justify-center px-10 py-2 mr-3 text-base font-medium text-center text-white rounded-lg bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-900"
        // className="w-full text-white bg-green-600 disabled:bg-gray-400 disabled:opacity-75 hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
        type="submit"
      >
        Upload
      </button>
    </form>
  );
};
