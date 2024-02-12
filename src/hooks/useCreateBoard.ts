import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useCallback } from "react";
import { postBoard } from "../api/boardsQueryApi";
import { QueryKey } from "../types/queryKey";

export const useCreateBoard = () => {
  const queryClient = useQueryClient();

  const { mutate, ...rest } = useMutation({
    mutationFn: postBoard,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QueryKey.GetAllBoards] });
    },
  });

  const create = useCallback(
    (data: { name: string }) => {
      mutate(data);
    },
    [mutate]
  );

  return {
    create,
    ...rest,
  };
};
