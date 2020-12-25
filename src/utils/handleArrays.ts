export const moveItem = (arr: Array<any>, source: number, destination: number) => {
  let newArray = [...arr];
  const { item, array } = removeItemFromArray(arr, source);
  newArray = insertItemIntoArray(array, item, destination);

  return newArray;
};

export const removeItemFromArray = (array: Array<any>, index: number) => {
  let newArray = [...array];
  const item = newArray.splice(index, 1);

  return { item: item[0], array: newArray };
};

export const insertItemIntoArray = (array: Array<any>, item: any, index: number) => {
  let newArray = [...array];
  newArray.splice(index, 0, item);

  return newArray;
};
