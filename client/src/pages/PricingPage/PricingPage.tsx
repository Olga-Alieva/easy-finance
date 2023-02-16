import { useActivePage } from 'app/store/hooks/useActivePage';

export const PricingPage = () => {
  useActivePage('Pricing');
  return (
    <div>
      <span className="max-w-2xl mb-2 mt-8 font-light text-gray-500 lg:mb-2 md:text-lg lg:text-xl dark:text-gray-400 mr-2">
        For information about pricing, please contact us at
      </span>
      <span className="text-xl font-medium md:text-lg lg:text-xl lg:mb-2">
        olga.a.alieva@gmail.com
      </span>
    </div>
  );
};
