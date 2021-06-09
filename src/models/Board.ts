import { isRight } from 'fp-ts/Either';
import { pipe } from 'fp-ts/lib/function';
import * as D from 'io-ts/Decoder';
import { v4 as uuid } from 'uuid';

export type BoardMember = D.TypeOf<typeof BoardMemberDecoder>;

const BoardMemberDecoder = D.type({
  photo: D.string,
  username: D.string,
  id: D.string
});

const LabelDecoder = D.type({
  id: D.string,
  label: D.string,
  color: D.literal('red', 'blue', 'orange', 'green')
});

export type Label = D.TypeOf<typeof LabelDecoder>;

const CardDecoder = pipe(
  D.type({
    id: D.string,
    name: D.string,
    description: D.string,
    labels: D.array(LabelDecoder)
  }),
  D.intersect(
    D.partial({
      assignee: BoardMemberDecoder
    })
  )
);

export type Card = D.TypeOf<typeof CardDecoder>;

const ListDecoder = D.type({
  id: D.string,
  name: D.string,
  cards: D.array(CardDecoder)
});

export type List = D.TypeOf<typeof ListDecoder>;

const BoardDecoder = D.type({
  id: D.string,
  name: D.string,
  lists: D.array(ListDecoder),
  members: D.array(BoardMemberDecoder)
});

export type Board = D.TypeOf<typeof BoardDecoder>;

export const isBoard = (input: unknown): input is Board => {
  const result = BoardDecoder.decode(input);

  return isRight(result);
};

export const createInitialBoard = (name: string, member: BoardMember): Board => ({
  name,
  id: uuid(),
  members: [member],
  lists: [
    {
      id: uuid(),
      name: 'Todo',
      cards: [
        {
          id: `${name.slice(0, 3)}-1`,
          name: 'My First Task',
          description: '',
          labels: [{ id: uuid(), label: 'important', color: 'green' }]
        }
      ]
    },
    {
      id: uuid(),
      name: 'In Progress',
      cards: []
    },
    {
      id: uuid(),
      name: 'Done',
      cards: []
    }
  ]
});
