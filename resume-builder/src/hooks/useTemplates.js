import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../config/firebase.config";
import { useQuery } from "react-query";

export function useTemplates() {
  const { data, isLoading, isError, refetch } = useQuery(
    "templates",
    async () => {
      const templateRef = collection(db, "templates");

      const unsubscribe = onSnapshot(
        templateRef,
        (querySnapshot) => {
          const templates = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          // Resolve the templates array
          return templates;
        },
        (error) => {
          // Handle any error that occurs during onSnapshot
          throw error;
        }
      );

      // Return unsubscribe function for cleanup
      return () => unsubscribe();
    }
  );

  return { data, isLoading, isError, refetch };
}
