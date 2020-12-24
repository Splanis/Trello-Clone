import { IBoard, ICard, IList } from '../../models/Board';

export const dataIsBoard = (data: any): data is IBoard => {
  if (typeof data !== 'object') return false;
  if (data.lists.some((list: any) => !dataIsList(list))) return false;

  return true;
};

export const dataIsList = (data: any): data is IList => {
  if (typeof data !== 'object') return false;
  if (typeof data.id !== 'string' && typeof data.name !== 'string') return false;
  if (data.cards.some((card: any) => !dataIsCard(card))) return false;

  return true;
};

export const dataIsCard = (data: any): data is ICard => {
  if (typeof data !== 'object') return false;
  if (typeof data.id !== 'string' && typeof data.name !== 'string') return false;

  return true;
};
