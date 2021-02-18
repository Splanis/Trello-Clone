import { IUser } from '../../models/User';
import { State } from '../rootReducer';
import { Action } from './actions';

// Initial State
const initialState = {
  username: '',
  uid: '',
  accessToken: '',
  boards: []
};

// Types
export type IUserState = IUser;

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
      return {
        ...state,
        boards: [...state.boards, action.payload]
      };
    case 'LOAD_BOARDS':
      return {
        ...state,
        boards: action.payload
      };
    default:
      return state;
  }
};

// Selectors
export const isLoggedIn = (state: State) => Boolean(state.user.accessToken);
export const selectUsername = (state: State) => state.user.username;
export const selectUserId = (state: State) => state.user.uid;
export const selectBoards = (state: State) => state.user.boards;
