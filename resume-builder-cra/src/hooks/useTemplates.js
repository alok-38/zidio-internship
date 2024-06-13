import { useQuery } from "react-query";
import { getTemplates } from "../api";
import { toast } from "react-toastify";

const useTemplates = () => {
  const { data, isLoading, isError, refetch } = useQuery(
    "templates",
    async () => {
      try {
        const templates = await getTemplates();
        return templates;
      } catch (error) {
        console.log(error.message);
        toast.error("Something went wrong...");
        throw new Error("Error fetching templates");
      }
    },
    { refetchOnWindowFocus: false }
  );

  return {
    data,
    isLoading,
    isError,
    fetchTemplates: refetch, // Expose refetch as fetchTemplates
  };
};

export default useTemplates;
