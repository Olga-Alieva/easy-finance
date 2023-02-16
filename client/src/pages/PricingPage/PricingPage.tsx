import { useActivePage } from 'app/store/hooks/useActivePage';

export const PricingPage = () => {
  useActivePage('Pricing');
  return (
    <section className="bg-white dark:bg-gray-900 flex-1">
      <div className="grid max-w-screen-xl px-8 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
        <div className="mr-auto place-self-center lg:col-span-7">
          <h1 className="max-w-xl mb-6 text-2xl font-bold tracking-tight leading-none md:text-4xl xl:text-5xl dark:text-white">
            Prices
          </h1>
          <p className="max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400">
            For information about pricing, please contact us at{' '}
            <span className="text font-medium md:text-lg lg:text-xl lg:mb-2">
              olga.a.alieva@gmail.com
            </span>
          </p>
        </div>
      </div>
    </section>
  );
};
