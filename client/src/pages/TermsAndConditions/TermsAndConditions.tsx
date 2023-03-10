import { useActions } from 'app/hooks/useActions';
import * as CheckingActionCreators from 'app/store/action-creators/checking';
import { useNavigate } from 'react-router-dom';

export const TermsAndConditions = () => {
  const navigate = useNavigate();
  const { setCheckTerms } = useActions(CheckingActionCreators);

  const checkTerms = () => {
    setCheckTerms(true);
    navigate('/register');
  };
  const handleCancel = () => {
    navigate('/');
  };

  return (
    <section className="bg-white dark:bg-gray-900 flex-1">
      <div className="grid max-w-screen-xl px-4 md:px-8 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
        <div className="mr-auto place-self-center lg:col-span-7">
          <h1 className="max-w-2xl mb-6 text-2xl font-extrabold tracking-tight leading-none md:text-4xl xl:text-5xl dark:text-white">
            Terms and conditions
          </h1>

          <p className="max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400">
            When you accept our TERMS AND CONDITIONS it means that we will keep your information and
            data safe and secure. Please do not give access to your account to anyone else.
          </p>

          <button
            onClick={checkTerms}
            className="mb-4 md:mb-0 inline-flex items-center justify-center px-5 py-3 mr-3 text-base font-medium text-center text-white rounded-lg bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-900"
          >
            Accept
          </button>

          <button
            onClick={handleCancel}
            className="inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center text-gray-900 border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
          >
            Dismiss
          </button>
        </div>
      </div>
    </section>
  );
};
