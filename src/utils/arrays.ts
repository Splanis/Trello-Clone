export const moveItem = <T>(array: Array<T>, source: number, destination: number) => {
  const item = array[source];
  const arrayWithoutItem = removeItemFromArray(array, source);

  return insertItemIntoArray(arrayWithoutItem, item, destination);
};

export const removeItemFromArray = <T>(array: Array<T>, index: number) =>
  array.filter((_, i) => i !== index);

export const insertItemIntoArray = <T>(array: Array<T>, item: T, index: number) => [
  ...array.slice(0, index),
  item,
  ...array.slice(index)
];
