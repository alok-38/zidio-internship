import { collection, onSnapshot, orderBy } from "firebase/firestore";
import { db } from "../config/firebase.config";
import { useQuery } from "react-query";

const useTemplates = () => {
  return useQuery("templates", async () => {
    const templateRef = collection(db, "templates");

    const unsubscribe = onSnapshot(
      templateRef,
      (querySnapshot) => {
        const templates = querySnapshot.docs.map((doc) => doc.data());
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
  });
};

export default useTemplates;
