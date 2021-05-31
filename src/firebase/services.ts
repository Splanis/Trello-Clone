import firebase from 'firebase';
import { Board, isBoard, List } from '../models/Board';
import { UserBoard } from '../models/User';
import { createFailure, createSuccess } from '../utils/result';
import { DBCollection } from './DBCollection';
import { auth, db, firestoreField } from './firebase';

export const saveBoardToFirestore = (board: Board) =>
  db.collection(DBCollection.BOARDS).doc(board.id).set(board);

export const loadBoardFromFirestore = async (boardId: string, userId: string) => {
  try {
    const boardRes = await db.collection(DBCollection.BOARDS).doc(boardId).get();
    const boardDoc = boardRes.data();

    if (!boardDoc || !isBoard(boardDoc)) return createFailure('No board found');

    const userRes = await db.collection(DBCollection.USERS).doc(userId).get();
    const userDoc = userRes.data();
    if (!userDoc) return createFailure('No user found');

    const hasBoard = userDoc.boards.find((b: List) => b.id === boardId);
    if (!hasBoard) return createFailure('No access');

    return createSuccess(boardDoc);
  } catch (error) {
    return createFailure('Something went wrong');
  }
};

const provider = new firebase.auth.GoogleAuthProvider();
export const signInWithGoogle = async () => {
  try {
    const { user } = await auth.signInWithPopup(provider);
    if (!user) return createFailure('Can not Authenticate');

    return createSuccess({
      userId: user.uid,
      username: user.displayName || '',
      photo: user.photoURL ?? undefined
    });
  } catch (error) {
    return createFailure(error);
  }
};

export const addUserBoardToFirestore = async (userId: string, board: Board) => {
  try {
    await db.collection(DBCollection.BOARDS).doc(board.id).set(board);

    await db
      .collection(DBCollection.USERS)
      .doc(userId)
      .update({
        boards: firestoreField.arrayUnion({ name: board.name, id: board.id })
      });

    return createSuccess('success');
  } catch (error) {
    return createFailure('Something went wrong');
  }
};

export const loadUserBoardsFromFirestore = async (userId: string) => {
  try {
    const res = await db.collection(DBCollection.USERS).doc(userId).get();
    const doc = res.data();
    if (!doc) return createSuccess([] as UserBoard[]);

    const boards = doc.boards as UserBoard[]; // TODO: validate
    return createSuccess(boards);
  } catch (error) {
    return createFailure('Something went wrong');
  }
};
