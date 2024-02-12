import { useCallback } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { patchTodo } from "../api/todosQueryApi";
import { ITodo } from "../types";

export const useUpdateTodo = () => {
  const queryClient = useQueryClient();

  const { mutate, ...rest } = useMutation({
    mutationFn: patchTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getAllBoards"] });
    },
  });

  const update = useCallback(
    (todoId: string, payload: Partial<ITodo>) => {
      mutate({ id: todoId, data: payload });
    },
    [mutate]
  );

  return {
    update,
    ...rest,
  };
};
