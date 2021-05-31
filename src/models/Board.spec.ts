import { isBoard } from './Board';

test('dataIsBoard1', () => {
  const notBoard = {};

  expect(isBoard(notBoard)).toBe(false);
});

test('dataIsBoard', () => {
  const board = {
    id: 'some_id',
    name: 'some board name',
    lists: [
      {
        id: 'id',
        name: 'this is list',
        cards: [
          {
            id: 'id',
            name: 'this is card',
            labels: [
              {
                label: 'this is a label',
                color: 'red'
              }
            ]
          }
        ]
      }
    ]
  };

  expect(isBoard(board)).toBe(true);
});
