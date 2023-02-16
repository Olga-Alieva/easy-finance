import { FC } from 'react';
import { Outlet } from 'react-router-dom';
import { Footer } from 'widgets/Footer';
import { NavBar } from 'widgets/NavBar';

interface LayoutProps {
  title?: string;
}

export const Layout: FC<LayoutProps> = ({ title }) => {
  return (
    <div className="bg-gray-50 dark:bg-gray-900 flex flex-col min-h-screen">
      <div className="container mx-auto flex-grow flex flex-col">
        <NavBar />
        <div className="pt-24 flex-1 flex flex-col px-4">
          {title && <h1 className="text-3xl font-bold underline text-clifford">{title}</h1>}
          <Outlet />
        </div>
      </div>
      <Footer />
    </div>
  );
};
