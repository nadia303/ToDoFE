import { useQuery } from "@tanstack/react-query";
import { getAllBoards } from "../api/boardsQueryApi";
import { QueryKey } from "../types/queryKey";

export const useGetAllBoards = (id?: string) => {
  const { data, isLoading, isFetching, fetchStatus, ...rest } = useQuery({
    queryKey: [QueryKey.GetAllBoards, id],
    queryFn: () => getAllBoards(id),
  });

  return {
    data,
    isLoading: (isLoading || isFetching) && fetchStatus !== "idle",
    ...rest,
  };
};
