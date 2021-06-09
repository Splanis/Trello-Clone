import { Board } from '../../models/Board';
import { getBoardCollection, getUsersCollection } from '../collections';
import { firestoreField } from '../firebase';

export const saveBoardToFirestore = (board: Board) =>
  getBoardCollection(board.id).set(board);

export const addUserBoardToFirestore = async (userId: string, board: Board) => {
  try {
    await getBoardCollection(board.id).set(board);

    await getUsersCollection()
      .doc(userId)
      .update({
        boards: firestoreField.arrayUnion({ name: board.name, id: board.id })
      });
  } catch (error) {
    console.log(error);
  }
};
