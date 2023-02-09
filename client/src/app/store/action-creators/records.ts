import { Dispatch } from 'redux';
import { RecordsAction, RecordsActionTypes } from 'app/types/records';

interface FetchRecordsProps {
  categoryId?: number;
  startDate?: Date;
  endDate?: Date;
}

export const fetchRecords = ({ categoryId, startDate, endDate }: FetchRecordsProps) => {
  return async (dispatch: Dispatch<RecordsAction>) => {
    try {
      dispatch({ type: RecordsActionTypes.FETCH_RECORDS });
      setTimeout(async () => {
        const response = await fetch(
          `/records?category_id=${categoryId || ''}&startDate=${startDate || ''}&endDate=${
            endDate || ''
          }`
        );
        const data = await response.json();
        dispatch({ type: RecordsActionTypes.FETCH_RECORDS_SUCCESS, payload: data });
      }, 1000);
    } catch (err) {
      dispatch({
        type: RecordsActionTypes.FETCH_RECORDS_ERROR,
        payload: 'Something went wrong with fetching records',
      });
    }
  };
};

export const deleteRecordFetch = (id: number) => {
  return async (dispatch: Dispatch<RecordsAction>) => {
    try {
      setTimeout(async () => {
        const response = await fetch('/records', {
          method: 'DELETE',
          body: JSON.stringify({ id }),
          headers: { 'Content-type': 'application/json' },
        });
        const responseJson = await response.json();
        if (responseJson.isSuccessful) {
          dispatch({ type: RecordsActionTypes.FETCH_RECORD_DELETE, payload: id });
        } else {
          throw new Error('could not delete record');
        }
      }, 1000);
    } catch (err) {
      dispatch({
        type: RecordsActionTypes.FETCH_RECORDS_ERROR,
        payload: 'Something went wrong with deleting record',
      });
    }
  };
};
