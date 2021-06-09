export const saveToLocalStorage = <T>(key: string, data: T) => {
  localStorage.setItem(key, JSON.stringify({ data }));
};

export const getFromLocalStorage = (key: string) => {
  try {
    const res = localStorage.getItem(key);
    if (!res) return undefined;
    const obj = JSON.parse(res);
    return obj.data ?? undefined;
  } catch (error) {
    return undefined;
  }
};
