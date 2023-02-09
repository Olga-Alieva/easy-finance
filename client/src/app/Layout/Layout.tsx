import { FC } from 'react';
import { Outlet } from 'react-router-dom';
import { Footer } from 'widgets/Footer';
import { NavBar } from 'widgets/NavBar';

interface LayoutProps {
  title?: string;
}

export const Layout: FC<LayoutProps> = ({ title }) => {
  return (
    <div className="bg-gray-50 dark:bg-gray-900 flex flex-col h-screen">
      <div className="container mx-auto flex-grow">
        <NavBar />
        <div className="px-4 pt-24">
          {title && <h1 className="text-3xl font-bold underline text-clifford">{title}</h1>}
          <Outlet />
        </div>
      </div>
      <Footer />
    </div>
  );
};
