import { saveBoardToFirestore } from '../firebase/services';
import { Board } from '../models/Board';

export const saveBoard = (board: Board) => saveBoardToFirestore(board);
