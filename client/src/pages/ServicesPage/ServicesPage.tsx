import { useActivePage } from 'app/store/hooks/useActivePage';

export const ServicesPage = () => {
  useActivePage('Services');
  return (
    <p className="max-w-2xl mt-8 mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400">
      We can customize our services according to your requirements.
      <br></br>
      Please contact us for more information.
    </p>
  );
};
