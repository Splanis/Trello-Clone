import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import { rootReducer, State } from './reducers/rootReducer';

export const loadLocalState = () => {
  try {
    const localState = localStorage.getItem('state');
    if (!localState) return undefined;
    return JSON.parse(localState);
  } catch (error) {
    return undefined;
  }
};

const saveLocalState = (state: State) => {
  try {
    localStorage.setItem('state', JSON.stringify(state));
  } catch (error) {
    console.log(error);
  }
};

const localState = loadLocalState();
export const store = createStore(rootReducer, localState, applyMiddleware(thunk));

store.subscribe(() => saveLocalState(store.getState()));
