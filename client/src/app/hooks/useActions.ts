import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';

export const useActions = (actionCreators: any) => {
  const dispatch = useDispatch();
  return bindActionCreators(actionCreators, dispatch);
};
