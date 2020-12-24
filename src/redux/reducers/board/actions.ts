import { IList } from '../../models/Board';

export type Action = ReturnType<
  | typeof loadBoardAction
  | typeof unloadBoardAction
  | typeof moveListAction
  | typeof moveCardAction
  | typeof createNewListAction
  | typeof createNewCardAction
>;

export const loadBoardAction = (payload: { id: string; name: string; lists: IList[] }) =>
  <const>{ type: 'LOAD_BOARD', payload: payload };

export const unloadBoardAction = () => <const>{ type: 'UNLOAD_BOARD' };

export const moveListAction = (payload: { sourceIdx: number; destinationIdx: number }) =>
  <const>{ type: 'MOVE_LIST', payload: payload };

export const moveCardAction = (payload: {
  sourceId: string;
  sourceIdx: number;
  destinationId: string;
  destinationIdx: number;
  draggableId: string;
}) =>
  <const>{
    type: 'MOVE_CARD',
    payload: payload
  };

export const createNewListAction = (payload: { id: string; name: string }) =>
  <const>{
    type: 'CREATE_NEW_LIST',
    payload: payload
  };

export const createNewCardAction = (payload: {
  listId: string;
  id: string;
  name: string;
}) =>
  <const>{
    type: 'CREATE_NEW_CARD',
    payload: payload
  };
