import { IBoard } from "../types";
import { api } from "./api";

export interface PatchBoardParams {
  boardId?: number;
  data: IBoard;
}

export const patchBoard = ({ boardId, data }: PatchBoardParams) => {
  return api({
    method: "patch",
    url: `/boards/${boardId}`,
    data,
  });
};

export interface PostBoardParams {
  name: string;
}

export const postBoard = ({ name }: PostBoardParams): Promise<IBoard> => {
  return api({
    method: "post",
    url: `/boards`,
    data: { name },
  });
};

export interface DeleteBoardParams {
  boardId: string;
}

export const deleteBoard = ({ boardId }: DeleteBoardParams): Promise<void> => {
  return api({
    method: "delete",
    url: `/boards/${boardId}`,
  });
};

export const getAllBoards = () => {
  return api({
    method: "get",
    url: `/boards`,
  });
};

export interface UpdateBoardParams {
  id: string;
  data: IBoard;
}

export const updateBoard = ({ id, data }: UpdateBoardParams) => {
  return api({
    method: "put",
    url: `/boards/${id}`,
    data,
  });
};
