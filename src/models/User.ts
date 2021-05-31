export type UserBoard = {
  name: string;
  id: string;
};

export type User = {
  userId: string;
  username: string;
  photo?: string;
  boards: UserBoard[];
};
