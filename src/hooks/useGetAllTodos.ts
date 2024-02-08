import { useQuery } from "@tanstack/react-query";
import { getAllTodos } from "../api/todosQueryApi";
import { TodoStatus } from "../types/status";

export const useGetAllTodos = (boardId: string, status: TodoStatus) => {
  const { data, isLoading, isFetching, fetchStatus, ...rest } = useQuery({
    queryKey: ["getAllTodos", boardId, status],
    queryFn: () => getAllTodos({ boardId, status }),
    enabled: !!boardId,
  });

  return {
    data,
    isLoading: (isLoading || isFetching) && fetchStatus !== "idle",
    ...rest,
  };
};
