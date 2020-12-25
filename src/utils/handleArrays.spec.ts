import { insertItemIntoArray, moveItem, removeItemFromArray } from './handleArrays';

const array = [1, 2, 3, 4, 5];

test('removeItemFromArray returns an object with the new array and the removed item', () => {
  const index = 1;
  const received = removeItemFromArray(array, index);

  const expected = { item: 2, array: [1, 3, 4, 5] };

  expect(received).toEqual(expected);
});

test('insertItemIntoArray returns the new array', () => {
  const index = 1;
  const item = 10;
  const received = insertItemIntoArray(array, item, index);

  const expected = [1, 10, 2, 3, 4, 5];

  expect(received).toEqual(expected);
});

test('moveItem returns the new array', () => {
  const source = 0;
  const destination = 2;
  const received = moveItem(array, source, destination);

  const expected = [2, 3, 1, 4, 5];

  expect(received).toEqual(expected);
});
