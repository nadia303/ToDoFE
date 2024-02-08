import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useCallback } from "react";
import { deleteBoard } from "../api";

export const useDeleteBoard = () => {
  const queryClient = useQueryClient();

  const { mutate, ...rest } = useMutation({
    mutationFn: deleteBoard,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getAllBoards"] });
    },
  });

  const remove = useCallback(
    (boardId: string) => {
      mutate({ boardId });
    },
    [mutate]
  );

  return {
    remove,
    ...rest,
  };
};
