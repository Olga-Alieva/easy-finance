import { useActions } from 'app/store/hooks/useActions';
import * as CheckingActionCreators from 'app/store/action-creators/checking';
import { useTypedSelector } from 'app/store/hooks/useTypeSelector';
import { useNavigate } from 'react-router-dom';

export const TermsAndConditions = () => {
  const navigate = useNavigate();
  const { setCheckTerms } = useActions(CheckingActionCreators);
  const { check } = useTypedSelector((state) => state.checkterms);
  console.log('🚀 ~ check', check);
  const checkTerms = () => {
    setCheckTerms(true);
    navigate('/register');
  };
  const handleCancel = () => {
    navigate('/');
  };

  return (
    <>
      <p className="max-w-2xl mt-8 mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400">
        When you accept our TERMS AND CONDITIONS it means that we will keep your information and
        data safe and secure. Please do not give access to your account to someone else.
      </p>

      <button
        onClick={checkTerms}
        className="inline-flex items-center justify-center px-5 py-3 mr-3 text-base font-medium text-center text-white rounded-lg bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-900"
      >
        Accept
      </button>
      <button
        onClick={handleCancel}
        className="inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center text-gray-900 border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
      >
        Dismiss
      </button>
    </>
  );
};
