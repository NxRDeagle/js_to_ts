export type ID = string | number;

export interface IToDo {
  id: ID;
  userId: ID;
  title: string;
  completed: boolean;
}

export interface IUser {
  id: ID;
  name: string;
}
