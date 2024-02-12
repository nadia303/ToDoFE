import { ITodo } from "./todo";

export interface IBoard {
  id: string;
  name: string;
  todos: ITodo[];
}

export interface UpdateBoardParams {
  boardId: string;
  name?: string;
  todoIds?: string[];
}
