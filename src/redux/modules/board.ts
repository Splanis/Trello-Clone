import { createEntityAdapter, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Card, List } from '../../models/Board';
import { insertItemIntoArray, moveItem, removeItemFromArray } from '../../utils/arrays';
import {
  loadBoardSuccessful,
  loadBoardFailed,
  loadBoardStarted,
  unloadBoard
} from './board.actions';

const ListAdapter = createEntityAdapter<List>();

type BoardState = {
  isLoading: boolean;
  error?: string;
  id?: string;
  name?: string;
};
const initialBoard: BoardState = {
  isLoading: false,
  error: undefined,
  id: undefined,
  name: undefined
};

const boardSlice = createSlice({
  name: 'board',
  initialState: ListAdapter.getInitialState(initialBoard),
  reducers: {
    moveList(
      state,
      action: PayloadAction<{ sourceIdx: number; destinationIdx: number }>
    ) {
      const lists = selectAllLists(state);
      const listsToUpdate = moveItem(
        lists,
        action.payload.sourceIdx,
        action.payload.destinationIdx
      );
      ListAdapter.setAll(state, listsToUpdate);
    },
    moveCard(
      state,
      action: PayloadAction<{
        sourceId: string;
        sourceIdx: number;
        destinationId: string;
        destinationIdx: number;
        draggableId: string;
      }>
    ) {
      const list = selectListById(state, action.payload.sourceId);
      if (!list) return state;

      const lists = selectAllLists(state);
      const listsToUpdate = lists.map((l) => {
        if (action.payload.sourceId === action.payload.destinationId) {
          if (l.id === action.payload.sourceId) {
            return {
              ...l,
              cards: moveItem(
                l.cards,
                action.payload.sourceIdx,
                action.payload.destinationIdx
              )
            };
          }
        }
        if (l.id === action.payload.sourceId) {
          return {
            ...l,
            cards: removeItemFromArray(list.cards, action.payload.sourceIdx)
          };
        }
        if (l.id === action.payload.destinationId) {
          const sourceList = selectListById(state, action.payload.sourceId);
          if (!sourceList) return l;
          const card = sourceList?.cards[action.payload.sourceIdx];
          if (!card) return l;
          return {
            ...l,
            cards: insertItemIntoArray(l.cards, card, action.payload.destinationIdx)
          };
        }
        return l;
      });

      ListAdapter.setAll(state, listsToUpdate);
    },
    createNewList(
      state,
      action: PayloadAction<{
        id: string;
        name: string;
      }>
    ) {
      const list = {
        id: action.payload.id,
        name: action.payload.name,
        cards: []
      };
      ListAdapter.addOne(state, list);
    },
    createNewCard(state, action: PayloadAction<Card & { listId: string }>) {
      const { listId, ...newCard } = action.payload;
      const list = selectListById(state, listId);
      if (!list) return state;

      const cards = [...list.cards, newCard];
      ListAdapter.updateOne(state, {
        id: listId,
        changes: { cards }
      });
    },
    deleteList(state, action: PayloadAction<{ listId: string }>) {
      ListAdapter.removeOne(state, action.payload.listId);
    },
    deleteCard(state, action: PayloadAction<{ listId: string; cardId: string }>) {
      const list = selectListById(state, action.payload.listId);
      if (!list) return state;

      const cards = list.cards.filter((card) => card.id !== action.payload.cardId);
      ListAdapter.updateOne(state, {
        id: action.payload.listId,
        changes: { cards }
      });
    }
  },
  extraReducers: (builder) => {
    builder.addCase(loadBoardStarted, (state) => {
      state.isLoading = true;
      state.error = undefined;
    });
    builder.addCase(loadBoardSuccessful, (state, action) => {
      state.id = action.payload.id;
      state.name = action.payload.name;
      state.isLoading = false;
      state.error = undefined;

      ListAdapter.setAll(state, action.payload.lists);
    });
    builder.addCase(loadBoardFailed, (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    });
    builder.addCase(unloadBoard, (state) => {
      state.error = undefined;
      state.isLoading = false;
      state.name = undefined;
      state.id = undefined;
    });
  }
});

// Reducer
export const boardReducer = boardSlice.reducer;

// Actions
export const {
  moveCard,
  moveList,
  deleteCard,
  deleteList,
  createNewCard,
  createNewList
} = boardSlice.actions;

// Selectors
const {
  selectById: selectListById,
  selectAll: selectAllLists
} = ListAdapter.getSelectors();
export const getBoardSelectors = ListAdapter.getSelectors;
