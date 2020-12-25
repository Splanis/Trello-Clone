import firebase from 'firebase';
import { Dispatch } from 'redux';
import { auth, db, firestoreField } from '../../../firebase/firebase';
import { createInitialBoard } from '../board/boardReducer';
import {
  createBoardAction,
  loadBoardsAction,
  signInAction,
  signOutAction
} from './actions';

export const signIn = () => (dispatch: Dispatch) => {
  const provider = new firebase.auth.GoogleAuthProvider();
  auth
    .signInWithPopup(provider)
    .then((user) => {
      if (user.user) {
        const credential = user.credential as firebase.auth.OAuthCredential;
        const accessToken = credential.accessToken;
        const username = user.user.displayName;
        const uid = user.user.uid;

        if (uid && username && accessToken)
          dispatch(signInAction({ uid, username, accessToken }));

        db.collection('users')
          .doc(uid)
          .get()
          .then((u) => {
            const user = u.data();
            if (!user) db.collection('users').doc(uid).set({ boards: [] });
          });
      }
    })
    .catch((error) => console.log(error));
};

export const signOut = () => (dispatch: Dispatch) => {
  dispatch(signOutAction());
};

export const createBoard = (payload: { name: string; id: string }) => (
  dispatch: Dispatch
) => {
  const board = createInitialBoard(payload.name);
  console.log(payload);
  db.collection('boards')
    .doc(board.id)
    .set(board)
    .then(() => {
      db.collection('users')
        .doc(payload.id)
        .update({
          boards: firestoreField.arrayUnion({ name: payload.name, id: board.id })
        });
      dispatch(createBoardAction({ name: payload.name, id: board.id }));
    })
    .catch((error) => console.log(error));
};

export const loadBoards = (payload: { userId: string }) => (dispatch: Dispatch) => {
  db.collection('users')
    .doc(payload.userId)
    .get()
    .then((doc) => {
      const boards = doc.data()?.boards || [];
      dispatch(loadBoardsAction(boards));
    });
};
