import { combineReducers } from '@reduxjs/toolkit';
import { authReducer } from './modules/auth';
import { boardReducer } from './modules/board';

export const rootReducer = combineReducers({ auth: authReducer, board: boardReducer });
export type RootState = ReturnType<typeof rootReducer>;
