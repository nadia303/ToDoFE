import { useQuery } from "@tanstack/react-query";
import { getAllBoards } from "../api/boardsQueryApi";

export const useGetAllBoards = (id?: string) => {
  const { data, isLoading, isFetching, fetchStatus, ...rest } = useQuery({
    queryKey: ["getAllBoards", id],
    queryFn: () => getAllBoards(id),
  });

  return {
    data,
    isLoading: (isLoading || isFetching) && fetchStatus !== "idle",
    ...rest,
  };
};
