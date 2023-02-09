import { Dispatch } from 'redux';
import { CategoriesAction, CategoriesActionTypes } from 'app/types/categories';

export const fetchCategories = () => {
  return async (dispatch: Dispatch<CategoriesAction>) => {
    try {
      dispatch({ type: CategoriesActionTypes.FETCH_CATEGORIES });
      const response = await fetch('/records/categories');
      const categories = await response.json();
      dispatch({ type: CategoriesActionTypes.FETCH_CATEGORIES_SUCCESS, payload: categories });
    } catch (err) {
      dispatch({
        type: CategoriesActionTypes.FETCH_CATEGORIES_ERROR,
        payload: 'Something went wrong with fetching categories',
      });
    }
  };
};
