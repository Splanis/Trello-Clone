import { Dispatch } from 'redux';
import { v4 as uuid } from 'uuid';
import { db } from '../../../firebase/firebase';
import { IBoard, ILabel } from '../../models/Board';
import {
  createNewCardAction,
  createNewListAction,
  deleteCardAction,
  deleteListAction,
  loadBoardAction,
  loadBoardFailedAction,
  moveCardAction,
  moveListAction,
  unloadBoardAction
} from './actions';
import { dataIsBoard } from './predicates';

export const loadBoard = (payload: { userId: string; boardId: string }) => (
  dispatch: Dispatch
) => {
  db.collection('boards')
    .doc(payload.boardId)
    .get()
    .then((b) => {
      const board = b.data();
      db.collection('users')
        .doc(payload.userId)
        .get()
        .then((user) => {
          const userBoards = user.data()?.boards;
          const hasBoard = userBoards.find((b) => b.id === board?.id);
          if (!board || !hasBoard)
            return dispatch(loadBoardFailedAction({ error: 'Board not found :(' }));
          if (dataIsBoard(board) && hasBoard) dispatch(loadBoardAction(board));
        });
    });
};

export const unloadBoard = () => (dispatch: Dispatch) => {
  dispatch(unloadBoardAction());
};

export const saveBoard = (payload: { board: IBoard; id: string }) => () => {
  db.collection('boards').doc(payload.id).set(payload.board);
};

export const moveCard = (payload: {
  sourceId: string;
  sourceIdx: number;
  destinationId: string;
  destinationIdx: number;
  draggableId: string;
}) => (dispatch: Dispatch) => {
  dispatch(moveCardAction(payload));
};

export const moveList = (payload: { sourceIdx: number; destinationIdx: number }) => (
  dispatch: Dispatch
) => {
  dispatch(moveListAction(payload));
};

export const createNewCard = (payload: {
  listId: string;
  name: string;
  labels: ILabel[];
}) => (dispatch: Dispatch) => {
  const id = uuid();
  dispatch(createNewCardAction({ ...payload, id }));
};

export const createNewList = (payload: { name: string }) => (dispatch: Dispatch) => {
  const id = uuid();
  dispatch(createNewListAction({ name: payload.name, id }));
};

export const deleteList = (payload: { listId: string }) => (dispatch: Dispatch) => {
  dispatch(deleteListAction(payload));
};

export const deleteCard = (payload: { listId: string; cardId: string }) => (
  dispatch: Dispatch
) => {
  dispatch(deleteCardAction(payload));
};
