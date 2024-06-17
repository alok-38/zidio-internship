import { useQuery } from "react-query";

const useFilters = () => {
  const { data, isLoading, isError, refetch } = useQuery(
    "globalFilter",
    () => ({ searchTerm: "" }), // This is the query function, returning initial data
    { refetchOnWindowFocus: false } // Options object for useQuery
  );

  return { data, isLoading, isError, refetch };
};

export default useFilters;
