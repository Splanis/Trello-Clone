import { IBoard, ICard, ILabel, IList } from '../../models/Board';

export const dataIsBoard = (data: any): data is IBoard => {
  if (typeof data !== 'object') return false;
  if (Object.keys(data).length !== 3) return false;
  if (
    typeof data.id !== 'string' ||
    typeof data.name !== 'string' ||
    !Array.isArray(data.lists)
  )
    return false;
  if (data.lists.length > 0)
    if (data.lists.some((list: any) => !dataIsList(list))) return false;
  console.log(data);
  return true;
};

export const dataIsList = (data: any): data is IList => {
  if (typeof data !== 'object') return false;
  if (Object.keys(data).length !== 3) return false;
  if (
    typeof data.id !== 'string' ||
    typeof data.name !== 'string' ||
    !Array.isArray(data.cards)
  )
    return false;
  if (data.cards > 0) if (data.cards.some((card: any) => !dataIsCard(card))) return false;

  return true;
};

export const dataIsCard = (data: any): data is ICard => {
  if (typeof data !== 'object') return false;
  if (Object.keys(data).length !== 3) return false;
  if (
    typeof data.id !== 'string' ||
    typeof data.name !== 'string' ||
    !Array.isArray(data.labels)
  )
    return false;
  if (data.labels > 0)
    if (data.labels.some((label: any) => !dataIsLabel(label))) return false;

  return true;
};

export const dataIsLabel = (data: any): data is ILabel => {
  if (typeof data !== 'object') return false;
  if (Object.keys(data).length !== 2) return false;
  if (typeof data.label !== 'string' || typeof data.color !== 'string') return false;

  return true;
};
