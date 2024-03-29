import { ERROR } from 'app/constants';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Alert } from 'shared/Alert';

type ErrorType = 'email_not_found' | 'error_unknown' | 'password_incorrect' | null;

export const LoginPage = () => {
  const queryParams = new URLSearchParams(window.location.search);
  const errorBack = queryParams.get('error') as ErrorType;
  const [error, setError] = useState<ErrorType>(errorBack);

  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto lg:py-0">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-8 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Sign in and account
            </h1>
            {error === 'password_incorrect' ? <Alert text={ERROR.PASSWORD_INCORRECT} /> : null}
            {error === 'email_not_found' ? <Alert text={ERROR.EMAIL_NOT_FOUND} /> : null}
            {error === 'error_unknown' ? <Alert text={ERROR.ERROR_UNKNOWN} /> : null}
            <form className="space-y-4 md:space-y-6" action="/login" method="POST">
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Your email
                </label>
                <input
                  onChange={() => setError(null)}
                  type="email"
                  name="email"
                  id="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-green-600 focus:border-green-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
                  placeholder="name@gmail.com"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Password
                </label>
                <input
                  onChange={() => setError(null)}
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-green-600 focus:border-green-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full text-white bg-green-600 hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
              >
                Sign in
              </button>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Do not have an account?{' '}
                <Link
                  to="/register"
                  className="font-medium text-green-600 hover:underline dark:text-green-500"
                >
                  Register here
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
