import { IBoard } from '../types'
import { api } from './api'

export interface PatchBoardParams {
  boardId?: number
  data: IBoard
}

export const patchBoard = ({ boardId, data }: PatchBoardParams) => {
  return api({
    method: 'patch',
    url: `/boards/${boardId}`,
    data,
  })
}

export interface PostBoardParams {
  name: string
}

export const postBoard = ({ name }: PostBoardParams): Promise<IBoard> => {
  return api({
    method: 'post',
    url: `/boards`,
    data: { name },
  })
}

export interface DeleteBoardParams {
  boardId: string
}

export const deleteBoard = ({ boardId }: DeleteBoardParams): Promise<void> => {
  return api({
    method: 'delete',
    url: `/boards/${boardId}`,
  })
}

export const getAllBoards = (id?: string) => {
  return api({
    method: 'get',
    url: `/boards?id=${id}`,
  })
}

export interface UpdateBoardParams {
  boardId: string
  name?: string
  todoIds?: string[]
}

export const updateBoard = ({ boardId, ...data }: UpdateBoardParams) => {
  return api({
    method: 'patch',
    url: `/boards/${boardId}`,
    data,
  })
}

export const getAllTodosByBoardId = (id?: string) => {
  return api({
    method: 'get',
    url: `/boards/${id}/todos`,
  })
}
