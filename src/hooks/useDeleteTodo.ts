import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useCallback } from "react";
import { deleteTodo } from "../api/todosQueryApi";

export const useDeleteTodo = (boardId: string) => {
  const queryClient = useQueryClient();

  const { mutate, ...rest } = useMutation({
    mutationFn: deleteTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getAllTodos", boardId] });
    },
  });

  const remove = useCallback(
    (id: string) => {
      mutate({ id });
    },
    [mutate]
  );

  return {
    remove,
    ...rest,
  };
};
