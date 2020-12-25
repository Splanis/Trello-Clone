import { dataIsBoard, dataIsCard, dataIsLabel, dataIsList } from './predicates';

const expectedTrue = true;
const expectedFalse = false;
const label = {
  label: 'this is a label',
  color: 'red'
};
const card = { id: 'id', name: 'this is card', labels: [label] };
const list = { id: 'id', name: 'this is list', cards: [card] };
const board = { id: 'id', name: 'this is board', lists: [list] };

test('dataIsLabel', () => {
  const notLabel1 = {
    label: 'this is a label',
    color: 'this is a label',
    what: '?'
  };

  const received = dataIsLabel(label);
  const received1 = dataIsLabel(notLabel1);

  expect(received).toBe(expectedTrue);
  expect(received1).toBe(expectedFalse);
});

test('dataIsCard', () => {
  const notCard1 = { name: 'this is card', labels: [label] };

  const received = dataIsCard(card);
  const received1 = dataIsCard(notCard1);

  expect(received).toBe(expectedTrue);
  expect(received1).toBe(expectedFalse);
});

test('dataIsList', () => {
  const notList1 = { name: 'this is list', cards: [card] };

  const received = dataIsList(list);
  const received1 = dataIsList(notList1);

  expect(received).toBe(expectedTrue);
  expect(received1).toBe(expectedFalse);
});

test('dataIsBoard', () => {
  const notBoard1 = { name: 'this is list', lists: [card] };

  const received = dataIsBoard(board);
  const received1 = dataIsBoard(notBoard1);

  expect(received).toBe(expectedTrue);
  expect(received1).toBe(expectedFalse);
});
