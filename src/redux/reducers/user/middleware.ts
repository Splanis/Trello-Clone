import firebase from 'firebase';
import { auth, db, firestoreField } from '../../../firebase/firebase';
import { createInitialBoard } from '../board/boardReducer';
import {
  createBoardAction,
  loadBoardsAction,
  signInAction,
  signOutAction
} from './actions';

export const signIn = () => (dispatch: any) => {
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
      }
    })
    .catch((error) => console.log(error));
};

export const signOut = () => (dispatch: any) => {
  dispatch(signOutAction());
};

export const createBoard = (payload: { name: string; id: string }) => (dispatch: any) => {
  const board = createInitialBoard(payload.name);
  db.collection('boards')
    .doc(board.id)
    .set(board)
    .then(() => {
      db.collection('users')
        .doc(payload.id)
        .update({
          boards: firestoreField.arrayUnion(payload)
        });
      dispatch(createBoardAction({ name: payload.name, id: board.id }));
    })
    .catch((error) => console.log(error));
};

export const loadBoards = (payload: { userId: string }) => (dispatch: any) => {
  db.collection('users')
    .doc(payload.userId)
    .get()
    .then((doc) => {
      const boards = doc.data()?.boards;
      dispatch(loadBoardsAction(boards));
    });
};
