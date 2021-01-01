import { moveItem } from '../../../utils/handleArrays';
import { State } from '../rootReducer';
import { v4 as uuid } from 'uuid';
import { IBoard } from '../../models/Board';
import { Action } from './actions';
import { theme } from '../../../ui/theme';

// Initial State
export const createInitialBoard = (name: string) => ({
  name,
  id: uuid(),
  lists: [
    {
      id: uuid(),
      name: 'Todo',
      cards: [
        {
          id: uuid(),
          name: 'My First Task',
          labels: [{ label: 'important', color: theme.colors.labels.green }]
        }
      ]
    },
    {
      id: uuid(),
      name: 'In Progress',
      cards: []
    },
    {
      id: uuid(),
      name: 'Done',
      cards: []
    }
  ]
});

const emptyBoard: IBoard = { name: '', id: '', lists: [] };
const initialState = {
  board: emptyBoard,
  loading: true,
  error: undefined
};

// Types
export type IBoardState = { board: IBoard; loading: boolean; error: string | undefined };

// Actions

// Reducer
export const boardReducer = (state: IBoardState = initialState, action: Action) => {
  switch (action.type) {
    case 'LOAD_BOARD':
      return { ...state, board: action.payload, error: undefined, loading: false };
    case 'LOAD_BOARD_FAILED':
      return { ...state, board: emptyBoard, error: action.payload.error, loading: false };
    case 'UNLOAD_BOARD':
      return initialState;
    case 'MOVE_LIST':
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
              list.cards.splice(action.payload.sourceIdx, 1);
            }
            if (list.id === action.payload.destinationId) {
              list.cards.splice(action.payload.destinationIdx, 0, card);
            }
            return list;
          })
        }
      };
    case 'CREATE_NEW_LIST':
      return {
        ...state,
        board: {
          ...state.board,
          lists: [...state.board.lists, { ...action.payload, cards: [] }]
        }
      };
    case 'CREATE_NEW_CARD':
      return {
        ...state,
        board: {
          ...state.board,
          lists: state.board.lists.map((list) => {
            if (list.id === action.payload.listId) {
              return {
                ...list,
                cards: [
                  ...list.cards,
                  { id: action.payload.id, name: action.payload.name }
                ]
              };
            } else return list;
          })
        }
      };
    case 'DELETE_CARD':
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
            } else return list;
          })
        }
      };
    case 'DELETE_LIST':
      return {
        ...state,
        board: {
          ...state.board,
          lists: state.board.lists.filter((list) => list.id !== action.payload.listId)
        }
      };
    default:
      return state;
  }
};

// Selectors
export const selectBoard = (state: State) =>
  state.board.board.id ? state.board.board : undefined;
export const selectBoardLoading = (state: State) => state.board.loading;
export const selectBoardError = (state: State) => state.board.error;
