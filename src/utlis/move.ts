export const move = (array: Array<any>, source: number, destination: number) => {
  let newArray = [...array];
  const item = newArray.splice(source, 1);
  newArray.splice(destination, 0, item[0]);

  return newArray;
};
