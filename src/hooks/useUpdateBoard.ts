import { useCallback } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { UpdateBoardParams } from "../types";
import { updateBoard } from "../api";
import { QueryKey } from "../types/queryKey";

export const useUpdateBoard = () => {
  const queryClient = useQueryClient();

  const { mutate, ...rest } = useMutation({
    mutationFn: updateBoard,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QueryKey.GetAllBoards] });
    },
  });

  const update = useCallback(
    (params: UpdateBoardParams) => {
      const { boardId, name, todoIds } = params;
      console.log({ todoIds });
      const payload = {
        boardId,
        ...(name && { name }),
        ...(todoIds && { todoIds }),
      };
      mutate(payload);
    },
    [mutate]
  );

  return {
    update,
    ...rest,
  };
};
