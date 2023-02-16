import { Dispatch, FC, SetStateAction } from 'react';

interface NavBarBurgerType {
  isMenuVisible: boolean;
  setIsMenuVisible: Dispatch<SetStateAction<boolean>>;
}

export const NavBarBurger: FC<NavBarBurgerType> = ({ isMenuVisible, setIsMenuVisible }) => {
  return (
    <button
      onClick={() => setIsMenuVisible(!isMenuVisible)}
      className="inline-flex items-center rounded-lg p-2 text-sm text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600 lg:hidden"
    >
      <span className="sr-only">Open main menu</span>
      <svg
        stroke="currentColor"
        fill="currentColor"
        stroke-width="0"
        viewBox="0 0 12 16"
        className="h-6 w-6 shrink-0"
        height="1em"
        width="1em"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill-rule="evenodd"
          d="M11.41 9H.59C0 9 0 8.59 0 8c0-.59 0-1 .59-1H11.4c.59 0 .59.41.59 1 0 .59 0 1-.59 1h.01zm0-4H.59C0 5 0 4.59 0 4c0-.59 0-1 .59-1H11.4c.59 0 .59.41.59 1 0 .59 0 1-.59 1h.01zM.59 11H11.4c.59 0 .59.41.59 1 0 .59 0 1-.59 1H.59C0 13 0 12.59 0 12c0-.59 0-1 .59-1z"
        ></path>
      </svg>
    </button>
  );
};
