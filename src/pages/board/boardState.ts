import { Board, Card, List } from '../../models/Board';
import { insertItemIntoArray, moveItem, removeItemFromArray } from '../../utils/arrays';

// Actions
export type Action = ReturnType<
  | typeof loadBoardStarted
  | typeof loadBoardSuccessful
  | typeof loadBoardFailed
  | typeof unloadBoard
  | typeof moveList
  | typeof moveCard
  | typeof createNewList
  | typeof createNewCard
  | typeof deleteList
  | typeof deleteCard
  | typeof deleteLabel
  | typeof changeQuery
  | typeof openNewListSidebar
  | typeof openNewCardSidebar
  | typeof openDeleteListSidebar
  | typeof openDeleteCardSidebar
  | typeof openViewCardSidebar
  | typeof closeSidebar
  | typeof editCard
  | typeof saveCard
>;

export const loadBoardStarted = () => <const>{ type: 'LOAD_BOARD_STARTED' };
export const loadBoardSuccessful = (board: Board) =>
  <const>{ type: 'LOAD_BOARD_SUCCESSFUL', payload: { board } };
export const loadBoardFailed = (error: string) =>
  <const>{ type: 'LOAD_BOARD_FAILED', payload: { error } };
export const unloadBoard = () => <const>{ type: 'UNLOAD_BOARD' };
export const moveList = (payload: { sourceIdx: number; destinationIdx: number }) =>
  <const>{ type: 'MOVE_LIST', payload };
export const moveCard = (payload: {
  sourceId: string;
  sourceIdx: number;
  destinationId: string;
  destinationIdx: number;
  draggableId: string;
}) =>
  <const>{
    type: 'MOVE_CARD',
    payload
  };
export const createNewList = (payload: List) =>
  <const>{
    type: 'CREATE_NEW_LIST',
    payload
  };
export const createNewCard = (payload: { listId: string } & Card) =>
  <const>{
    type: 'CREATE_NEW_CARD',
    payload
  };
export const deleteList = (payload: { listId: string }) =>
  <const>{
    type: 'DELETE_LIST',
    payload
  };
export const deleteCard = (payload: { listId: string; cardId: string }) =>
  <const>{
    type: 'DELETE_CARD',
    payload
  };
export const deleteLabel = (payload: {
  labelId: string;
  cardId: string;
  listId: string;
}) =>
  <const>{
    type: 'DELETE_LABEL',
    payload
  };
export const changeQuery = (query: string) =>
  <const>{
    type: 'CHANGE_QUERY',
    payload: { query }
  };
export const openNewListSidebar = () => <const>{ type: 'OPEN_NEW_LIST_SIDEBAR' };
export const openNewCardSidebar = (listId: string) =>
  <const>{ type: 'OPEN_NEW_CARD_SIDEBAR', payload: { listId } };
export const openDeleteListSidebar = (listId: string) =>
  <const>{ type: 'OPEN_DELETE_LIST_SIDEBAR', payload: { listId } };
export const openDeleteCardSidebar = (payload: { listId: string; cardId: string }) =>
  <const>{ type: 'OPEN_DELETE_CARD_SIDEBAR', payload };
export const openViewCardSidebar = (payload: { card: Card; listId: string }) =>
  <const>{ type: 'OPEN_VIEW_CARD_SIDEBAR', payload };
export const closeSidebar = () => <const>{ type: 'CLOSE_SIDEBAR' };
export const editCard = (card: Card) => <const>{ type: 'EDIT_CARD', payload: { card } };
export const saveCard = () => <const>{ type: 'SAVE_CARD' };

export type LabelColor = 'red' | 'green' | 'orange' | 'blue';

export enum SidebarStatus {
  HIDDEN = 'hidden',
  CREATING_NEW_LIST = 'creating_new_list',
  CREATING_NEW_CARD = 'creating_new_card',
  DELETING_CARD = 'deleting_card',
  DELETING_LIST = 'deleting_list',
  VIEWING_CARD = 'viewing_card'
}

export const initialState: BoardState = {
  board: undefined,
  error: undefined,
  query: '',
  status: SidebarStatus.HIDDEN,
  listId: undefined,
  cardId: undefined,
  card: undefined
};

export type BoardState = {
  board?: Board;
  error?: string;
  query: string;
  status: SidebarStatus;
  listId?: string;
  cardId?: string;
  card?: Card;
};

// Reducer
export const reducer = (state: BoardState = initialState, action: Action) => {
  switch (action.type) {
    case 'LOAD_BOARD_STARTED':
      return { ...state, board: undefined, error: undefined };
    case 'LOAD_BOARD_SUCCESSFUL':
      return { ...state, board: action.payload.board, error: undefined };
    case 'LOAD_BOARD_FAILED':
      return { ...state, board: undefined, error: action.payload.error };
    case 'UNLOAD_BOARD':
      return initialState;
    case 'MOVE_LIST':
      if (!state.board) return state;
      return {
        ...state,
        board: {
          ...state.board,
          lists: moveItem(
            state.board.lists,
            action.payload.sourceIdx,
            action.payload.destinationIdx
          )
        }
      };
    case 'MOVE_CARD':
      if (!state.board) return state;

      if (action.payload.sourceId === action.payload.destinationId) {
        return {
          ...state,
          board: {
            ...state.board,
            lists: state.board.lists.map((list) => {
              if (list.id === action.payload.sourceId) {
                return {
                  ...list,
                  cards: moveItem(
                    list.cards,
                    action.payload.sourceIdx,
                    action.payload.destinationIdx
                  )
                };
              }
              return list;
            })
          }
        };
      }

      const list = state.board.lists.find((list) => list.id === action.payload.sourceId);
      const card = list?.cards.find((card) => card.id === action.payload.draggableId);

      if (!card) return state;

      return {
        ...state,
        board: {
          ...state.board,
          lists: state.board.lists.map((list) => {
            if (list.id === action.payload.sourceId) {
              return {
                ...list,
                cards: removeItemFromArray(list.cards, action.payload.sourceIdx)
              };
            }
            if (list.id === action.payload.destinationId) {
              return {
                ...list,
                cards: insertItemIntoArray(
                  list.cards,
                  card,
                  action.payload.destinationIdx
                )
              };
            }
            return list;
          })
        }
      };
    case 'CREATE_NEW_LIST':
      if (!state.board) return state;
      console.log(action.payload);
      return {
        ...state,
        board: {
          ...state.board,
          lists: [...state.board.lists, action.payload]
        },
        status: SidebarStatus.HIDDEN
      };
    case 'CREATE_NEW_CARD':
      if (!state.board) return state;

      const { listId, ...newCard } = action.payload;
      return {
        ...state,
        board: {
          ...state.board,
          lists: state.board.lists.map((list) => {
            if (list.id === action.payload.listId) {
              return {
                ...list,
                cards: [...list.cards, newCard]
              };
            }
            return list;
          })
        },
        status: SidebarStatus.HIDDEN
      };
    case 'DELETE_CARD':
      if (!state.board) return state;

      return {
        ...state,
        board: {
          ...state.board,
          lists: state.board.lists.map((list) => {
            if (list.id === action.payload.listId) {
              return {
                ...list,
                cards: list.cards.filter((card) => card.id !== action.payload.cardId)
              };
            }
            return list;
          })
        },
        status: SidebarStatus.HIDDEN
      };
    case 'DELETE_LIST':
      if (!state.board) return state;

      return {
        ...state,
        board: {
          ...state.board,
          lists: state.board.lists.filter((list) => list.id !== action.payload.listId)
        },
        status: SidebarStatus.HIDDEN
      };
    case 'CHANGE_QUERY':
      return { ...state, query: action.payload.query };
    case 'OPEN_NEW_LIST_SIDEBAR':
      return { ...state, status: SidebarStatus.CREATING_NEW_LIST };
    case 'OPEN_NEW_CARD_SIDEBAR':
      return {
        ...state,
        status: SidebarStatus.CREATING_NEW_CARD,
        listId: action.payload.listId
      };
    case 'OPEN_DELETE_LIST_SIDEBAR':
      return {
        ...state,
        status: SidebarStatus.DELETING_LIST,
        listId: action.payload.listId
      };
    case 'OPEN_DELETE_CARD_SIDEBAR':
      return {
        ...state,
        status: SidebarStatus.DELETING_CARD,
        listId: action.payload.listId,
        cardId: action.payload.cardId
      };
    case 'OPEN_VIEW_CARD_SIDEBAR':
      return {
        ...state,
        status: SidebarStatus.VIEWING_CARD,
        card: action.payload.card,
        listId: action.payload.listId
      };
    case 'CLOSE_SIDEBAR':
      return {
        ...state,
        listId: undefined,
        cardId: undefined,
        status: SidebarStatus.HIDDEN
      };
    case 'EDIT_CARD':
      return {
        ...state,
        card: action.payload.card
      };
    case 'SAVE_CARD':
      if (!state.board) return state;

      return {
        ...state,
        status: SidebarStatus.HIDDEN,
        board: {
          ...state.board,
          lists: state.board.lists.map((list) => {
            if (list.id === state.listId) {
              return {
                ...list,
                cards: list.cards.map((card) => {
                  if (card.id === state.card?.id) {
                    return state.card;
                  }
                  return card;
                })
              };
            }
            return list;
          })
        },
        card: undefined
      };
    default:
      return state;
  }
};

// Selectors
export const selectBoard = (state: BoardState) => state.board;
export const selectBoardName = (state: BoardState) => state.board?.name;
export const selectBoardLoading = (state: BoardState) => !state.board && !state.error;
export const selectBoardError = (state: BoardState) => state.error;
export const selectBoardQuery = (state: BoardState) => state.query;
export const selectBoardMembers = (state: BoardState) => state.board?.members;
export const selectListId = (state: BoardState) => state.listId;
export const selectCardId = (state: BoardState) => state.cardId;
export const selectSidebarStatus = (state: BoardState) => state.status;
export const selectViewingCard = (state: BoardState) => state.card;
