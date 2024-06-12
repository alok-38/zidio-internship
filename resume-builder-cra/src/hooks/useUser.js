import { useQuery } from "react-query";
import { getUserDetail } from "../api";
import { toast } from "react-toastify";

const useUser = () => {
  const { data, isLoading, isError, refetch } = useQuery(
    "user",
    async () => {
      try {
        const userDetail = await getUserDetail();
        return userDetail;
      } catch (error) {
        if (error.message.includes("not authenticated")) {
          // Handle unauthenticated user error
          toast.error("User is not authenticated. Please sign in.");
        } else {
          // Handle other errors
          toast.error("Something went wrong while fetching user data.");
        }
        // Re-throw error for React Query to handle
        throw error;
      }
    },
    { refetchOnWindowFocus: false }
  );

  return {
    data,
    isLoading,
    isError,
    refetch,
  };
};

export default useUser;
