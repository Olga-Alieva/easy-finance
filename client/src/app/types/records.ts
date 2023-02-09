export enum RecordsActionTypes {
  FETCH_RECORDS = 'FETCH_RECORDS',
  FETCH_RECORDS_SUCCESS = 'FETCH_RECORDS_SUCCESS',
  FETCH_RECORDS_ERROR = 'FETCH_RECORDS_ERROR',
  FETCH_RECORD_DELETE = 'FETCH_RECORD_DELETE',
}

export interface RecordsState {
  records: any[];
  loading: boolean;
  error: null | string;
  totalIncome?: number | null;
  totalExpenses?: number | null;
  totalEntries: number;
}

interface RecordsPayload {
  entries: any[];
  totalExpenses: number | null;
  totalIncome: number | null;
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
  payload: number;
}

export type RecordsAction =
  | FetchRecordsAction
  | FetchRecordsSuccessAction
  | FetchRecordsErrorAction
  | FetchRecordDeleteAction;
