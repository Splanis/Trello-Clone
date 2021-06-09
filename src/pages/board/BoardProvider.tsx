import { createContext, Dispatch, ReactNode, useContext, useReducer } from 'react';
import { Action, BoardState, initialState, reducer } from './boardState';

type Values = {
  state: BoardState;
  dispatch: Dispatch<Action>;
};

const BoardContext = createContext<Values>({
  state: initialState,
  dispatch: () => null
});

export function BoardProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <BoardContext.Provider value={{ state, dispatch }}>{children}</BoardContext.Provider>
  );
}

export const useBoard = () => {
  const context = useContext(BoardContext);

  return context;
};
