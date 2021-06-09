import { firestore } from './firebase';

const BOARDS_COLLECTION = 'boards';
export const getBoardCollection = (id: string) =>
  firestore.collection(BOARDS_COLLECTION).doc(id);

const USERS_COLLECTION = 'users';
export const getUsersCollection = () => firestore.collection(USERS_COLLECTION);

export const getUserBoardsCollection = (userId: string) =>
  getUsersCollection().doc(userId);
