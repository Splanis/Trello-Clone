import { combineReducers } from 'redux';
import { boardReducer, IBoardState } from './board/boardReducer';
import { IUserState, userReducer } from './user/userReducer';

export type State = { user: IUserState; board: IBoardState };

export const rootReducer = combineReducers({ user: userReducer, board: boardReducer });
