import { createSelector } from 'reselect';
import { RootState } from '../rootReducer';
import { getBoardSelectors } from './board';

export const {
  selectById: selectListById,
  selectAll: selectAllLists
} = getBoardSelectors<RootState>((state) => state.board);

export const selectBoardIsLoading = (state: RootState) => state.board.isLoading;
export const selectBoardError = (state: RootState) => state.board.error;
export const selectBoardId = (state: RootState) => state.board.id;
export const selectBoardName = (state: RootState) => state.board.name;
export const selectBoard = createSelector(
  selectAllLists,
  selectBoardName,
  selectBoardId,
  (lists, name, id) => {
    if (!name || !id) return undefined;

    return { lists, name, id };
  }
);
