import {
  addUserBoardToFirestore,
  loadUserBoardsFromFirestore,
  signInWithGoogle
} from '../../firebase/services';
import { createInitialBoard } from '../../models/Board';
import { isFailure, isSuccess } from '../../utils/result';
import {
  createBoardSuccessful,
  loadBoardsSuccessful,
  signInSuccessful
} from '../modules/auth';
import { selectUserId } from '../modules/auth.selectors';
import { Middleware } from './middleware';

export const signIn: Middleware = () => async (dispatch) => {
  const authRes = await signInWithGoogle();

  if (isFailure(authRes)) return;

  const boardsRes = await loadUserBoardsFromFirestore(authRes.data.userId);
  if (isSuccess(boardsRes))
    dispatch(signInSuccessful({ ...authRes.data, boards: boardsRes.data }));
};

export const createBoard: Middleware<{ name: string }> = (payload) => async (
  dispatch,
  getState
) => {
  const userId = selectUserId(getState());
  if (!userId) return;

  const board = createInitialBoard(payload.name);

  const res = await addUserBoardToFirestore(userId, board);

  if (isSuccess(res))
    dispatch(createBoardSuccessful({ name: payload.name, id: board.id }));
};

export const loadBoards: Middleware = () => async (dispatch, getState) => {
  const userId = selectUserId(getState());
  if (!userId) return;

  const res = await loadUserBoardsFromFirestore(userId);

  if (isSuccess(res)) dispatch(loadBoardsSuccessful(res.data));
};
