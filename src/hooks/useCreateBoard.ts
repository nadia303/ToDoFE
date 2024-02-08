import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useCallback } from "react";
import { postBoard } from "../api/boardsQueryApi";
import { IBoard } from "../types";

export const useCreateBoard = () => {
  const queryClient = useQueryClient();

  const { mutate, ...rest } = useMutation({
    mutationFn: postBoard,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getAllBoards"] });
    },
  });

  const create = useCallback(
    (payload: IBoard) => {
      const { name } = payload;

      mutate({ name });
    },
    [mutate]
  );

  return {
    create,
    ...rest,
  };
};
