import { Board } from '../../models/Board';
import { getBoardCollection, getUsersCollection } from '../collections';
import { firestoreField } from '../firebase';

export const saveBoardToFirestore = (board: Board) =>
  getBoardCollection(board.id).set(board);

export const addUserBoardToFirestore = async (userId: string, board: Board) => {
  try {
    await getBoardCollection(board.id).set(board);

    const userDoc = await getUsersCollection().doc(userId).get();
    if (userDoc.exists) {
      await getUsersCollection()
        .doc(userId)
        .update({
          boards: firestoreField.arrayUnion({ name: board.name, id: board.id })
        });
    } else {
      await getUsersCollection()
        .doc(userId)
        .set({
          boards: firestoreField.arrayUnion({ name: board.name, id: board.id })
        });
    }
  } catch (error) {
    console.log(error);
  }
};
