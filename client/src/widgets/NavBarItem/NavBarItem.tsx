import { FC, SetStateAction, Dispatch } from 'react';
import { Link } from 'react-router-dom';
import { useTypedSelector } from 'app/store/hooks/useTypeSelector';
import { NavigationType, PageType } from 'app/types/settings';

interface NavBarItemProps {
  navItem: NavigationType;
  setIsMenuVisible: Dispatch<SetStateAction<boolean>>;
}

export const NavBarItem: FC<NavBarItemProps> = ({ navItem, setIsMenuVisible }) => {
  const { activePage } = useTypedSelector((state) => state.settings);

  const getMenuClass = (currentPage: PageType) =>
    `block py-2 pr-4 pl-3 lg:p-0 border-b border-gray-100 text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white lg:border-0 lg:hover:bg-transparent lg:hover:text-green-700 lg:dark:hover:bg-transparent lg:dark:hover:text-white hover:lg:text-green-500 ${
      activePage === currentPage ? 'md:text-green-700' : ''
    }`;

  return (
    <Link
      className={getMenuClass(navItem.name)}
      to={`${navItem.to || '/' + navItem.name.toLowerCase()}`}
      onClick={() => setIsMenuVisible(false)}
    >
      {navItem.name}
    </Link>
  );
};
