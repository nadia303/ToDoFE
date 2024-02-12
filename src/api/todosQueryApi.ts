import { ITodo } from '../types'
import { api } from './api'
export interface PatchTodoParams {
  id: string
  data: Partial<ITodo>
}

export const patchTodo = ({ id, data }: PatchTodoParams) => {
  return api({
    method: 'patch',
    url: `/todos/${id}`,
    data,
  })
}

export interface PostTaskParams {
  boardId: string
  title: string
  description: string
}

export const postTodo = ({ boardId, title, description }: PostTaskParams): Promise<ITodo> => {
  return api({
    method: 'post',
    url: `/todos`,
    data: { title, description, boardId },
  })
}

export interface DeleteTaskParams {
  boardId: string
  todoId: string
}

export const deleteTodo = ({ boardId, todoId }: DeleteTaskParams): Promise<void> => {
  return api({
    method: 'delete',
    url: `/todos/${boardId}/${todoId}`,
  })
}
