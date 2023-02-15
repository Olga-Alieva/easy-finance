import { useActions } from 'app/store/hooks/useActions';
import { useTypedSelector } from 'app/store/hooks/useTypeSelector';
import { useState, FormEvent } from 'react';
import { Link } from 'react-router-dom';
import * as CheckingActionCreators from 'app/store/action-creators/checking';

type ErrorType = 'email_exists' | 'error_unknown' | 'password_mismatch' | null;

export const RegisterPage = () => {
  const queryParams = new URLSearchParams(window.location.search);
  const errorBack = queryParams.get('error') as ErrorType;

  const [inputValuePassword, setInputValuePassword] = useState('');
  const [inputValueConfirm, setInputValueConfirm] = useState('');
  const [error, setError] = useState<ErrorType>(errorBack);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    if (inputValuePassword !== inputValueConfirm) {
      e.preventDefault();
      setError('password_mismatch');
    }
  };

  const { setCheckTerms } = useActions(CheckingActionCreators);
  const { check } = useTypedSelector((state) => state.checkterms);

  const checkTerms = () => {
    setCheckTerms(!check);
  };

  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto lg:py-0">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-8 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Create and account
            </h1>
            {error === 'email_exists' ? (
              <h3 className="text-red-600">This email already exists</h3>
            ) : null}
            {error === 'error_unknown' ? (
              <h3 className="text-red-600">Something went wrong</h3>
            ) : null}
            {error === 'password_mismatch' ? (
              <h3 className="text-red-600">Passwords do not match</h3>
            ) : null}
            <form
              className="space-y-4 md:space-y-6"
              action="/register"
              method="POST"
              onSubmit={handleSubmit}
            >
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
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-green-600 focus:border-green-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
                  required
                  minLength={5}
                  maxLength={20}
                  value={inputValuePassword}
                  onChange={(e) => {
                    setInputValuePassword(e.target.value);
                    setError(null);
                  }}
                />
              </div>

              <div>
                <label
                  htmlFor="confirm-password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Confirm password
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  id="confirm-password"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-green-600 focus:border-green-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
                  required
                  minLength={5}
                  maxLength={20}
                  value={inputValueConfirm}
                  onChange={(e) => {
                    setInputValueConfirm(e.target.value);
                    setError(null);
                  }}
                />
              </div>
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    onChange={checkTerms}
                    id="terms"
                    aria-describedby="terms"
                    checked={check}
                    type="checkbox"
                    className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-green-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-green-600 dark:ring-offset-gray-800"
                    required
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label htmlFor="terms" className="font-light text-gray-500 dark:text-gray-300">
                    I accept the{' '}
                    <Link to="/terms_and_conditions">
                      <span className="font-medium text-green-600 hover:underline dark:text-green-500">
                        Terms and Conditions
                      </span>
                    </Link>
                  </label>
                </div>
              </div>
              <button
                disabled={!check}
                type="submit"
                className="w-full text-white bg-green-600 disabled:bg-gray-400 disabled:opacity-75 hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
              >
                Create an account
              </button>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Already have an account?{' '}
                <a
                  href="/login"
                  className="font-medium text-green-600 hover:underline dark:text-green-500"
                >
                  Login here
                </a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
