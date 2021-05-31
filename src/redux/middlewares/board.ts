import { loadBoardFromFirestore } from '../../firebase/services';
import { isSuccess } from '../../utils/result';
import { selectUserId } from '../modules/auth.selectors';
import {
  loadBoardFailed,
  loadBoardStarted,
  loadBoardSuccessful
} from '../modules/board.actions';
import { Middleware } from './middleware';

export const loadBoard: Middleware<{ boardId: string }> = (payload) => async (
  dispatch,
  getState
) => {
  const userId = selectUserId(getState());
  if (!userId) return dispatch(loadBoardFailed('No user found'));

  dispatch(loadBoardStarted());

  const res = await loadBoardFromFirestore(payload.boardId, userId);

  if (isSuccess(res)) return dispatch(loadBoardSuccessful(res.data));
  return dispatch(loadBoardFailed(res.data));
};
