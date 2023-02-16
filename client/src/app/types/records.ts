export enum RecordsActionTypes {
  FETCH_RECORDS = 'FETCH_RECORDS',
  FETCH_RECORDS_SUCCESS = 'FETCH_RECORDS_SUCCESS',
  FETCH_RECORDS_ERROR = 'FETCH_RECORDS_ERROR',
  FETCH_RECORD_DELETE = 'FETCH_RECORD_DELETE',
}

export type RecordsType = {
  'Category.category': string;
  'Category.createdAt': string;
  'Category.id': number;
  'Category.type_id': 1 | 2;
  'Category.updatedAt': string;
  amount: string;
  category_id: number;
  createdAt: string;
  date: string;
  id: number;
  updatedAt: string;
  user_id: number;
};
export interface RecordsState {
  records: RecordsType[];
  loading: boolean;
  error: null | string;
  totalIncome: number;
  totalExpenses: number;
  totalEntries: number;
}

interface RecordsPayload {
  entries: RecordsType[];
  totalExpenses: number;
  totalIncome: number;
  totalEntries: number;
}

interface FetchRecordsAction {
  type: RecordsActionTypes.FETCH_RECORDS;
}

interface FetchRecordsSuccessAction {
  type: RecordsActionTypes.FETCH_RECORDS_SUCCESS;
  payload: RecordsPayload;
}
interface FetchRecordsErrorAction {
  type: RecordsActionTypes.FETCH_RECORDS_ERROR;
  payload: string;
}
interface FetchRecordDeleteAction {
  type: RecordsActionTypes.FETCH_RECORD_DELETE;
  payload: { id: number; type: number; amount: string };
}

export type RecordsAction =
  | FetchRecordsAction
  | FetchRecordsSuccessAction
  | FetchRecordsErrorAction
  | FetchRecordDeleteAction;
