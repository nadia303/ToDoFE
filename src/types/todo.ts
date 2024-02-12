import { TodoStatus } from './status'

export interface ITodo {
  _id: string
  boardId: string
  title: string
  status: TodoStatus
  description: string
}
