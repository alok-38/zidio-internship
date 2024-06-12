import { useQuery } from "react-query";
import { auth } from "../config/firebase.config";

const useUser = () => {
  const { data, isLoading, isError, refetch } = useQuery(
    "user",
    async () => {
      try {
        const user = auth.currentUser;
        if (user) {
          // User is authenticated, fetch user details
          const userData = {
            uid: user.uid,
            email: user.email,
            // Add any other user details you need
          };
          return userData;
        } else {
          // User is not authenticated
          throw new Error("User is not authenticated");
        }
      } catch (error) {
        // Handle errors
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
