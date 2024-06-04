import { useQuery } from "react-query";

const useUser = () => {
  const { data, isLoading, isError, refetch } = useQuery();
};
