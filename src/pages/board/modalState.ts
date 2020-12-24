import { ILabel } from '../../redux/models/Board';
import { theme } from '../../ui/theme';

export const colors = [
  theme.colors.labels.green,
  theme.colors.labels.blue,
  theme.colors.labels.orange,
  theme.colors.labels.red
];

export enum ModalStatus {
  HIDDEN,
  NEWLIST,
  NEWCARD
}

export type Action = ReturnType<
  | typeof openNewListModal
  | typeof openNewCardModal
  | typeof closeModal
  | typeof changeListName
  | typeof changeCardName
  | typeof changeCardLabel
  | typeof changeCardColor
  | typeof addLabel
  | typeof removeLabel
>;

export const openNewListModal = () => <const>{ type: 'OPEN_NEW_LIST_MODAL' };
export const openNewCardModal = (listId: string) =>
  <const>{ type: 'OPEN_NEW_CARD_MODAL', payload: { listId } };
export const closeModal = () => <const>{ type: 'CLOSE_MODAL' };
export const changeListName = (text: string) =>
  <const>{ type: 'CHANGE_LIST_NAME', payload: { text } };
export const changeCardName = (text: string) =>
  <const>{ type: 'CHANGE_CARD_NAME', payload: { text } };
export const changeCardLabel = (text: string) =>
  <const>{ type: 'CHANGE_CARD_LABEL', payload: { text } };
export const changeCardColor = (color: string) =>
  <const>{ type: 'CHANGE_CARD_COLOR', payload: { color } };
export const addLabel = () => <const>{ type: 'ADD_LABEL' };
export const removeLabel = () => <const>{ type: 'REMOVE_LABEL' };

export const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case 'OPEN_NEW_LIST_MODAL':
      return { ...state, status: ModalStatus.NEWLIST };
    case 'OPEN_NEW_CARD_MODAL':
      return { ...state, status: ModalStatus.NEWCARD, listId: action.payload.listId };
    case 'CLOSE_MODAL':
      return initialState;
    case 'CHANGE_LIST_NAME':
      return { ...state, listName: action.payload.text };
    case 'CHANGE_CARD_NAME':
      return { ...state, cardName: action.payload.text };
    case 'CHANGE_CARD_LABEL':
      return { ...state, label: action.payload.text };
    case 'CHANGE_CARD_COLOR':
      return { ...state, color: action.payload.color };
    case 'ADD_LABEL':
      return {
        ...state,
        labels: [...state.labels, { label: state.label, color: state.color }]
      };
    case 'REMOVE_LABEL':
      return {
        ...state,
        labels: state.labels.filter((l) => l.label !== state.label)
      };
    default:
      return state;
  }
};

export type State = {
  status: ModalStatus;
  listName: string;
  listId: string | undefined;
  cardName: string;
  label: string;
  color: string;
  labels: ILabel[];
};

export const initialState: State = {
  status: ModalStatus.HIDDEN,
  cardName: '',
  listId: undefined,
  listName: '',
  label: '',
  color: colors[0],
  labels: []
};

export const selectStatus = (state: State) => state.status;
export const selectListName = (state: State) => state.listName;
export const selectCardName = (state: State) => state.cardName;
export const selectLabel = (state: State) => state.label;
export const selectColor = (state: State) => state.color;
export const selectLabels = (state: State) => state.labels;
export const selectListId = (state: State) => state.listId;
