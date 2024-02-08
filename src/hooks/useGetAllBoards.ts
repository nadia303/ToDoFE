import { useQuery } from "@tanstack/react-query";
import { getAllBoards } from "../api/boardsQueryApi";

export const useGetAllBoards = () => {
  const { data, isLoading, isFetching, fetchStatus, ...rest } = useQuery({
    queryKey: ["getAllBoards"],
    queryFn: () => getAllBoards(),
  });

  return {
    data,
    isLoading: (isLoading || isFetching) && fetchStatus !== "idle",
    ...rest,
  };
};
