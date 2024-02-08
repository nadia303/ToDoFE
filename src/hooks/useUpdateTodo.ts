import { useCallback } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateTodo } from "../api/todosQueryApi";
import { ITodo } from "../types";

export const useUpdateTodo = (boardId: string) => {
  const queryClient = useQueryClient();

  const { mutate, ...rest } = useMutation({
    mutationFn: updateTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getAllTodos", boardId] });
    },
  });

  const update = useCallback(
    (payload: ITodo, todoId: string) => {
      mutate({ id: todoId, data: payload });
    },
    [mutate]
  );

  return {
    update,
    ...rest,
  };
};
