import { FC, useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { Avatar } from 'flowbite-react';
import { UserContext } from 'app/providers/UserContext';
import { useTypedSelector } from 'app/store/hooks/useTypeSelector';
import { PageType } from 'app/types/settings';
import { NavBarItem } from 'widgets/NavBarItem';
import { NavBarBurger } from 'widgets/NavBarBurger';
import { navigation } from 'app/constants';

export const NavBar: FC = () => {
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const { user, destroySession } = useContext(UserContext);
  const { activePage } = useTypedSelector((state) => state.settings);

  const getMenuClass = (currentPage: PageType) =>
    `block py-2 pr-4 pl-3 md:p-0 border-b border-gray-100 text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:border-0 md:hover:bg-transparent md:hover:text-green-700 md:dark:hover:bg-transparent md:dark:hover:text-white hover:md:text-green-500 ${
      activePage === currentPage ? 'md:text-green-700' : ''
    }`;

  const handleLogout = async () => {
    const response = await fetch('/logout');
    if (response.ok && destroySession) {
      destroySession();
    }
  };

  return (
    <nav className="border-gray-200 bg-white py-2.5 dark:border-gray-700 dark:bg-gray-800 sm:px-4 rounded fixed w-full top-0 left-0 z-50">
      <div className="container mx-auto mx-auto flex flex-wrap items-center justify-between">
        <Link to="/" className="flex items-center pl-4 md:pl-8">
          <img src="/img/logo.png" className="mr-3 h-6 sm:h-9 rounded-full" alt="Finance Logo" />
          <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
            Finance
          </span>
        </Link>
        {!user ? (
          <></>
        ) : Object.keys(user)?.length !== 0 ? (
          <div className="flex md:order-2 pt-2 md:pt-2">
            <button
              onClick={handleLogout}
              type="button"
              className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
            >
              Logout
            </button>

            <Avatar
              img="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
              rounded={true}
            />
          </div>
        ) : (
          <div className="flex md:order-2 pt-2 md:pt-4">
            <Link to="/register">
              <button
                onClick={() => setIsMenuVisible(false)}
                type="button"
                className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
              >
                Sign up
              </button>
            </Link>
            <Link to="/login">
              <button
                onClick={() => setIsMenuVisible(false)}
                type="button"
                className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
              >
                Sign in
              </button>
            </Link>
          </div>
        )}
        <div className="pr-2 md:pr-4">
          <NavBarBurger isMenuVisible={isMenuVisible} setIsMenuVisible={setIsMenuVisible} />
        </div>
        <div
          className={`shadow-md md:shadow-none w-full md:block md:w-auto px-2 ${
            isMenuVisible ? '' : 'hidden'
          }`}
        >
          <ul className="mt-4 flex flex-col md:mt-0 md:flex-row md:space-x-8 md:text-sm md:font-medium">
            <Link to="/" className={getMenuClass('Home')} onClick={() => setIsMenuVisible(false)}>
              Home
            </Link>

            {user && Object.keys(user)?.length !== 0 ? (
              <>
                {navigation
                  .filter((item) => item.authOnly)
                  .map((navItem) => (
                    <NavBarItem navItem={navItem} setIsMenuVisible={setIsMenuVisible} />
                  ))}
              </>
            ) : (
              <>
                {navigation
                  .filter((item) => !item.authOnly && !item.isHomePage)
                  .map((navItem) => (
                    <NavBarItem navItem={navItem} setIsMenuVisible={setIsMenuVisible} />
                  ))}
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};
