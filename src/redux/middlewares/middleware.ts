import { Dispatch } from 'redux';
import { RootState } from '../rootReducer';

export type Middleware<T = void> = (
  payload: T
) => (dispatch: Dispatch, getState: () => RootState) => void;
