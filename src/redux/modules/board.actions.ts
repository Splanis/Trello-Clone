import { createAction } from '@reduxjs/toolkit';
import { Board } from '../../models/Board';

export const loadBoardStarted = createAction('load_board_started');
export const loadBoardSuccessful = createAction<Board>('load_board_successful');
export const loadBoardFailed = createAction<string>('load_board_failed');
export const unloadBoard = createAction('unload_board');
