interface ISavedBoard {
  name: string;
  id: string;
}

export interface IUser {
  uid: string;
  accessToken: string;
  username: string;
  boards: ISavedBoard[];
}
