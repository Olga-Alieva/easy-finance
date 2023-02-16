import { useActivePage } from 'app/store/hooks/useActivePage';

export const ContactsPage = () => {
  useActivePage('Contacts');
  return (
    <div className="mt-8">
      <p className="max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400">
        Please contact us to receive more information:{' '}
        <span className="font-bold">olga.a.alieva@gmail.com</span>
      </p>
    </div>
  );
};
