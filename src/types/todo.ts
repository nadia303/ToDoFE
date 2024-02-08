import { TodoStatus } from "./status";

export interface ITodo {
  id: string;
  title: string;
  status: TodoStatus;
  description: string;
}
