import { move } from '../../../utlis/move';
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

const initialState = {
  name: '',
  id: '',
  lists: []
};

// Types
export type IBoardState = IBoard | undefined;

// Actions

// Reducer
export const boardReducer = (state: IBoardState = initialState, action: Action) => {
  switch (action.type) {
    case 'LOAD_BOARD':
      return { ...state, ...action.payload };
    case 'UNLOAD_BOARD':
      return { ...state, ...initialState };
    case 'MOVE_LIST':
      return {
        ...state,
        lists: move(state.lists, action.payload.sourceIdx, action.payload.destinationIdx)
      };
    case 'MOVE_CARD':
      if (action.payload.sourceId === action.payload.destinationId) {
        return {
          ...state,
          lists: state.lists.map((list) => {
            if (list.id === action.payload.sourceId) {
              return {
                ...list,
                cards: move(
                  list.cards,
                  action.payload.sourceIdx,
                  action.payload.destinationIdx
                )
              };
            }
            return list;
          })
        };
      }

      const list = state!.lists.find((list) => list.id === action.payload.sourceId);
      const card = list?.cards.find((card) => card.id === action.payload.draggableId);

      if (!card) return state;

      return {
        ...state,
        lists: state.lists.map((list) => {
          if (list.id === action.payload.sourceId) {
            list.cards.splice(action.payload.sourceIdx, 1);
          }
          if (list.id === action.payload.destinationId) {
            list.cards.splice(action.payload.destinationIdx, 0, card);
          }
          return list;
        })
      };
    case 'CREATE_NEW_LIST':
      return {
        ...state,
        lists: [...state.lists, { ...action.payload, cards: [] }]
      };
    case 'CREATE_NEW_CARD':
      return {
        ...state,
        lists: state.lists.map((list) => {
          if (list.id === action.payload.listId) {
            return { ...list, cards: [...list.cards, action.payload] };
          } else return list;
        })
      };
    default:
      return state;
  }
};

// Selectors
export const selectBoard = (state: State) => state.board;
