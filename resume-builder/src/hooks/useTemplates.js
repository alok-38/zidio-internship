import { useQuery } from "react-query";
import { toast } from "react-toastify";
import { getTemplates } from "../api";

const useTemplates = () => {
  const { data, isLoading, isError, refetch } = useQuery(
    "templates",
    async () => {
      try {
        const templates = await getTemplates();
        return templates;
      } catch (err) {
        console.error(err); // Log the error for debugging purposes
        toast.error("Something went wrong"); // Show a user-friendly error message
        throw new Error("Failed to fetch templates"); // Rethrow the error for React Query to handle
      }
    },
    { refetchOnWindowFocus: false } // Configure options for the query
  );

  return { data, isLoading, isError, refetch }; // Return the data and state variables as an object
};

export default useTemplates;
