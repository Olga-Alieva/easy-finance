import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setActivePage } from 'app/store/action-creators/settings';
import { PageType } from 'app/types/settings';

export const useActivePage = (activePage: PageType) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setActivePage(activePage));
  }, []);
};
