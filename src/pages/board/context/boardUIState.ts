import { theme } from '../../../ui-components/theme';

type Colors = keyof typeof theme.colors.labels;
export type LabelColor = typeof theme.colors.labels[Colors];
export const labelColors: LabelColor[] = [
  theme.colors.labels.green,
  theme.colors.labels.blue,
  theme.colors.labels.orange,
  theme.colors.labels.red
];

export enum BoardStatus {
  IDLE = 'idle',
  CREATING_NEW_LIST = 'creating_new_list',
  CREATING_NEW_CARD = 'creating_new_card',
  DELETING_CARD = 'deleting_card',
  DELETING_LIST = 'deleting_list'
}

export type State = {
  status: BoardStatus;
  listId?: string;
  cardId?: string;
};

export const initialState: State = {
  status: BoardStatus.IDLE,
  listId: undefined,
  cardId: undefined
};

export type Action = ReturnType<
  | typeof openNewListModal
  | typeof openNewCardModal
  | typeof openDeleteListModal
  | typeof openDeleteCardModal
  | typeof closeModal
>;

export const openNewListModal = () => <const>{ type: 'OPEN_NEW_LIST_MODAL' };
export const openNewCardModal = (listId: string) =>
  <const>{ type: 'OPEN_NEW_CARD_MODAL', payload: { listId } };
export const openDeleteListModal = (listId: string) =>
  <const>{ type: 'OPEN_DELETE_LIST_MODAL', payload: { listId } };
export const openDeleteCardModal = (payload: { listId: string; cardId: string }) =>
  <const>{ type: 'OPEN_DELETE_CARD_MODAL', payload };
export const closeModal = () => <const>{ type: 'CLOSE_MODAL' };

export const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case 'OPEN_NEW_LIST_MODAL':
      return { ...state, status: BoardStatus.CREATING_NEW_LIST };
    case 'OPEN_NEW_CARD_MODAL':
      return {
        ...state,
        status: BoardStatus.CREATING_NEW_CARD,
        listId: action.payload.listId
      };
    case 'OPEN_DELETE_LIST_MODAL':
      return {
        ...state,
        status: BoardStatus.DELETING_LIST,
        listId: action.payload.listId
      };
    case 'OPEN_DELETE_CARD_MODAL':
      return {
        ...state,
        status: BoardStatus.DELETING_CARD,
        listId: action.payload.listId,
        cardId: action.payload.cardId
      };
    case 'CLOSE_MODAL':
      return initialState;
    default:
      return state;
  }
};

export const selectStatus = (state: State) => state.status;
export const selectListId = (state: State) => state.listId;
export const selectCardId = (state: State) => state.cardId;
