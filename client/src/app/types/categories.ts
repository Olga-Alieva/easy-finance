export enum CategoriesActionTypes {
  FETCH_CATEGORIES = 'FETCH_CATEGORIES',
  FETCH_CATEGORIES_SUCCESS = 'FETCH_CATEGORIES_SUCCESS',
  FETCH_CATEGORIES_ERROR = 'FETCH_CATEGORIES_ERROR',
}

export type CategoryType = {
  category: string;
  createdAt: string;
  id: number;
  type_id: number;
  updatedAt: string;
};

export interface CategoriesState {
  categories: CategoryType[];
  loading: boolean;
  error: null | string;
}

interface FetchCategoriesAction {
  type: CategoriesActionTypes.FETCH_CATEGORIES;
}

interface FetchCategoriesSuccessAction {
  type: CategoriesActionTypes.FETCH_CATEGORIES_SUCCESS;
  payload: CategoryType[];
}
interface FetchCategoriesErrorAction {
  type: CategoriesActionTypes.FETCH_CATEGORIES_ERROR;
  payload: string;
}
export type CategoriesAction =
  | FetchCategoriesAction
  | FetchCategoriesSuccessAction
  | FetchCategoriesErrorAction;
