import { configureStore } from '@reduxjs/toolkit';
import { Auth } from './modules/auth';
import { rootReducer, RootState } from './rootReducer';

const saveAuthToLocalState = (state: RootState) => {
  try {
    localStorage.setItem('auth', JSON.stringify(state.auth));
  } catch (error) {
    console.log(error);
  }
};

const loadAuth = (): { auth: Auth } | undefined => {
  try {
    const localState = localStorage.getItem('auth');
    if (!localState) return undefined;
    return { auth: JSON.parse(localState) };
  } catch (error) {
    return undefined;
  }
};

export const store = configureStore({
  reducer: rootReducer,
  preloadedState: loadAuth()
});
store.subscribe(() => saveAuthToLocalState(store.getState()));
