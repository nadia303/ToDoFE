import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useCallback } from "react";
import { postTodo } from "../api/todosQueryApi";
import { ITodo } from "../types";

export const useCreateTodo = (boardId: string) => {
  const queryClient = useQueryClient();

  const { mutate, ...rest } = useMutation({
    mutationFn: postTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getAllTodos", boardId] });
    },
  });

  const create = useCallback(
    (payload: ITodo) => {
      const { title, description } = payload;

      mutate({ boardId, title, description });
    },
    [boardId, mutate]
  );

  return {
    create,
    ...rest,
  };
};
