import { isRight } from 'fp-ts/Either';
import * as D from 'io-ts/Decoder';

export type UserBoard = D.TypeOf<typeof UserBoardDecoder>;

const UserBoardDecoder = D.type({
  name: D.string,
  id: D.string
});

export type User = D.TypeOf<typeof UserDecoder>;

const UserDecoder = D.type({
  userId: D.string,
  username: D.string,
  photo: D.string
});

const isUserBoard = (input: unknown): input is UserBoard => {
  const result = UserBoardDecoder.decode(input);

  return isRight(result);
};

export const areUserBoards = (input: any): input is UserBoard[] =>
  input?.every(isUserBoard);

export const isUser = (input: unknown): input is User => {
  const result = UserDecoder.decode(input);

  return isRight(result);
};
