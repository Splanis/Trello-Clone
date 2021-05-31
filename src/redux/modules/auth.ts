import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User, UserBoard } from '../../models/User';

export type Auth = {
  isAuthenticated: boolean;
  user?: User;
};

const authInitialState: Auth = {
  isAuthenticated: false,
  user: undefined
};

const authSlice = createSlice({
  name: 'board',
  initialState: authInitialState,
  reducers: {
    signInSuccessful(state, action: PayloadAction<User>) {
      state.isAuthenticated = true;
      state.user = action.payload;
    },
    signOut(state) {
      state.isAuthenticated = false;
      state.user = undefined;
    },
    createBoardSuccessful(state, action: PayloadAction<UserBoard>) {
      if (!state.user || !state.isAuthenticated) return state;
      state.user.boards.push(action.payload);
    },
    loadBoardsSuccessful(state, action: PayloadAction<UserBoard[]>) {
      if (!state.user || !state.isAuthenticated) return state;
      state.user.boards = action.payload;
    }
  }
});

// Reducer
export const authReducer = authSlice.reducer;

// Actions
export const {
  signInSuccessful,
  signOut,
  loadBoardsSuccessful,
  createBoardSuccessful
} = authSlice.actions;
