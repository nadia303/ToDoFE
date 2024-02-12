import { useCallback } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { UpdateBoardParams } from "../types";
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
    (params: UpdateBoardParams) => {
      mutate(params);
    },
    [mutate]
  );

  return {
    update,
    ...rest,
  };
};
