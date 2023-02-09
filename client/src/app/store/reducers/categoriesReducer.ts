import { CategoriesState, CategoriesAction, CategoriesActionTypes } from 'app/types/categories';

const initialState: CategoriesState = {
  categories: [],
  loading: false,
  error: null,
};

export const categoriesReducer = (
  state = initialState,
  action: CategoriesAction
): CategoriesState => {
  switch (action.type) {
    case CategoriesActionTypes.FETCH_CATEGORIES:
      return { loading: true, error: null, categories: [] };
    case CategoriesActionTypes.FETCH_CATEGORIES_SUCCESS:
      return { loading: false, error: null, categories: action.payload };
    case CategoriesActionTypes.FETCH_CATEGORIES_ERROR:
      return { loading: false, error: action.payload, categories: [] };
    default:
      return state;
  }
};
