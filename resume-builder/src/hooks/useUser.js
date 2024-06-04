import { useQuery } from "react-query";
import { getUserDetail } from "../api";

const useUser = () => {
  const { data, isLoading, isError, refetch } = useQuery(
    "user",
    async () => {
      try {
        const userDetail = await getUserDetail();
        return userDetail;
      } catch (err) {
        if (!err("Something went wrong...")) {
        }
      }
    },
    { refetchOnWindowFocus: false }
  );
  return { data, isLoading, isError, refetch };
};

export default useUser;
