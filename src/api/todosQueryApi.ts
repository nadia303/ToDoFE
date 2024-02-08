import { ITodo } from "../types";
import { TodoStatus } from "../types/status";
import { api } from "./api";

export interface UpdateTodoParams {
  id: string;
  data: ITodo;
}

export const updateTodo = ({ id, data }: UpdateTodoParams) => {
  return api({
    method: "put",
    url: `/todos/${id}`,
    data,
  });
};

export interface PostTaskParams {
  boardId: string;
  title: string;
  description: string;
}

export const postTodo = ({
  boardId,
  title,
  description,
}: PostTaskParams): Promise<ITodo> => {
  return api({
    method: "post",
    url: `/todos`,
    data: { title, description, boardId },
  });
};

export interface DeleteTaskParams {
  id?: string;
}

export const deleteTodo = ({ id }: DeleteTaskParams): Promise<void> => {
  return api({
    method: "delete",
    url: `/todos/${id}`,
  });
};

export interface GetAllTodosParams {
  boardId: string;
  status: TodoStatus;
}

export const getAllTodos = ({ boardId, status }: GetAllTodosParams) => {
  console.log("getAllTodos");
  console.log({ status });
  return api({
    method: "get",
    url: `/todos/byBoard/${boardId}?status=${status}`,
  });
};
