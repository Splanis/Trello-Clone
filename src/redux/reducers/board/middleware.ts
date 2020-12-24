import { v4 as uuid } from 'uuid';
import { db } from '../../../firebase/firebase';
import { IBoard, ILabel } from '../../models/Board';
import {
  createNewCardAction,
  createNewListAction,
  loadBoardAction,
  moveCardAction,
  moveListAction,
  unloadBoardAction
} from './actions';
import { dataIsBoard } from './predicates';

export const loadBoard = (id: string) => (dispatch: any) => {
  db.collection('boards')
    .doc(id)
    .get()
    .then((board) => {
      // @ts-ignore
      if (dataIsBoard(board.data())) dispatch(loadBoardAction(board.data()));
    });
};

export const unloadBoard = () => (dispatch: any) => {
  dispatch(unloadBoardAction());
};

export const saveBoard = (payload: { board: IBoard; id: string }) => (dispatch: any) => {
  db.collection('boards').doc(payload.id).set(payload.board);
};

export const moveCard = (payload: {
  sourceId: string;
  sourceIdx: number;
  destinationId: string;
  destinationIdx: number;
  draggableId: string;
}) => (dispatch: any) => {
  dispatch(moveCardAction(payload));
};

export const moveList = (payload: { sourceIdx: number; destinationIdx: number }) => (
  dispatch: any
) => {
  dispatch(moveListAction(payload));
};

export const createNewCard = (payload: {
  listId: string;
  name: string;
  labels: ILabel[];
}) => (dispatch: any) => {
  const id = uuid();
  console.log(payload);
  dispatch(createNewCardAction({ ...payload, id }));
};

export const createNewList = (payload: { name: string }) => (dispatch: any) => {
  const id = uuid();
  dispatch(createNewListAction({ name: payload.name, id }));
};
