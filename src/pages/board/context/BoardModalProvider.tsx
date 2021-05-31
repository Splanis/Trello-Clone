import {
  createContext,
  Dispatch,
  ReactNode,
  useContext,
  useMemo,
  useReducer
} from 'react';
import {
  Action,
  closeModal,
  initialState,
  openDeleteCardModal,
  openDeleteListModal,
  openNewCardModal,
  openNewListModal,
  reducer,
  selectCardId,
  selectListId,
  selectStatus,
  State
} from './boardUIState';

type BoardUIStateContextType = {
  state: State;
  dispatch: Dispatch<Action>;
};

const BoardUIStateContext = createContext<BoardUIStateContextType>({
  state: initialState,
  dispatch: () => {}
});

export function BoardUIStateProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <BoardUIStateContext.Provider value={{ state, dispatch }}>
      {children}
    </BoardUIStateContext.Provider>
  );
}

export const useBoardUIState = () => {
  const { state, dispatch } = useContext(BoardUIStateContext);
  const status = selectStatus(state);
  const listId = selectListId(state);
  const cardId = selectCardId(state);

  const values = useMemo(
    () => ({
      status,
      listId,
      cardId,
      openNewCardModal: (id: string) => {
        dispatch(openNewCardModal(id));
      },
      openDeleteListModal: (id: string) => {
        dispatch(openDeleteListModal(id));
      },
      openDeleteCardModal: (payload: { listId: string; cardId: string }) => {
        dispatch(openDeleteCardModal(payload));
      },
      openNewListModal: () => {
        dispatch(openNewListModal());
      },
      closeModal: () => {
        dispatch(closeModal());
      }
    }),
    [cardId, listId, status, dispatch]
  );

  return values;
};
