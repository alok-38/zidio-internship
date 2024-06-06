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
        console.error("Error fetching user details:", err);
        throw new Error("Something went wrong while fetching user details");
      }
    },
    { refetchOnWindowFocus: false }
  );

  return { data, isLoading, isError, refetch };
};

export default useUser;
