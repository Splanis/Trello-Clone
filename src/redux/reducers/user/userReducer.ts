import { IUser } from '../../models/User';
import { State } from '../rootReducer';
import { Action } from './actions';

// Initial State
const initialState = null;

// Types
export type IUserState = IUser | null;

// Reducer
export const userReducer = (state: IUserState = initialState, action: Action) => {
  switch (action.type) {
    case 'SIGN_IN':
      return {
        ...state,
        uid: action.payload.uid,
        username: action.payload.username,
        accessToken: action.payload.accessToken
      };
    case 'SIGN_OUT':
      return initialState;
    case 'CREATE_BOARD':
      if (!state) return state;
      return {
        ...state,
        boards: [...state.boards, action.payload]
      };
    case 'LOAD_BOARDS':
      if (!state) return state;
      return {
        ...state,
        boards: action.payload
      };
    default:
      break;
  }
  return state;
};

// Selectors
export const selectUser = (state: State) => state.user;
export const selectUserId = (state: State) => state.user?.uid;
export const selectBoards = (state: State) => state.user?.boards;
