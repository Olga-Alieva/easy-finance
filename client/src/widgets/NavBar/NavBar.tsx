import { FC, useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from 'app/providers/UserContext';
import { NavBarItem } from 'widgets/NavBarItem';
import { NavBarBurger } from 'widgets/NavBarBurger';
import { navigation } from 'app/constants';
import { Avatar } from 'widgets/Avatar';

export const NavBar: FC = () => {
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const { user, destroySession } = useContext(UserContext);

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
          <div className="flex lg:order-2 pt-2 md:pt-2">
            <button
              onClick={handleLogout}
              type="button"
              className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
            >
              Logout
            </button>
            <Avatar imgSrc={'https://flowbite.com/docs/images/people/profile-picture-5.jpg'} />
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
        <div className="pr-2 lg:pr-4">
          <NavBarBurger isMenuVisible={isMenuVisible} setIsMenuVisible={setIsMenuVisible} />
        </div>
        <div
          className={`shadow-md lg:shadow-none w-full lg:block lg:w-auto px-2 ${
            isMenuVisible ? '' : 'hidden'
          }`}
        >
          <ul className="mt-4 flex flex-col lg:mt-0 lg:flex-row lg:space-x-8 lg:text-sm lg:font-medium">
            {/* Home menu item */}
            <NavBarItem navItem={navigation[0]} setIsMenuVisible={setIsMenuVisible} />

            {user && Object.keys(user)?.length !== 0 ? (
              <>
                {navigation
                  .filter((item) => item.authOnly)
                  .map((navItem, i) => (
                    <NavBarItem key={i} navItem={navItem} setIsMenuVisible={setIsMenuVisible} />
                  ))}
              </>
            ) : (
              <>
                {navigation
                  .filter((item) => !item.authOnly && !item.isHomePage)
                  .map((navItem, i) => (
                    <NavBarItem key={i} navItem={navItem} setIsMenuVisible={setIsMenuVisible} />
                  ))}
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};
