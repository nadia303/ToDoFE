import { useCallback } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { IBoard } from "../types";
import { updateBoard } from "../api";

export const useUpdateBoard = () => {
  const queryClient = useQueryClient();

  const { mutate, ...rest } = useMutation({
    mutationFn: updateBoard,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getAllBoards"] });
    },
  });

  const update = useCallback(
    (payload: IBoard, boardId: string) => {
      mutate({ id: boardId, data: payload });
    },
    [mutate]
  );

  return {
    update,
    ...rest,
  };
};
