import { RecordsState, RecordsAction, RecordsActionTypes } from 'app/types/records';

const initialState: RecordsState = {
  records: [],
  loading: false,
  error: null,
  totalIncome: null,
  totalExpenses: null,
};

export const recordsReducer = (state = initialState, action: RecordsAction): RecordsState => {
  switch (action.type) {
    case RecordsActionTypes.FETCH_RECORDS:
      return { ...state, loading: true };
    case RecordsActionTypes.FETCH_RECORDS_SUCCESS:
      return {
        ...state,
        loading: false,
        records: action.payload.entries,
        totalIncome: action.payload.totalIncome,
        totalExpenses: action.payload.totalExpenses,
      };
    case RecordsActionTypes.FETCH_RECORDS_ERROR:
      return { ...initialState, error: action.payload };
    case RecordsActionTypes.FETCH_RECORD_DELETE:
      return { ...state, records: state.records.filter((record) => record.id !== action.payload) };
    default:
      return state;
  }
};


