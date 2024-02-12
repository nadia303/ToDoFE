import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useCallback } from "react";
import { deleteTodo } from "../api/todosQueryApi";

export const useDeleteTodo = (boardId: string) => {
  const queryClient = useQueryClient();

  const { mutate, ...rest } = useMutation({
    mutationFn: deleteTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getAllBoards"] });
    },
  });

  const remove = useCallback(
    (todoId: string) => {
      mutate({ boardId, todoId });
    },
    [boardId, mutate]
  );

  return {
    remove,
    ...rest,
  };
};
