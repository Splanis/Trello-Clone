import { RootState } from '../rootReducer';

export const selectUser = (state: RootState) => state.auth.user;
export const selectIsAuthenticated = (state: RootState) => state.auth.isAuthenticated;
export const selectUserBoards = (state: RootState) => state.auth.user?.boards;
export const selectUserName = (state: RootState) => state.auth.user?.username;
export const selectUserId = (state: RootState) => state.auth.user?.userId;
export const selectUserProfilePhoto = (state: RootState) => state.auth.user?.photo;
