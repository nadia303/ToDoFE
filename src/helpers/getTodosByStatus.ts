import { ITodo } from "../types";
import { TodoStatus } from "../types/status";

export const getTodosByStatus = (
  todos: ITodo[],
  status: TodoStatus
): ITodo[] => {
  return todos.filter((todo) => todo.status === status);
};
