import { isRight } from 'fp-ts/Either';
import { pipe } from 'fp-ts/lib/function';
import * as D from 'io-ts/Decoder';
import { v4 as uuid } from 'uuid';
import { theme } from '../ui-components/theme';

const LabelDecoder = D.type({
  label: D.string,
  color: D.string
});

export type Label = D.TypeOf<typeof LabelDecoder>;

const CardDecoder = pipe(
  D.type({
    id: D.string,
    name: D.string,

    labels: D.array(LabelDecoder)
  }),
  D.intersect(
    D.partial({
      assignee: D.type({
        photo: D.string,
        id: D.string
      })
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
  lists: D.array(ListDecoder)
});

export type Board = D.TypeOf<typeof BoardDecoder>;

export const isBoard = (input: unknown): input is Board => {
  const result = BoardDecoder.decode(input);

  return isRight(result);
};

export const createInitialBoard = (name: string): Board => ({
  name,
  id: uuid(),
  lists: [
    {
      id: uuid(),
      name: 'Todo',
      cards: [
        {
          id: uuid(),
          name: 'My First Task',
          labels: [{ label: 'important', color: theme.colors.labels.green }]
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
