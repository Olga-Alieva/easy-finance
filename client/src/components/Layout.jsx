import React from 'react';
import NavBar from './NavBar';
import Footer from './Footer';

const Layout = ({ children, title, user, active, destroySession }) => {
  return (
    <div className="bg-gray-50 dark:bg-gray-900 flex flex-col h-screen">
      <div className="container mx-auto flex-grow">
        <NavBar user={user} active={active} destroySession={destroySession} />
        <div className="px-4 pt-24">
          <h1 className="text-3xl font-bold underline text-clifford">{title}</h1>
          {children}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
