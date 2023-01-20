import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Avatar } from 'flowbite-react';

const NavBar = ({ user, active, destroySession }) => {
  const handleLogout = async () => {
    const response = await fetch('/logout');
    if (response.ok) {
      destroySession();
    }
  };

  return (
    <Navbar className="fixed w-full top-0 left-0" fluid={true} rounded={true}>
      <div className="container mx-auto mx-auto flex flex-wrap items-center justify-between">
        <Navbar.Brand href="/">
          <img src="/img/logo.png" className="mr-3 h-6 sm:h-9 rounded-full" alt="Flowbite Logo" />
          <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
            Finance
          </span>
        </Navbar.Brand>
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
                type="button"
                className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
              >
                Sign up
              </button>
            </Link>
            <Link to="/login">
              <button
                type="button"
                className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
              >
                Sign in
              </button>
            </Link>
          </div>
        )}
        <Navbar.Toggle />
        <Navbar.Collapse>
          <Navbar.Link
            href="/"
            className={`hover:md:text-green-500 ${active === 'Home' ? 'md:text-green-700' : ''}`}
            // active={active === 'Home'}
          >
            Home
          </Navbar.Link>

          {user && Object.keys(user)?.length !== 0 ? (
            <>
              <Navbar.Link
                className={`hover:md:text-green-500 ${
                  active === 'Records' ? 'md:text-green-700' : ''
                }`}
                // active={active === 'Records'}
                href="/records"
              >
                Records
              </Navbar.Link>
              <Navbar.Link
                className={`hover:md:text-green-500 ${
                  active === 'Statistics' ? 'md:text-green-700' : ''
                }`}
                href="/statistics"
              >
                Statistics
              </Navbar.Link>
              {/* <Navbar.Link className="md:hover:text-green-700" href="/reports"></Navbar.Link> */}
              <Navbar.Link
                className={`hover:md:text-green-500 ${
                  active === 'Reports' ? 'md:text-green-700' : ''
                }`}
                href="/reports"
              >
                Reports
              </Navbar.Link>
            </>
          ) : (
            <>
              <Navbar.Link
                className={`hover:md:text-green-500 ${
                  active === 'About' ? 'md:text-green-700' : ''
                }`}
                href="/about"
              >
                About
              </Navbar.Link>
              <Navbar.Link
                className={`hover:md:text-green-500 ${
                  active === 'Services' ? 'md:text-green-700' : ''
                }`}
                href="/services"
              >
                Services
              </Navbar.Link>
              <Navbar.Link
                className={`hover:md:text-green-500 ${
                  active === 'Pricing' ? 'md:text-green-700' : ''
                }`}
                href="/pricing"
              >
                Pricing
              </Navbar.Link>
              <Navbar.Link
                className={`hover:md:text-green-500 ${
                  active === 'Contacts' ? 'md:text-green-700' : ''
                }`}
                href="/contacts"
              >
                Contacts
              </Navbar.Link>
            </>
          )}
        </Navbar.Collapse>
      </div>
    </Navbar>
  );
};

export default NavBar;

//rafce
