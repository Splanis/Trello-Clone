export type Action = ReturnType<
  | typeof signInAction
  | typeof signOutAction
  | typeof createBoardAction
  | typeof loadBoardsAction
>;

export const signInAction = (payload: {
  uid: string;
  username: string;
  accessToken: string;
}) => <const>{ type: 'SIGN_IN', payload: payload };

export const signOutAction = () => <const>{ type: 'SIGN_OUT' };

export const createBoardAction = (payload: { id: string; name: string }) =>
  <const>{ type: 'CREATE_BOARD', payload: payload };

export const loadBoardsAction = (payload: { boards: [] }) =>
  <const>{ type: 'LOAD_BOARDS', payload: payload };
