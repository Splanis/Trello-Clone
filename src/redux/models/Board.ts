export interface ILabel {
  label: string;
  color: string;
}

export interface ICard {
  id: string;
  name: string;
  labels: ILabel[];
}

export interface IList {
  id: string;
  name: string;
  cards: ICard[];
}

export interface IBoard {
  id: string;
  name: string;
  lists: IList[];
}
